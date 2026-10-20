import '../../styles/FAQSection.css';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const WHATSAPP_NUMBER = '21622584067';

const faqs = [
  {
    question: 'أنا مبتدئ، نجم ننجح؟',
    answer: 'أكيد. الكورس معمول باش تبدأ من الصفر خطوة بخطوة.',
  },
  {
    question: 'نحتاج ميزانية كبيرة؟',
    answer: 'لا، نبدأ بأقل تكلفة ونخدم بطريقة ذكية.',
  },
  {
    question: 'هل المحتوى مناسب لتونس؟',
    answer: '100%. كل الدروس مبنية على تجارب تونسية حقيقية.',
  },
  {
    question: 'وقتاش نشوف النتائج؟',
    answer: 'في العادة من أول 2 إلى 4 أسابيع كي تطبق كل شي بجدية.',
  },
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [customQuestion, setCustomQuestion] = useState('');

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const sendQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const question = customQuestion.trim();
    if (!question) return;

    const text = `سؤال على كورس Ecom Mastery 1.0:\n\n${question}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setCustomQuestion('');
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
      <p className="faq-subtitle">إضغط على أي سؤال باش تشوف الجواب</p>
    </div>

    {/* FAQ Items */}
    <div className="faq-items">
      {faqs.map(({ question, answer }, index) => {
        const isOpen = openFAQ === index;
        return (
          <div key={index} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="question-text">{question}</span>
              <FiChevronDown className="toggle-icon" aria-hidden="true" />
            </button>
            <div id={`faq-answer-${index}`} className="faq-answer" role="region">
              <div className="faq-answer-inner">
                <p className="answer-text">{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Ask something else */}
    <form className="faq-ask" onSubmit={sendQuestion}>
      <div className="faq-ask-header">
        <span className="faq-ask-icon"><FaWhatsapp /></span>
        <div>
          <h3 className="faq-ask-title">عندك سؤال آخر؟</h3>
          <p className="faq-ask-text">أكتب سؤالك وإبعثهولنا على الواتساب، نجاوبوك في أقرب وقت.</p>
        </div>
      </div>
      <textarea
        className="faq-ask-input"
        rows={3}
        placeholder="أكتب سؤالك هنا..."
        value={customQuestion}
        onChange={(e) => setCustomQuestion(e.target.value)}
        aria-label="سؤالك"
      />
      <button type="submit" className="faq-ask-button" disabled={!customQuestion.trim()}>
        <FaWhatsapp />
        إبعث على الواتساب
      </button>
    </form>
  </div>
</section>
  );
}
