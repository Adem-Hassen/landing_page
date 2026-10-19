import '../../styles/JourneyTimeline.css';
import { ImageIcon, ArrowLeft } from 'lucide-react';

interface TimelineStep {
  id: number;
  stepNumber: string;
  badgeLabel: string;
  title: string;
  intro?: string;
  bullets?: string[];
  description?: string;
  placeholderHint: string;
  image?: string; // Easily add image URL here later: image: "/images/step1.png"
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 1,
    stepNumber: '01',
    badgeLabel: 'المرحلة 01',
    title: 'الواقع في 2026 !',
    intro: 'المشكل ماهيش في التجارة الإلكترونية ،التجارة الإلكترونية مازلت فيها برشة فلوس و الفرصة ماشية و تكبر . المشكل في 3 حاجات:',
    bullets: [
      'فما برشة معلومات غلطة قاعدين يتسوقوا',
      'فما طرق قديمة متع خدمة معادش تخدم',
      'كل يوم فما حاجات جدد في الدومين و صعيب تلقى شكون يحكي عليهم',
    ],
    placeholderHint: 'صورة توضيحية: واقع التجارة الإلكترونية 2026',
  },
  {
    id: 2,
    stepNumber: '02',
    badgeLabel: 'المرحلة 02',
    title: 'صعوبة البدايات',
    description:
      'أول مابديت في مجال التجارة الإلكترونية كنت ضايع وفهمت أنوا لازمني نتعلم ونستثمر في روحي قبل ، خذيت كورس الاول جربت وفشلت، كورس الثاني جربت وفشلت، كورس الثالث جربت وفشلت. إلى أن اكتشفت الحقيقة إلي خلاتني نبدى نشوف في النتائج إلي كنت نحلم بيه',
    placeholderHint: 'صورة توضيحية: تحديات وتجارب البدايات',
  },
  {
    id: 3,
    stepNumber: '03',
    badgeLabel: 'المرحلة 03',
    title: 'الإكتشاف إلي حول الفشل لنجاح كبير',
    description:
      'بعد ماخذيت كورسات في تونس وجربت وممشاتش الأمور ، اكتشفت أنوا بش تنجح في التجارة الإلكترونية لازمك تتعلم أكثر و من مصادر أفضل و نجرب طرق جديدة متع خدمة . وقتها بديت نشوف في نتائج إلي نحب عليها وهذا الكل بفضل ربي قبل كلشي',
    placeholderHint: 'صورة توضيحية: نقطة التحول واكتشاف الأساليب الجديدة',
  },
  {
    id: 4,
    stepNumber: '04',
    badgeLabel: 'المرحلة 04',
    title: 'الخلاصة',
    description:
      'الحكاية ماهيش صعيبة، لكن لازم تبدأ بطريقة صحيحة، خطوات واضحة و أهم حاجة من انسان تعدى بالخطوات الكل و وصل للنتيجة إلي تحب عليها إنتي.',
    placeholderHint: 'صورة توضيحية: خارطة طريق النجاح والنتيجة النهائية',
  },
];

export default function JourneyTimeline() {
  return (
    <section className="journey-section" id="journey-timeline" dir="rtl">
      <div className="journey-container">
        {/* Ambient Corner Glows */}
        <div className="glow-corner-top-left" aria-hidden="true" />
        <div className="glow-corner-bottom-right" aria-hidden="true" />

        {/* Section Header */}
        <div className="journey-header">
        
          <h2 className="journey-main-title">
            تعديت بنفس تسألتك ومخاوفك قبل 5 سنين وخلي نطمنك إلي فما اجابت لكل تسأل
          </h2>
        </div>

        {/* 1. Timeline Cards Grid (RTL 4 Columns: 1 → 2 → 3 → 4) */}
        <div className="timeline-cards-grid">
          {TIMELINE_STEPS.map((step) => (
            <article key={step.id} className="timeline-card">
              {/* Card Top Bar with Stage Badge & Big Number */}
              <div className="card-top-bar">
                <span className="card-step-badge">
                  <span>{step.badgeLabel}</span>
                  <ArrowLeft size={12} />
                </span>
                <span className="card-step-number-tag">#{step.stepNumber}</span>
              </div>

              {/* Dedicated Enlarged Image Placeholder Container (4:3) */}
              <div className="timeline-image-container">
                {step.image ? (
                  <img
                    src={step.image}
                    alt={step.title}
                    className="timeline-step-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="timeline-placeholder-content" title="انقر أو استبدل هذا المكان بصورتك">
                    <div className="placeholder-icon-halo">
                      <ImageIcon size={26} />
                    </div>
                    <span className="placeholder-label-text">{step.placeholderHint}</span>
                    <span className="placeholder-badge">مكان مخصص للصورة (4:3)</span>
                  </div>
                )}
              </div>

              {/* Text Hierarchy & Content */}
              <div className="card-text-content">
                <h3 className="step-card-title">{step.title}</h3>

                {step.intro && (
                  <p className="step-card-intro">{step.intro}</p>
                )}

                {step.bullets && (
                  <ul className="step-bullet-list" role="list">
                    {step.bullets.map((bullet, idx) => (
                      <li key={idx} className="step-bullet-item">
                        <span className="bullet-dot" aria-hidden="true">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {step.description && (
                  <p className="step-card-desc">{step.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* 2. Horizontal Spine Track UNDER THE CARDS (Desktop: 1 → 2 → 3 → 4 flowing Right-to-Left) */}
        <div className="timeline-track-wrapper" aria-hidden="true">
          {/* Continuous Glowing Line behind the Circles */}
          <div className="timeline-track-line" />

          {/* 4 Numbered Step Nodes with Vertical Stems coming from cards */}
          <div className="timeline-nodes-row">
            {TIMELINE_STEPS.map((step) => (
              <div key={step.id} className="timeline-node-item">
                <div className="node-vertical-connector" />
                <div className="step-node-circle">
                  <span>{step.stepNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
