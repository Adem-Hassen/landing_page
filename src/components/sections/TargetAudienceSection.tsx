import '../../styles/TargetAudienceSection.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Button from '../shared/Button';

export default function TargetAudienceSection() {
  return (
<section id="section6" className="target-audience-section">
  <div className="target-audience-container">
    <div className="glow-corner-top-left"></div>
    <div className="glow-corner-bottom-right"></div>
    
    {/* Main Title */}
    <div className="text-center mb-16">
      <h2 className="target-audience-main-title">
        كورس "Ecom Mastery 1.0" هو الحل ليك ، إذا كنت
      </h2>
    </div>

    {/* Three Icon Points */}
    <div className="icon-points-grid">
      {/* Point 1 */}
      <div className="icon-point">
        <div className="icon-wrapper">
          <DotLottieReact
            src="Money (1).lottie"
            loop
            autoplay
            style={{ width: '120px', height: '120px' }}
          />
        </div>
        <h3 className="icon-point-title">
          تحب تغيّر حياتك وتبني مصدر دخل حقيقي
        </h3>
      </div>

      {/* Point 2 */}
      <div className="icon-point">
        <div className="icon-wrapper">
          <DotLottieReact
            src="Growth.lottie"
            loop
            autoplay
            style={{ width: '120px', height: '120px' }}
          />
        </div>
        <h3 className="icon-point-title">
          عندك بزنس صغير وتحب تكبر المبيعات
        </h3>
      </div>

      {/* Point 3 */}
      <div className="icon-point">
        <div className="icon-wrapper">
          <DotLottieReact
            src="Knowledge, Idea, Power, Books, Creativity, Learning Animation icon.lottie"
            loop
            autoplay
            style={{ width: '120px', height: '120px' }}
          />
        </div>
        <h3 className="icon-point-title">
          نت شاب حاب تبدأ من الصفر وتتعلم التجارة الإلكترونية
        </h3>
      </div>
    </div>
          <div className="course-parts-cta">
      <Button
        variant="outline"
        size="lg"
        className="btn-glow btn-extra-large"
        onClick={() => (window.location.href = "#section9")}
      >
 get it now      </Button>
    </div>
  </div>
</section>
  );
}
