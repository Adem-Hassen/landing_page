import '../../styles/ResultsSection.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageIcon, X } from 'lucide-react';
import Button from '../shared/Button';
import { TEACHERS, type Teacher } from '../../data/teachers';

/* ---------- Results data ---------- */

interface ResultStat {
  /** Final number, e.g. 12500 */
  value: number;
  /** Shown after the number, e.g. '+', '%', 'x', ' د.ت' */
  suffix: string;
  label: string;
}

interface ResultProof {
  /** Screenshot in public/results/<tutor-id>/ (shown at 4:3, cropped to fill) */
  src: string;
  /** Short Arabic description of the screenshot */
  alt: string;
}

interface TutorResults {
  headline: ResultStat;
  stats: [ResultStat, ResultStat];
  /** One short line in the tutor's own words */
  quote: string;
  proofs: ResultProof[];
}

/*
 * DEMO DATA: every number, quote and screenshot below is mock content for layout only.
 * Replace each entry with the tutor's real, verifiable results.
 */

const RESULTS: Record<string, TutorResults> = {
  'mohamed-aziz': {
    headline: { value: 18450, suffix: '+', label: 'طلبية في 5 سنين' },
    stats: [
      { value: 850000, suffix: ' د.ت', label: 'رقم مبيعات جملي' },
      { value: 4, suffix: '', label: 'متاجر ناجحة' },
    ],
    quote: 'بديت بمنتج واحد، واليوم نخدم بنظام واضح يجيب طلبيات كل يوم.',
    proofs: [
      { src: '/results/mohamed-aziz/1.webp', alt: 'لوحة تحكم متجر فيها تطور المبيعات' },
      { src: '/results/mohamed-aziz/2.webp', alt: 'لوحة تحكم فيها عدد الطلبيات كل شهر' },
      { src: '/results/mohamed-aziz/3.webp', alt: 'تطور المبيعات على 5 سنين' },
    ],
  },
  'rayan-bensalem': {
    headline: { value: 650000, suffix: ' د.ت', label: 'ميزانية إعلانية مسيّرة' },
    stats: [
      { value: 4, suffix: 'x', label: 'متوسط العائد على الإعلانات (ROAS)' },
      { value: 320, suffix: '+', label: 'حملة على فيسبوك وتيك توك' },
    ],
    quote: 'الإعلان الناجح يبدا من فهم الكليان قبل ما تحط حتى دينار.',
    proofs: [
      { src: '/results/rayan-bensalem/1.webp', alt: 'مدير إعلانات فيه نتائج الحملات' },
      { src: '/results/rayan-bensalem/2.webp', alt: 'نتائج إعلانات فيديو قصيرة' },
      { src: '/results/rayan-bensalem/3.webp', alt: 'نتائج حملة إعلانية والعائد متاعها' },
    ],
  },
  'youssef-mejri': {
    headline: { value: 80, suffix: '+', label: 'متجر إلكتروني صممهم' },
    stats: [
      { value: 4, suffix: '%', label: 'متوسط معدل التحويل' },
      { value: 12, suffix: '%', label: 'نسبة الـ Retour' },
    ],
    quote: 'متجر واضح وسريع يبيع وحدو، والتوصيل المضبوط ينقص الـ Retour.',
    proofs: [
      { src: '/results/youssef-mejri/1.webp', alt: 'متجر إلكتروني صممه يوسف' },
      { src: '/results/youssef-mejri/2.webp', alt: 'معدل التحويل في متجر' },
      { src: '/results/youssef-mejri/3.webp', alt: 'نسبة التوصيل والـ Retour' },
    ],
  },
};

const EASE = [0.16, 1, 0.3, 1] as const;

const formatNumber = (n: number) => n.toLocaleString('en-US');

/* ---------- Number ticker ---------- */

