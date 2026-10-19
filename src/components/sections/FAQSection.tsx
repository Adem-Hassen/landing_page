import '../../styles/FAQSection.css';
import { useState } from 'react';

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
<section id="section10" className="faq-section">
  <div className="faq-container">
    <div className="glow-corner-top-left"></div>
    <div className="glow-corner-bottom-right"></div>
    
    {/* Main Title */}
    <div className="text-center mb-12">
      <h2 className="faq-main-title">
        الأسئلة الشائعة
      </h2>
    </div>

    {/* FAQ Items */}
    <div className="faq-items">
      {/* FAQ 1 */}
      <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(0)}>
          <span className="question-icon"><p>س</p></span>
          <h3 className="question-text">أنا مبتدئ، نجم ننجح؟</h3>
          <span className="toggle-icon">{openFAQ === 0 ? '−' : '+'}</span>
        </div>
        {openFAQ === 0 && (
          <div className="faq-answer">
            <span className="answer-icon"><p>ج</p></span>
            <p className="answer-text">أكيد. الكورس معمول باش تبدأ من الصفر خطوة بخطوة.</p>
          </div>
        )}
      </div>

      {/* FAQ 2 */}
      <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(1)}>
          <span className="question-icon"><p>س</p></span>
          <h3 className="question-text">نحتاج ميزانية كبيرة؟</h3>
          <span className="toggle-icon">{openFAQ === 1 ? '−' : '+'}</span>
        </div>
        {openFAQ === 1 && (
          <div className="faq-answer">
            <span className="answer-icon"><p>ج</p></span>
            <p className="answer-text">لا، نبدأ بأقل تكلفة ونخدم بطريقة ذكية.</p>
          </div>
        )}
      </div>

      {/* FAQ 3 */}
      <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(2)}>
          <span className="question-icon"><p>س</p></span>
          <h3 className="question-text">هل المحتوى مناسب لتونس؟</h3>
          <span className="toggle-icon">{openFAQ === 2 ? '−' : '+'}</span>
        </div>
        {openFAQ === 2 && (
          <div className="faq-answer">
            <span className="answer-icon"><p>ج</p></span>
            <p className="answer-text">100%. كل الدروس مبنية على تجارب تونسية حقيقية.</p>
          </div>
        )}
      </div>

      {/* FAQ 4 */}
      <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(3)}>
          <span className="question-icon"><p>س</p></span>
          <h3 className="question-text">وقتاش نشوف النتائج؟</h3>
          <span className="toggle-icon">{openFAQ === 3 ? '−' : '+'}</span>
        </div>
        {openFAQ === 3 && (
          <div className="faq-answer">
            <span className="answer-icon"><p>ج</p></span>
            <p className="answer-text">في العادة من أول 2 إلى 4 أسابيع كي تطبق كل شي بجدية.</p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
  );
}
