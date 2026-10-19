import { useRef, useState } from 'react';
import '../../styles/CourseContentSection.css';
import { CircularGallery, type CircularGalleryRef } from '@/components/ui/circular-gallery';
import { courseModules, type CourseModule } from '../../data/courseModules';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Sparkles, ImageIcon } from 'lucide-react';

export default function CourseContentSection() {
  const galleryRef = useRef<CircularGalleryRef>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const activeModule = courseModules[activeModuleIndex] || courseModules[0];

  const handleCardClick = (index: number) => {
    if (activeModuleIndex !== index) {
      galleryRef.current?.rotateToIndex(index);
      setExpandedIndex(index);
    } else {
      setExpandedIndex((prev) => (prev === index ? null : index));
    }
  };

  const handleNext = () => {
    setExpandedIndex(null);
    galleryRef.current?.next();
  };

  const handlePrev = () => {
    setExpandedIndex(null);
    galleryRef.current?.prev();
  };

  const handleActiveIndexChange = (index: number) => {
    setActiveModuleIndex(index);
    setExpandedIndex((prev) => (prev === index ? prev : null));
  };

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
        <div className="circular-gallery-stage">
          <CircularGallery
            ref={galleryRef}
            items={courseModules}
            reverseDirection={true}
            isPaused={expandedIndex !== null}
            autoRotateSpeed={0.03}
            onActiveIndexChange={handleActiveIndexChange}
            renderItem={(item: CourseModule, index: number, isFront: boolean) => {
              const isExpanded = expandedIndex === index;

              return (
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-label={`الجزء ${item.number}: ${item.title}. ${isExpanded ? 'انقر لإغلاق التفاصيل' : 'انقر لعرض التفاصيل'}`}
                  className={`circular-module-card ${isFront ? 'is-front' : ''} ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => handleCardClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(index);
                    }
                  }}
                >
                  {/* Featured / Special Badge */}
                  {item.featured && (
                    <div
                      className={`module-featured-badge ${
                        item.featured_message?.toLowerCase().includes('coming')
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
                        alt={item.title}
                        className="module-card-image"
                        loading="lazy"
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

                    {/* Expandable Section */}
                    {isExpanded ? (
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
              <span className="indicator-current">جزء {activeModule.number}</span>
              <span className="indicator-separator">/</span>
              <span className="indicator-total">20</span>
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
    </section>
  );
}
