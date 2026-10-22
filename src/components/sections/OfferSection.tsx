import '../../styles/OfferSection.css';
import { useState } from 'react';
import Button from '../shared/Button';
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";

export default function OfferSection() {
  const [validation, setValidation] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Add this handleInputChange function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Only allow numbers, +, -, spaces, and parentheses
      const phoneRegex = /^[0-9+\-\s()]*$/;
      if (phoneRegex.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else{setFormData(prev => ({
      ...prev,
      [name]: value
    }));}
    
  };

  const sendViaWhatsApp = () => {

    if (!formData.email || !formData.name || !formData.phone) {
      setValidation(false);
      return; // Stop if validation fails
    }
    const { name, email, phone, message } = formData;
    
    const text = `
طلب انضمام جديد 📝

الاسم: ${name}
البريد: ${email}
الهاتف: ${phone}
${message ? `الرسالة: ${message}` : ''}

أرغب في الانضمام للكورس
    `.trim();

    const whatsappLink = `https://wa.me/21622584067?text=${encodeURIComponent(text)}`;
    
    window.open(whatsappLink, '_blank');
  };

  return (
<section id="join-us" className="offer-section">
  <div className="offer-container">
    <div className="glow-corner-top-right"></div>
    <div className="glow-corner-bottom-left"></div>
    
    {/* Main Title */}
    <div className="text-center mb-12">
      <h2 className="offer-main-title">
        إنضم إلينا وابدأ رحلتك نحو النجاح
      </h2>
    </div>

    {/* Flip Cards Container */}
    <div className="flip-cards-container">
    <div className="flip-card contact-flip-card">
    <div className="flip-card-inner">
      {/* Front Side - Contact Info */}
      <div className="flip-card-front">
        <div className="contact-info-card">
          <div className="contact-info-header">
            <div className="header-icon"><FaAddressCard size={"3.2rem"}/>
</div>
            <h3>معلومات الاتصال</h3>
          </div>
          
          <div className="contact-info-content">
            <div className="contact-method">
              <div className="contact-icon"><FaWhatsapp size={"1.5em"} style={{marginBottom:"0.5rem"}}/></div>
              <div className="contact-details">
                <h4>الواتساب</h4>
                <p><bdi>+216 12 345 678</bdi></p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon"><MdOutlineMailOutline size={"1.5em"}/></div>
              <div className="contact-details">
                <h4>البريد الإلكتروني</h4>
                <p><bdi>contact@example.com</bdi></p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon"><BiSupport size={"1.5em"}/></div>
              <div className="contact-details">
                <h4>أوقات الدعم</h4>
                <p>كل أيام الأسبوع من 9 صباحاً إلى 10 مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Side - New Content (Add your content here) */}
      <div className="flip-card-back">
        <div className="contact-card">
          <div className="contact-header">
      <h3 className="offer-title">العرض الخاص</h3>
      <div className="offer-badge">محدود</div>          
          </div>
          
  <div className="offer-content">
      <div className="price-section">
        <div className="price"><bdi>299</bdi> <span className="currency">دينار</span></div>
      </div>
      <div className="animation-section">
   
      </div>
       <div className="offer-features-back">
        <div className="feature">
          <span className="feature-icon"><FaGraduationCap  /></span>
          <span>كورس كامل من الصفر للإحتراف</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><IoLogoWhatsapp />
</span>
          <span>دعم مباشر على الواتساب</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><MdAccessTimeFilled />
</span>
          <span>وصول دائم للمحتوى</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><FaUsers />
</span>
          <span >مجموعة خاصة بالطلاب</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><PiCertificateFill /></span>
          <span>شهادة إتمام</span>
        </div>
      </div>
      
     
      
     
    </div>   
     
  
        </div>
      </div>
    </div>
  </div>
      {/* Main Offer Card (Front) */}
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Front Side - Offer */}
       <div className="flip-card-front">
        
  <div className="offer-card">
          
    <div className="offer-header">
      <h3 className="offer-title">العرض الخاص</h3>
      <div className="offer-badge">محدود</div>
    </div>
     
    <div className="offer-content">
      <div className="price-section">
        <div className="price"><bdi>299</bdi> <span className="currency">دينار</span></div>
      </div>
       <div className="features-with-overlay-animation">
      <div className="animation-overlay">
   <img src="Online Course.png" alt="" />
      
    
      </div>
      <div className="offer-features">
        <div className="feature">
          <span className="feature-icon"><FaGraduationCap  /></span>
          <span>كورس كامل من الصفر للإحتراف</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><IoLogoWhatsapp />
</span>
          <span>دعم مباشر على الواتساب</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><MdAccessTimeFilled />
</span>
          <span>وصول دائم للمحتوى</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><FaUsers />
</span>
          <span >مجموعة خاصة بالطلاب</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><PiCertificateFill /></span>
          <span>شهادة إتمام</span>
        </div>
      </div>
      </div>
    
    
    </div>
    
    <div className="offer-actions">
       <Button
    variant="outline"
    size="lg"
    className="flip-btn"
    onClick={() => {
      const offerCard = document.querySelector('.flip-card:not(.contact-flip-card)');
      const contactCard = document.querySelector('.contact-flip-card');
      
      if (offerCard) offerCard.classList.add('flipped');
      if (contactCard) contactCard.classList.add('flipped');
    }}
  >
    سجل الآن
  </Button>
    </div>
  </div>
</div>

          {/* Back Side - Contact Form */}
          <div className="flip-card-back">
            <div className="contact-card">
              <div className="contact-header">
                <h3 className="contact-title">سجل في الكورس</h3>
               <button 
  className="back-btn"
  onClick={() => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setValidation(true);
    
    // Flip back both cards
    const offerCard = document.querySelector('.flip-card:not(.contact-flip-card)');
    const contactCard = document.querySelector('.contact-flip-card');
    
    if (offerCard) offerCard.classList.remove('flipped');
    if (contactCard) contactCard.classList.remove('flipped');
  }}
>
  رجوع
</button>
              </div>
              
              <div className="contact-form">
  <div className="form-group">
    <label>الاسم الكامل</label>
    <input 
      type="text" 
      name="name"
      placeholder="أدخل اسمك الكامل" 
      value={formData.name}
      onChange={handleInputChange}
      className={!validation && !formData.name ? 'error' : ''}

    />
  </div>
  
  <div className="form-group">
    <label>البريد الإلكتروني</label>
    <input 
      type="email" 
      name="email"
      placeholder="example@email.com" 
      value={formData.email}
      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
      onChange={handleInputChange}
            className={!validation && (!formData.email.includes('@') || !formData.email.includes('.')) ? 'error' : ''}

    />
  </div>
  
  <div className="form-group">
    <label>رقم الهاتف</label>
    <input 
      type="tel" 
      name="phone"
      placeholder="+216 XX XXX XXX" 
       pattern="[0-9+-\s()]*"
      inputMode="numeric"
      maxLength={8}
      value={formData.phone}
      onChange={handleInputChange}
            className={!validation && !formData.phone ? 'error' : ''}

    />
  </div>
  
  <div className="form-group">
    <label>رسالة</label>
    <textarea 
      name="message"
      placeholder="أي أسئلة أو استفسارات..." 
      rows={3}
      value={formData.message}
      onChange={handleInputChange}
    ></textarea>
  </div>
</div>

<div className="contact-actions">
 
  <Button
    variant="outline"
    size="lg"
    className="email-btn"
    onClick={sendViaWhatsApp}
  >
سجل توا  

</Button>
</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Card (Static) */}
    
    </div>
  </div>
</section>
  );
}
