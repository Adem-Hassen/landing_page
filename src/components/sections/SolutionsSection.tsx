import { useState } from 'react';
import '../../styles/SolutionsSection.css';
import Button from '../shared/Button';
import {  ChevronDown, Check } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
  bioPoints: string[];
}

const TEACHERS: Teacher[] = [
  {
    id: 'mohamed-aziz',
    name: 'محمد عزيز اللطيف',
    role: 'تاجر إلكتروني بخبرة 5 سنين في تونس ومؤسس الأكاديمية',
    image: '/teachers/mohamed-aziz.jpg',
    bioPoints: [
      'ناجح في المجال وبخبرة 5 سنين في السوق التونسية',
      'جرب، فشل، واكتشف الاستراتيجيات الحقيقية اللي تخدم',
      'يعلمك بمنهجية واضحة وبخطوات عملية وساهلة تطبقها',
    ],
  },
  {
    id: 'rayan-bensalem',
    name: 'ريان بن سالم',
    role: 'خبير إعلانات رقمية وميديا بايينغ (Media Buying)',
    image: '/teachers/rayan-bensalem.jpg',
    bioPoints: [
      'مسير ميزانيات إعلانية بمئات آلاف الدنانير على فيسبوك وتيك توك',
      'مختص في استراتيجيات الاستهداف والـ Scaling لتحقيق أعلى عائد',
      'يوريك أسرار إعلانات تجيب مبيعات حقيقية بأقل تكلفة للعميل',
    ],
  },
  {
    id: 'youssef-mejri',
    name: 'يوسف الماجري',
    role: 'خبير بناء المتاجر والـ CRO واللوجستيك والتوصيل',
    image: '/teachers/youssef-mejri.jpg',
    bioPoints: [
      'صمم أكثر من 80 متجر إلكتروني بمعدلات تحويل مبيعات عالية',
      'خبير إدارة المخزون، التعامل مع شركات التوصيل وتقليل الـ Retour',
      'يرافقك في بناء براند احترافية تخدم على المدى الطويل',
    ],
  },
];

export default function SolutionsSection() {
  const [activeId, setActiveId] = useState<string>('mohamed-aziz');

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
            في كورس "Ecom Mastery 1.0"
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
                    alt={teacher.name}
                    className="strip-image"
                    loading="lazy"
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
            onClick={() => (window.location.href = '#section9')}
          >
            إبدأ رحلتك نحو النجاح توا
          </Button>
        </div>
      </div>
    </section>
  );
}
