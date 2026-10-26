import '../../styles/TargetAudienceSection.css';
import { useEffect, useRef } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import Button from '../shared/Button';

const audiencePoints = [
  {
    id: 1,
    image: '/audience/audience-income.jpg',
    tag: 'دخل جديد',
    sticker: 'دخل من الدار',
    accent: '#3b82f6',
    title: 'تحب تبدى من 0 أو جربت و فشلت.',
    text: 'ما عادش تستنى الشهرية وحدها. نعلموك كيفاش تبني متجر يخدم ليك حتى وانت راقد.',
  },
  {
    id: 2,
    image: '/audience/audience-business-hijab.jpg',
    tag: 'صاحب بزنس',
    sticker: 'مبيعات أكثر',
    accent: '#3b82f6',
    title:'عندك مشروع أما تحب تزيد في المبيعات',
    text: 'حوّل البزنس متاعك لمتجر أونلاين يوصل لكلاينات جدد كل نهار.',
  },
  {
    id: 3,
    image: '/audience/audience-beginner.jpg',
    tag: 'مبتدئ',
    sticker: 'من الصفر',
    accent: '#3b82f6',
    title: 'تحب تتعلم مهارة معينة وتبيعها كفريلنسر',
    text: 'ما تحتاج حتى خبرة. نمشيو معاك خطوة بخطوة من أول فكرة لأول بيعة.',
  },
];

function handleSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
}

export default function TargetAudienceSection() {
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = panelsRef.current;
    if (!panels) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          panels.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(panels);
    return () => observer.disconnect();
  }, []);

  return (
<section id="section6" className="target-audience-section">
  <div className="target-audience-container">
    <div className="glow-corner-top-left"></div>
    <div className="glow-corner-bottom-right"></div>
    
    {/* Main Title */}
    <div className="text-center mb-12">
      <h2 className="target-audience-main-title">
        كورس <bdi>"Ecom Mastery 1.0"</bdi> هو الحل ليك ، إذا كنت
      </h2>
    </div>

    {/* Audience Panels */}
    <div className="audience-panels" ref={panelsRef}>
      {audiencePoints.map((point, index) => (
        <article
          key={point.id}
          className="audience-panel"
          style={{ '--accent': point.accent, '--i': index } as CSSProperties}
          onMouseMove={handleSpotlight}
        >
          <img src={point.image} alt={point.title} className="audience-panel-image" />
          <div className="audience-panel-shade"></div>
          <div className="audience-panel-spotlight"></div>

          <span className="audience-panel-number">0{index + 1}</span>

          <div className="audience-panel-content">
            <h3 className="audience-panel-title">{point.title}</h3>
          </div>
        </article>
      ))}
    </div>

          <div className="course-parts-cta">
      <Button
        variant="outline"
        size="lg"
        className="btn-glow"
        onClick={() => (window.location.href = "#join-us")}
      >
إنضم معانا توّا     </Button>
    </div>
  </div>
</section>
  );
}