function NumberTicker({
  stat,
  active,
  reduceMotion,
  className,
}: {
  stat: ResultStat;
  active: boolean;
  reduceMotion: boolean;
  className: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    if (reduceMotion || !active) {
      el.textContent = formatNumber(stat.value);
      return;
    }
    el.textContent = formatNumber(0);
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = formatNumber(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [active, reduceMotion, stat.value]);

  return (
    <span className={className}>
      <span aria-hidden="true" className="rnum__digits">
        <span ref={numRef}>{formatNumber(stat.value)}</span>
        {stat.suffix}
      </span>
      {/* Screen readers always get the final value, even mid-count. */}
      <span className="sr-only">
        {formatNumber(stat.value)}
        {stat.suffix}
      </span>
    </span>
  );
}

/* ---------- Proof tiles, slider, lightbox ---------- */

function ProofTile({
  proof,
  onOpen,
  decorative = false,
}: {
  proof: ResultProof;
  onOpen: (proof: ResultProof, opener: HTMLElement) => void;
  decorative?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="rproof rproof--placeholder"
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : proof.alt}
        aria-hidden={decorative || undefined}
      >
        <ImageIcon size={26} strokeWidth={1.6} aria-hidden="true" />
        <span className="rproof__hint" aria-hidden="true">
          {proof.alt}
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="rproof"
      tabIndex={decorative ? -1 : undefined}
      aria-hidden={decorative || undefined}
      aria-label={proof.alt}
      onClick={(e) => onOpen(proof, e.currentTarget)}
    >
      <img
        src={proof.src}
        alt=""
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="rproof__img"
        onError={() => setFailed(true)}
      />
    </button>
  );
}


const slideVariants = {
  // RTL: the next screenshot comes in from the left, the current one leaves to the right.
  enter: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
};

