import '../../styles/FAQSection.css';
import { useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const resizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      if (customQuestion.trim()) formRef.current?.requestSubmit();
    }
  };

  return (
    <section id="section10" className="faq-section" dir="rtl">
      <div className="faq-container">
        <div className="glow-corner-top-left"></div>
        <div className="glow-corner-bottom-right"></div>

        <header className="faq-heading">
          <h2 className="faq-main-title">الأسئلة الشائعة</h2>
          <p className="faq-subtitle">إضغط على أي سؤال باش تشوف الجواب</p>
        </header>

        <div className="faq-items">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openFAQ === index;
            return (
              <div key={question} className={`faq-item${isOpen ? ' is-open' : ''}`}>
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

        <form ref={formRef} className="faq-composer faq-composer-standalone" onSubmit={sendQuestion}>
          <div className="faq-composer-invitation">
            <h3 className="faq-ask-title">عندك سؤال آخر؟</h3>
            <p className="faq-ask-text">أكتب سؤالك وإبعثهولنا على الواتساب، نجاوبوك في أقرب وقت.</p>
          </div>

          <div className="faq-composer-box">
            <label htmlFor="faq-custom-question" className="faq-visually-hidden">سؤالك</label>
            <textarea
              ref={textareaRef}
              id="faq-custom-question"
              className="faq-ask-input"
              rows={1}
              placeholder="أكتب سؤالك هنا..."
              value={customQuestion}
              onChange={(event) => {
                setCustomQuestion(event.target.value);
                resizeTextarea(event.target);
              }}
              onKeyDown={handleComposerKeyDown}
              aria-label="سؤالك"
            />
            <button
              type="submit"
              className="faq-ask-button"
              disabled={!customQuestion.trim()}
              aria-label="إبعث على الواتساب"
            >
              <FaWhatsapp aria-hidden="true" />
              <span>إبعث على الواتساب</span>
            </button>
          </div>
          <p className="faq-composer-hint">Ctrl / ⌘ + Enter</p>
        </form>
      </div>
    </section>
  );
}
