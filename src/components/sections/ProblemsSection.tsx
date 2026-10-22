import '../../styles/ProblemsSection.css';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

type Question = (typeof questions)[number];

const DESKTOP_QUERY = '(min-width: 769px)';

const questions = [
  {
    image: '/problems/problem-information-overload.jpg',
    title: 'معادش عارف منين تتعلم',
    description: 'فما برشا معلومات و إنتي حاير منين و كفاش تبدا',
  }, {
    image: '/problems/problem-trust-advice.jpg',
    title: 'هل الناس إلي تعطي في المعلومة، يعرفوا فاش قاعدين يعملوا و نجحوا بالحق ؟',
    description: 'توا برشا صناع محتوى تعطي في معلومات على كيفاش تعمل فلوس، أما لازم تعرف تختار الشخص المناسب !',
  },
  {
    image: '/problems/problem-self-doubt.jpg',
    title: 'هل نجم ننجح انا زادة ؟',
    description: 'بالك صعيبة ولا منجمش روحي ولا لزمني راس مال كبير ولا برش وقت !؟!',
  },
 
 
];

const LAST = questions.length - 1;

function subscribeToDesktop(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

function getIsDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

const pad = (index: number) => String(index + 1).padStart(2, '0');

function Scene({
  index,
  progress,
  active,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  active: boolean;
  children: ReactNode;
}) {
  // Distance from the centre of the stage, in panel widths (0 = centred, 1 = next slot to the left).
  const distance = useTransform(progress, (p) => index - p * LAST);
  const x = useTransform(distance, (d) => `${-d * 92}%`);
  const rotateY = useTransform(distance, (d) => -Math.max(-1.5, Math.min(1.5, d)) * 38);
  const z = useTransform(distance, (d) => -Math.min(Math.abs(d), 2) * 180);
  const scale = useTransform(distance, (d) => 1 - Math.min(Math.abs(d), 2) * 0.12);
  const opacity = useTransform(distance, (d) => Math.max(0, 1 - Math.abs(d) * 0.6));

  return (
    <motion.div
      className={`quest-panel quest-scene${active ? ' is-active' : ''}`}
      style={{ x, z, rotateY, scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

function PinnedTrack({
  activeIndex,
  onActive,
  renderBody,
}: {
  activeIndex: number;
  onActive: (index: number) => void;
  renderBody: (question: Question, index: number) => ReactNode;
}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });

  // React bails out when the index is unchanged, so this only re-renders when the centred panel changes.
  useMotionValueEvent(scrollYProgress, 'change', (p) => onActive(Math.round(p * LAST)));

  return (
    <div className="quest-pin" ref={pinRef}>
      <div className="quest-stage">
        <div className="quest-scenes">
          {questions.map((question, index) => (
            <Scene key={question.image} index={index} progress={scrollYProgress} active={index === activeIndex}>
              {renderBody(question, index)}
            </Scene>
          ))}
        </div>

        <div className="quest-progress" aria-hidden="true">
          <div className="quest-progress-track">
            <motion.div className="quest-progress-fill" style={{ scaleX: scrollYProgress }} />
          </div>
          {questions.map((question, index) => (
            <span
              key={question.image}
              className={`quest-step${index <= activeIndex ? ' is-reached' : ''}${
                index === activeIndex ? ' is-active' : ''
              }`}
              style={{ insetInlineStart: `${(index / LAST) * 100}%` }}
            >
              {pad(index)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProblemsSection() {
  const isDesktop = useSyncExternalStore(subscribeToDesktop, getIsDesktop);
  const reduceMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  const swipeRef = useRef<HTMLDivElement>(null);

  const pinned = isDesktop && !reduceMotion;

  // Mobile swipe carousel: the most visible slide is the active one.
  useEffect(() => {
    const scroller = swipeRef.current;
    if (isDesktop || !scroller) return;

    const ratios = questions.map(() => 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[Number((entry.target as HTMLElement).dataset.index)] = entry.intersectionRatio;
        });
        setActiveIndex(ratios.indexOf(Math.max(...ratios)));
      },
      { root: scroller, threshold: [0, 0.25, 0.5, 0.75, 0.9, 1] }
    );

    scroller.querySelectorAll('[data-index]').forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [isDesktop]);

  const renderBody = (question: Question, index: number) => (
    <>
      <div className="quest-copy">
        <span className="quest-marker" aria-hidden="true">
          {pad(index)}
        </span>
        <h4 className="quest-title">{question.title}</h4>
        <p className="quest-text">{question.description}</p>
      </div>
      <div className="quest-media" aria-hidden="true">
        <span className="quest-ghost">{pad(index)}</span>
        <img
          src={question.image}
          alt=""
          loading={index === 0 ? 'eager' : 'lazy'}
          className="quest-illustration"
        />
      </div>
    </>
  );

  return (
    <section id="section2" className="problems-section">
      <div className="problems-container">
        <div className="glow-corner-bottom"></div>
        <div className="glow-corner-top-right"></div>
        <div className="glow-corner-bottom-left"></div>

        <h2 className="problems-main-title">
          الكلّ يحكي على الربح من الإنترنت… أما قليل إلي يورّيك كيفاش تعملها بالحق!
        </h2>

        <p className="problems-description">
          يمكن شفت برشا الفيديوهات ، قريت عشرات البوستات، و مازلت ما تعرفش منين تبدأ. كل مرة معلومة جديدة أما مازلت الثنية ماش واضحة
        </p>

        <h3 className="problems-subtitle">والمشكل الأكبر</h3>

        {pinned && <PinnedTrack activeIndex={activeIndex} onActive={setActiveIndex} renderBody={renderBody} />}

        {isDesktop && !pinned && (
          <div className="quest-grid">
            {questions.map((question, index) => (
              <div key={question.image} className="quest-panel quest-card is-active">
                {renderBody(question, index)}
              </div>
            ))}
          </div>
        )}

        {!isDesktop && (
          <>
            <div className="quest-swipe" ref={swipeRef}>
              {questions.map((question, index) => (
                <div
                  key={question.image}
                  data-index={index}
                  className={`quest-panel quest-card${index === activeIndex ? ' is-active' : ''}`}
                >
                  {renderBody(question, index)}
                </div>
              ))}
            </div>
            <div className="quest-dots" aria-hidden="true">
              {questions.map((question, index) => (
                <span key={question.image} className={`quest-dot${index === activeIndex ? ' is-active' : ''}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