function ProofSlider({
  proofs,
  onOpen,
  reduceMotion,
}: {
  proofs: ResultProof[];
  onOpen: (proof: ResultProof, opener: HTMLElement) => void;
  reduceMotion: boolean;
}) {
  const [[index, dir], setSlide] = useState<[number, number]>([0, 0]);
  const dragged = useRef(false);
  const count = proofs.length;

  const go = useCallback(
    (delta: number) => setSlide(([i]) => [(i + delta + count) % count, delta]),
    [count]
  );
  const goTo = (target: number) => setSlide(([i]) => [target, target > i ? 1 : -1]);

  if (!count) return null;

  return (
    <div
      className="rslider"
      role="group"
      aria-roledescription="carousel"
      aria-label="لقطات النتائج"
      onKeyDown={(e) => {
        // RTL: ArrowLeft shows the next screenshot.
        if (e.key === 'ArrowLeft') go(1);
        else if (e.key === 'ArrowRight') go(-1);
        else return;
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="rslider__viewport">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            className="rslider__slide"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              reduceMotion
                ? { duration: 0 }
                : { x: { type: 'spring', stiffness: 320, damping: 34 }, opacity: { duration: 0.2 } }
            }
            drag={count > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onPointerDown={() => (dragged.current = false)}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = offset.x + velocity.x * 0.2;
              // RTL: dragging to the right brings in the next screenshot from the left.
              if (swipe > 80) go(1);
              else if (swipe < -80) go(-1);
            }}
            onClickCapture={(e) => {
              if (dragged.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${count}`}
          >
            <ProofTile proof={proofs[index]} onOpen={onOpen} />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              className="rslider__arrow rslider__arrow--prev"
              aria-label="الصورة السابقة"
              onClick={() => go(-1)}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rslider__arrow rslider__arrow--next"
              aria-label="الصورة التالية"
              onClick={() => go(1)}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="rslider__dots">
          {proofs.map((proof, i) => (
            <button
              key={proof.src}
              type="button"
              className={`rslider__dot${i === index ? ' is-active' : ''}`}
              aria-label={`${i + 1} / ${count}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Lightbox({
  proof,
  onClose,
  reduceMotion,
}: {
  proof: ResultProof | null;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!proof) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [proof, onClose]);

  return createPortal(
    <AnimatePresence>
      {proof && (
        <motion.div
          className="rlightbox"
          role="dialog"
          aria-modal="true"
          aria-label={proof.alt}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <button ref={closeRef} type="button" className="rlightbox__close" aria-label="سكّر" onClick={onClose}>
            <X size={22} aria-hidden="true" />
          </button>
          <motion.img
            src={proof.src}
            alt={proof.alt}
            className="rlightbox__img"
            initial={reduceMotion ? false : { scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ---------- Stage (one tabpanel per tutor) ---------- */

function TutorPanel({
  teacher,
  selected,
  counting,
  reduceMotion,
  onOpen,
}: {
  teacher: Teacher;
  selected: boolean;
  counting: boolean;
  reduceMotion: boolean;
  onOpen: (proof: ResultProof, opener: HTMLElement) => void;
}) {
  const results = RESULTS[teacher.id];
  if (!results) return null;

  return (
    <motion.div
      id={`results-panel-${teacher.id}`}
      role="tabpanel"
      aria-labelledby={`results-tab-${teacher.id}`}
      aria-hidden={!selected}
      inert={!selected}
      className="rpanel"
      initial={false}
      animate={
        selected
          ? { opacity: 1, filter: 'blur(0px)', visibility: 'visible' }
          : { opacity: 0, filter: reduceMotion ? 'blur(0px)' : 'blur(6px)', transitionEnd: { visibility: 'hidden' } }
      }
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
    >
      <div className="rpanel__numbers">
        <NumberTicker
          stat={results.headline}
          active={selected && counting}
          reduceMotion={reduceMotion}
          className="rnum rnum--headline"
        />
        <p className="rnum__label">{results.headline.label}</p>

        <div className="rstats">
          {results.stats.map((stat) => (
            <div key={stat.label} className="rstat">
              <NumberTicker
                stat={stat}
                active={selected && counting}
                reduceMotion={reduceMotion}
                className="rnum rnum--small"
              />
              <p className="rstat__label">{stat.label}</p>
            </div>
          ))}
        </div>

        <blockquote className="rquote">
          <p className="rquote__text">{results.quote}</p>
          <footer className="rquote__name">{teacher.name}</footer>
        </blockquote>
      </div>

      <div className="rpanel__gallery">
        <ProofSlider proofs={results.proofs} onOpen={onOpen} reduceMotion={reduceMotion} />
      </div>
    </motion.div>
  );
}

/* ---------- Section ---------- */

interface ResultsSectionProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ResultsSection({ selectedId, onSelect }: ResultsSectionProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const openerRef = useRef<HTMLElement | null>(null);
  const counting = useInView(stageRef, { once: true, amount: 0.3 });
  const [lightbox, setLightbox] = useState<ResultProof | null>(null);

  const selectedIndex = Math.max(0, TEACHERS.findIndex((t) => t.id === selectedId));

  const openProof = useCallback((proof: ResultProof, opener: HTMLElement) => {
    openerRef.current = opener;
    setLightbox(proof);
  }, []);

  const closeProof = useCallback(() => {
    setLightbox(null);
    openerRef.current?.focus();
  }, []);

  // RTL: ArrowLeft moves to the next tutor, ArrowRight to the previous one.
  const onTabKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const last = TEACHERS.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowLeft') next = selectedIndex === last ? 0 : selectedIndex + 1;
    else if (e.key === 'ArrowRight') next = selectedIndex === 0 ? last : selectedIndex - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    onSelect(TEACHERS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="results" className="results-section" dir="rtl">
      <div className="results-container">
        <div className="results-glow" aria-hidden="true" />

        <h2 className="results-main-title">مانيش باش نزيد نحكيلك نخليك تشوف النتائج وحدك</h2>
        

        <div className="rtabs" role="tablist" aria-label="نتائج المدربين" onKeyDown={onTabKeyDown}>
          {TEACHERS.map((teacher, i) => {
            const selected = i === selectedIndex;
            return (
              <button
                key={teacher.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`results-tab-${teacher.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`results-panel-${teacher.id}`}
                tabIndex={selected ? 0 : -1}
                className={`rtab${selected ? ' is-selected' : ''}`}
                onClick={() => onSelect(teacher.id)}
              >
                <motion.span
                  className="rtab__avatar"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                >
                  <img src={teacher.avatar} alt="" width={192} height={256} loading="lazy" decoding="async" />
                </motion.span>
                <span className="rtab__name">{teacher.name}</span>
                {selected && (
                  <motion.span
                    layoutId="results-tab-underline"
                    className="rtab__underline"
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <motion.div
          ref={stageRef}
          className="rstage"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          {TEACHERS.map((teacher, i) => (
            <TutorPanel
              key={teacher.id}
              teacher={teacher}
              selected={i === selectedIndex}
              counting={counting}
              reduceMotion={reduceMotion}
              onOpen={openProof}
            />
          ))}
        </motion.div>

        <div className="results-cta">
          <Button
            variant="outline"
            size="lg"
            className="btn-glow"
            onClick={() => (window.location.href = '#join-us')}
          >
            إبدأ رحلتك نحو النجاح توا
          </Button>
        </div>
      </div>

      <Lightbox proof={lightbox} onClose={closeProof} reduceMotion={reduceMotion} />
    </section>
  );
}
