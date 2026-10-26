import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, TransitionEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import '../../styles/CourseContentSection.css';
import { CircularGallery, type CircularGalleryRef } from '@/components/ui/circular-gallery';
import { courseModules, type CourseModule } from '../../data/courseModules';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  ImageIcon,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;
const MODULE_COUNT = courseModules.length;
// Cards within this many slots of the front are visible when the gallery first paints.
const EAGER_RANGE = 4;
// Safety net in case the rotation produces no transitionend (e.g. it was already at the target).
const ROTATION_FALLBACK_MS = 900;

const isEagerCard = (index: number) => Math.min(index, MODULE_COUNT - index) <= EAGER_RANGE;

/* ---------- Masterclass dialog (portalled outside the 3D gallery) ---------- */

function MasterclassDialog({
  module,
  onClose,
}: {
  module: CourseModule;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isSheet] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const titleId = `masterclass-title-${module.id}`;

  // Lock page scroll while open.
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    // Keep focus inside the dialog.
    const focusables = [
      ...panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ),
    ];
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const panelMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0, transition: { duration: 0 } } }
    : isSheet
      ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
      : { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.96 } };

  return (
    <div className="mc-root" dir="rtl" onKeyDown={onKeyDown}>
      <motion.div
        className="mc-backdrop"
        aria-hidden="true"
        onClick={onClose}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.25 } }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        ref={panelRef}
        className="mc-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        {...panelMotion}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
      >
        <span className="mc-corner-glow" aria-hidden="true" />
        <button ref={closeRef} type="button" className="mc-close" aria-label="سكّر" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>

        <div className="module-featured-badge badge-gold mc-badge">
          <Sparkles size={12} aria-hidden="true" />
          <span>{module.featured_message}</span>
        </div>

        <p className="mc-number">
          الجزء <bdi>{module.number}</bdi>
        </p>
        <h2 id={titleId} className="mc-title">
          {module.title}
        </h2>

        {module.image && (
          <img
            className="mc-image"
            src={module.image}
            alt={module.imageAlt ?? ''}
            width={540}
            height={570}
            decoding="async"
          />
        )}

        <p className="mc-description">{module.description}</p>

        {module.masterclass && (
          <>
            <ul className="mc-highlights">
              {module.masterclass.highlights.map((point) => (
                <li key={point}>
                  <span className="mc-check" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <dl className="mc-meta">
              <div>
                <dt>
                  <UserRound size={15} aria-hidden="true" />
                  المدرب
                </dt>
                <dd>{module.masterclass.instructor}</dd>
              </div>
              <div>
                <dt>
                  <Clock size={15} aria-hidden="true" />
                  المدة
                </dt>
                <dd>{module.masterclass.duration}</dd>
              </div>
            </dl>
          </>
        )}

       
      </motion.div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function CourseContentSection() {
  const galleryRef = useRef<CircularGalleryRef>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  // Auto-rotation re-renders the gallery every frame, so it only runs while the stage is near the viewport.
  const [stageVisible, setStageVisible] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [masterclassIndex, setMasterclassIndex] = useState<number | null>(null);

  const activeIndexRef = useRef(0);
  const pendingMasterclassRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const activeModule = courseModules[activeModuleIndex] || courseModules[0];

  const openMasterclass = useCallback((index: number) => {
    pendingMasterclassRef.current = null;
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    setMasterclassIndex(index);
  }, []);

  useEffect(
    () => () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    },
    []
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setStageVisible(entry.isIntersecting), {
      rootMargin: '200px 0px',
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number, card?: HTMLElement | null) => {
    if (courseModules[index]?.isMasterclass) {
      openerRef.current = card ?? null;
      setExpandedIndex(null);
      if (activeIndexRef.current === index) {
        openMasterclass(index);
        return;
      }
      // Rotate first; the popup opens when the rotation's transition ends.
      pendingMasterclassRef.current = index;
      galleryRef.current?.rotateToIndex(index);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = setTimeout(() => {
        if (pendingMasterclassRef.current === index) openMasterclass(index);
      }, ROTATION_FALLBACK_MS);
      return;
    }

    if (activeModuleIndex !== index) {
      galleryRef.current?.rotateToIndex(index);
      setExpandedIndex(index);
    } else {
      setExpandedIndex((prev) => (prev === index ? null : index));
    }
  };

  // The gallery's rotating layer is the only element with transform-style: preserve-3d.
  const handleStageTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    const pending = pendingMasterclassRef.current;
    if (pending === null || e.propertyName !== 'transform') return;
    if ((e.target as HTMLElement).style.transformStyle !== 'preserve-3d') return;
    if (activeIndexRef.current === pending) openMasterclass(pending);
  };

  const closeMasterclass = useCallback(() => {
    setMasterclassIndex(null);
    const opener = openerRef.current;
    requestAnimationFrame(() => opener?.focus({ preventScroll: true }));
  }, []);

  const handleNext = () => {
    setExpandedIndex(null);
    galleryRef.current?.next();
  };

  const handlePrev = () => {
    setExpandedIndex(null);
    galleryRef.current?.prev();
  };

  const handleActiveIndexChange = (index: number) => {
    activeIndexRef.current = index;
    setActiveModuleIndex(index);
    setExpandedIndex((prev) => (prev === index ? prev : null));
  };

  const masterclassModule = masterclassIndex !== null ? courseModules[masterclassIndex] : null;

  return (
    <section id="section4" className="course-content-section" dir="rtl">
      <div className="course-content-container">
        {/* Ambient Corner Glows */}
        <div className="glow-corner-top-left" aria-hidden="true" />
        <div className="glow-corner-bottom-right" aria-hidden="true" />

        {/* Main Title - Centered */}
        <div className="course-content-header">
          <h2 className="course-content-main-title">
            نخليك تحكم وحدك, هذا شنوا باش تتعلم
          </h2>

          <p className="course-content-subtitle">
            20 جزء قيمتهم برشا فلوس
            <br />
            و كل جزء باش يبني رائد أعمال كاسح
          </p>
        </div>

        {/* 3D Circular Course Content Gallery */}
        <div ref={stageRef} className="circular-gallery-stage" onTransitionEnd={handleStageTransitionEnd}>
          <CircularGallery
            ref={galleryRef}
            items={courseModules}
            reverseDirection={true}
            isPaused={expandedIndex !== null || masterclassIndex !== null || !stageVisible || reduceMotion}
            autoRotateSpeed={0.03}
            onActiveIndexChange={handleActiveIndexChange}
            renderItem={(item: CourseModule, index: number, isFront: boolean) => {
              const isMasterclass = !!item.isMasterclass;
              const isExpanded = !isMasterclass && expandedIndex === index;

              return (
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isMasterclass ? undefined : isExpanded}
                  aria-haspopup={isMasterclass ? 'dialog' : undefined}
                  aria-label={
                    isMasterclass
                      ? `الجزء ${item.number}: ${item.title}. اكتشف الماستركلاس`
                      : `الجزء ${item.number}: ${item.title}. ${isExpanded ? 'انقر لإغلاق التفاصيل' : 'انقر لعرض التفاصيل'}`
                  }
                  className={`circular-module-card ${isFront ? 'is-front' : ''} ${isExpanded ? 'is-expanded' : ''} ${
                    isMasterclass ? 'is-masterclass' : ''
                  }`}
                  onClick={(e) => handleCardClick(index, e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(index, e.currentTarget);
                    }
                  }}
                >
                  {/* Featured / Special Badge */}
                  {item.featured && (
                    <div
                      className={`module-featured-badge ${
                        isMasterclass
                          ? 'badge-gold'
                          : item.featured_message?.toLowerCase().includes('coming')
                            ? 'badge-coming-soon'
                            : 'badge-gold'
                      }`}
                    >
                      <Sparkles size={12} />
                      <span>{item.featured_message || 'مميز'}</span>
                    </div>
                  )}

                  {/* Module Number Tag */}
                  <div className="module-number-pill">
                    <span>{item.number}</span>
                  </div>

                  {/* Top Half: Dedicated Image Container / Placeholder (Main Visual) */}
                  <div className="module-image-container">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? ''}
                        className="module-card-image"
                        width={540}
                        height={570}
                        loading={isEagerCard(index) ? 'eager' : 'lazy'}
                        decoding="async"
                        draggable={false}
                      />
                    ) : (
                      <div className="module-image-placeholder">
                        <div className="placeholder-ambient-glow" aria-hidden="true" />
                        <div className="placeholder-inner-frame">
                          <div className="placeholder-icon-wrap">
                            <ImageIcon className="placeholder-img-icon" size={26} />
                          </div>
                          <span className="placeholder-tag">مكان مخصص للصورة</span>
                          <span className="placeholder-subtag">الجزء {item.number}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Half: Title Only by default, Expandable Full Description */}
                  <div className="module-info-container">
                    <h3 className="module-card-title">{item.title}</h3>

                    {isMasterclass ? (
                      <div
                        className="module-toggle-hint masterclass-hint"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(index, e.currentTarget.closest<HTMLElement>('.circular-module-card'));
                        }}
                      >
                        <Sparkles size={13} />
                        <span>اكتشف الماستركلاس</span>
                      </div>
                    ) : isExpanded ? (
                      <div className="module-expanded-body">
                        <div className="expanded-divider" aria-hidden="true" />
                        <p className="module-card-description">{item.description}</p>
                        <div
                          className="module-toggle-hint close-hint"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedIndex(null);
                          }}
                        >
                          <ChevronUp size={13} />
                          <span>إغلاق التفاصيل</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="module-toggle-hint open-hint"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(index);
                        }}
                      >
                        <ChevronDown size={13} />
                        <span>عرض التفاصيل</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Controls & Navigation Bar */}
        <div className="gallery-controls-bar">
          <div className="gallery-nav-buttons">
            <button
              onClick={handlePrev}
              className="gallery-nav-btn"
              aria-label="الجزء السابق"
              title="السابق"
            >
              <ChevronRight size={20} />
            </button>

            {/* Active Module Indicator */}
            <div className="gallery-active-indicator">
              <span className="indicator-current">جزء <bdi>{activeModule.number}</bdi></span>
              <span className="indicator-separator">/</span>
              <span className="indicator-total"><bdi>20</bdi></span>
            </div>

            <button
              onClick={handleNext}
              className="gallery-nav-btn"
              aria-label="الجزء التالي"
              title="التالي"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Interactive Hint */}
        
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {masterclassModule && (
            <MasterclassDialog
              key={masterclassModule.id}
              module={masterclassModule}
              onClose={closeMasterclass}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
