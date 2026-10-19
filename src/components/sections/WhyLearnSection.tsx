import '../../styles/WhyLearnSection.css';
import { FaBrain } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { GiTunisia } from "react-icons/gi";

export default function WhyLearnSection() {
  return (
<section id="section7" className="why-learn-section">
  <div className="why-learn-container">
    <div className="glow-corner-top-right"></div>
    <div className="glow-corner-bottom-left"></div>
    
    {/* Main Title */}
    <div className="text-center mb-8">
      <h2 className="why-learn-main-title">
        علاش تتعلم مني؟
      </h2>
    </div>

    {/* Subtitle */}
    <div className="text-center mb-12">
      <p className="why-learn-subtitle">
        بديت من لا شيء: تليفون، كمبيوتر، وإنترنت.
        
        غلطت، خسرت، تعلمت، ورجعت نحاول حتى نجحت.
       
        اليوم نشارك معاكم كل حاجة تعلمتها بالخبرة  في تونس
      </p>
    </div>

    {/* Cards Grid with New Row Arrangement */}
    <div className="why-learn-cards-grid">
      {/* First Row: Profile Card + Reason 1 */}
      <div className="first-row">
<div className="profile-card main-card">
  <div className="profile-image-full">
    <img 
      src="image.png" 
      alt="محمد عزيز اللطيف" 
      className="profile-image"
    />
    
    {/* Gradient Overlays */}
    <div className="gradient-overlay-top"></div>
    <div className="gradient-overlay-bottom"></div>
    <div className="gradient-overlay-sides"></div>
    
    {/* Text Content Overlay */}
    <div className="profile-content-overlay">
      <h3 className="profile-name">محمد عزيز اللطيف</h3>
      <div className="profile-quote">
        <p>"بديت من الصفر، وعرفت شنوّة المشاكل إلي تواجهك"</p>
      </div>
    </div>
  </div>
</div>

        {/* Reason 1 - Large Rectangle */}
        <div className="reason-card large-rectangle">
          <div className="reason-icon" ><FaBrain size="2em" /></div>
          <div className="reason-content">
            <h3 className="reason-title">تطبيقي</h3>
            <p className="reason-description">
              نعلّمك من التجربة، موش من الكتب
            </p>
          </div>
        </div>
      </div>

      {/* Second Row: Three Reason Cards */}
      <div className="second-row">
        {/* Reason 2 - Medium Square */}
        <div className="reason-card medium-square">
          <div className="reason-icon"><FaHandsHelping />
</div>
          <div className="reason-content">
            <h3 className="reason-title">قريب ليك</h3>
            <p className="reason-description">
              نعرف شنوّة تفكر وشنوّة مشاكلك
            </p>
          </div>
        </div>

        {/* Reason 3 - Medium Square */}
        <div className="reason-card medium-square">
          <div className="reason-icon"><FiTarget /></div>
          <div className="reason-content">
            <h3 className="reason-title">نَتائِج</h3>
            <p className="reason-description">
              كل درس فيه تطبيق واضح
            </p>
          </div>
        </div>

        {/* Reason 4 - Medium Square */}
        <div className="reason-card medium-square">
          <div className="reason-icon"><GiTunisia /></div>
          <div className="reason-content">
            <h3 className="reason-title">محلي</h3>
            <p className="reason-description">
              كل خطوة مهيّأة للسوق التونسية
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
