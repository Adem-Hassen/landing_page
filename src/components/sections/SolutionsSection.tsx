import { useEffect, useState } from 'react';
import '../../styles/SolutionsSection.css';
import Button from '../shared/Button';
import {  ChevronDown, Check } from 'lucide-react';
import { TEACHERS } from '../../data/teachers';

interface SolutionsSectionProps {
  /** Called whenever the open tutor changes ('' when none is open). */
  onActiveChange?: (id: string) => void;
  /** "شوف النتائج متاعو": select this tutor in the results section and scroll to it. */
  onShowResults?: (id: string) => void;
}

export default function SolutionsSection({ onActiveChange, onShowResults }: SolutionsSectionProps) {
  const [activeId, setActiveId] = useState<string>(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
      ? ''
      : 'mohamed-aziz'
  );

  useEffect(() => {
    onActiveChange?.(activeId);
  }, [activeId, onActiveChange]);

  const handleTeacherHover = (id: string) => {
    // Only trigger hover on devices that support true pointer hover (desktop)
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setActiveId(id);
    }
  };

  const handleTeacherClick = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="section3" className="solutions-section" dir="rtl">
      <div className="solutions-container">
        {/* Ambient Corner Glows */}
        <div className="glow-corner-top-right" aria-hidden="true" />
        <div className="glow-corner-bottom-left" aria-hidden="true" />

        {/* Section Header */}
        <div className="solutions-header">
        

          <h2 className="solutions-main-title">
            هكعلاش حطيت أني و2 خبراء آخرين وقتنا وخبرتنا على ذمتك ،
            <br />
            في كورس <bdi>"Ecom Mastery 1.0"</bdi>
          </h2>

          <p className="teachers-showcase-subtitle">
            تعلم مباشرة من 3 ممارسين في الميدان حققوا أرقام ونتائج حقيقية في تونس
          </p>
        </div>

        {/* Minimal Interactive Image Accordion */}
        <div className="teachers-accordion" role="region" aria-label="فريق المدربين">
          {TEACHERS.map((teacher) => {
            const isActive = activeId === teacher.id;

            return (
              <article
                key={teacher.id}
                className={`accordion-strip ${isActive ? 'is-active' : ''}`}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`المدرب ${teacher.name}`}
                onMouseEnter={() => handleTeacherHover(teacher.id)}
                onFocus={() => handleTeacherHover(teacher.id)}
                onClick={() => handleTeacherClick(teacher.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTeacherClick(teacher.id);
                  }
                }}
              >
                {/* Background Portrait */}
                <div className="strip-image-container">
                  <img
                    src={teacher.image}
                    srcSet={teacher.imageSrcSet}
                    sizes="(min-width: 1024px) 420px, 100vw"
                    alt={teacher.name}
                    className="strip-image"
                    width={896}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="strip-gradient-overlay" />
                </div>

                {/* Content Overlay */}
                <div className="strip-content">
                  {/* Header info (Name & Short Role) - Always visible */}
                  <div className="strip-header">
                    <div className="strip-identity">
                      <h3 className="teacher-name">{teacher.name}</h3>
                      <p className="teacher-role">{teacher.role}</p>
                    </div>

                    {/* Mobile toggle indicator */}
                    <div className="mobile-expand-icon" aria-hidden="true">
                      <ChevronDown size={18} />
                    </div>
                  </div>

                  {/* Expandable Secondary Details - Revealed when active */}
                  <div className="strip-expanded-details" aria-hidden={!isActive}>
                    <div className="details-divider" />
                    <ul className="details-list" role="list">
                      {teacher.bioPoints.map((point, idx) => (
                        <li key={idx} className="details-item">
                          <span className="details-bullet">
                            <Check size={13} strokeWidth={3} />
                          </span>
                          <span className="details-text">{point}</span>
                        </li>
                      ))}
                    </ul>
                    {onShowResults && (
                      <button
                        type="button"
                        className="details-results-link"
                        tabIndex={isActive ? 0 : -1}
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowResults(teacher.id);
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        شوف النتائج متاعو
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="solutions-cta">
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
    </section>
  );
}
