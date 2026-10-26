import '../../styles/JourneyTimeline.css';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface TimelineStep {
  id: number;
  stepNumber: string;
  title: string;
  intro?: string;
  bullets?: string[];
  description?: string;
  /** 4:5 WebP, 1600×2000. Prompts: docs/journey-image-prompts.md */
  image?: string;
  imageAlt: string;
  imagePrompt: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 1,
    stepNumber: '01',
    title: 'الواقع في 2026 !',
    intro: 'المشكل ماهيش في التجارة الإلكترونية ،التجارة الإلكترونية مازلت فيها برشة فلوس و الفرصة ماشية و تكبر . المشكل في 3 حاجات:',
    bullets: [
      'فما برشة معلومات غلطة قاعدين يتسوقوا',
      'فما طرق قديمة متع خدمة معادش تخدم',
      'كل يوم فما حاجات جدد في الدومين و صعيب تلقى شكون يحكي عليهم',
    ],
    image: '/journey/step-1.webp',
    imageAlt: 'شاب حاير قدّام برشا شاشات فيها معلومات متضاربة',
    imagePrompt:
      'Clean modern 3D illustration, portrait composition. A young Tunisian man in his mid-20s with short dark hair and a simple navy hoodie sits at a tidy desk in a bright Mediterranean apartment, looking overwhelmed as many translucent floating screens crowd around him, filled with tangled feeds and outdated, contradictory charts drawn as abstract shapes and lines only. Behind the noise, an open arched doorway glows with a calm path of brand-blue light (#1E4ED8), the real opportunity. Soft studio lighting, smooth matte materials, gentle depth of field, slightly elevated three-quarter view. Palette: brand blue, off-white, light grey, slate, one warm terracotta accent. Clear subject with generous space around him.',
  },
  {
    id: 2,
    stepNumber: '02',
    title: 'صعوبة البدايات',
    description:
      'أول مابديت في مجال التجارة الإلكترونية كنت ضايع وفهمت أنوا لازمني نتعلم ونستثمر في روحي قبل ، خذيت كورس الاول جربت وفشلت، كورس الثاني جربت وفشلت، كورس الثالث جربت وفشلت. إلى أن اكتشفت الحقيقة إلي خلاتني نبدى نشوف في النتائج إلي كنت نحلم بيه',
    image: '/journey/step-2.webp',
    imageAlt: 'شاب تاعب في الليل قدّام تلاثة لابتوبات ما نجحوش',
    imagePrompt:
      'Clean modern 3D illustration, portrait composition, the same character as in the reference image: a young Tunisian man in his mid-20s, short dark hair, simple navy hoodie. Late at night he sits at a desk in a quiet Mediterranean apartment, shoulders slumped, rubbing his eyes with one hand, tired and frustrated. In front of him stand three laptops in a row, each screen dim and greyed out to show an attempt that did not work. A small desk lamp casts a soft warm pool of light; cool brand-blue (#1E4ED8) moonlight falls through a window with white-and-blue shutters. Soft studio lighting, smooth matte materials, gentle depth of field, eye-level camera. Palette: brand blue, slate, light grey, off-white, one warm lamp accent.',
  },
  {
    id: 3,
    stepNumber: '03',
    title: 'الإكتشاف إلي حول الفشل لنجاح كبير',
    description:
      'بعد ماخذيت كورسات في تونس وجربت وممشاتش الأمور ، اكتشفت أنوا بش تنجح في التجارة الإلكترونية لازمك تتعلم أكثر و من مصادر أفضل و نجرب طرق جديدة متع خدمة . وقتها بديت نشوف في نتائج إلي نحب عليها وهذا الكل بفضل ربي قبل كلشي',
    image: '/journey/step-3.webp',
    imageAlt: 'شاب ماشي على ثنية جديدة من بلاطات زرقاء تضوي',
    imagePrompt:
      'Clean modern 3D illustration, portrait composition, the same character as in the reference image: a young Tunisian man in his mid-20s, short dark hair, simple navy hoodie. He rises from his chair with a look of quiet realisation as a single clear, soft light appears in front of him. Ahead of him, a new path of glowing brand-blue tiles (#1E4ED8) lights up across the floor of a calm Mediterranean room, leading toward a window with white-and-blue architecture outside. The old clutter behind him fades into soft shadow. Soft studio lighting, smooth matte materials, gentle depth of field, low three-quarter camera angle. Palette: brand blue, off-white, light grey, slate, one subtle warm accent. Open space ahead of him.',
  },
  {
    id: 4,
    stepNumber: '04',
    title: 'الخلاصة',
    description:
      'الحكاية ماهيش صعيبة، لكن لازم تبدأ بطريقة صحيحة، خطوات واضحة و أهم حاجة من انسان تعدى بالخطوات الكل و وصل للنتيجة إلي تحب عليها إنتي.',
    image: '/journey/step-4.webp',
    imageAlt: 'شاب طالع في درج واضح يوصل لراية صغيرة',
    imagePrompt:
      'Clean modern 3D illustration, portrait composition, the same character as in the reference image: a young Tunisian man in his mid-20s, short dark hair, simple navy hoodie. He calmly walks up a short flight of clear, well-lit steps with a relaxed, confident posture. Each step is edged with a thin line of brand-blue light (#1E4ED8), and a small plain pennant flag with no marking or symbol stands at the top. The scene sits on a bright Mediterranean rooftop terrace with soft white-and-blue architecture blurred behind. The feeling is a simple, guided path, not a dramatic victory. Soft studio lighting, smooth matte materials, gentle depth of field, side three-quarter camera angle. Palette: brand blue, off-white, light grey, slate, one warm sunlight accent.',
  },
];

const DESKTOP_QUERY = '(min-width: 1024px)';
const EASE = [0.16, 1, 0.3, 1] as const;
const PARALLAX = 20; // px each way: ~40px of travel relative to the text

function subscribeToDesktop(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}
const getIsDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

const textGroup: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const textItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function JourneyStep({
  step,
  index,
  isDesktop,
  reduceMotion,
}: {
  step: TimelineStep;
  index: number;
  isDesktop: boolean;
  reduceMotion: boolean;
}) {
  const stepRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: stepRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [PARALLAX, -PARALLAX]);

  const cinematic = isDesktop && !reduceMotion;
  const viewport = { once: true, amount: isDesktop ? 0.35 : 0.2 };

  return (
    <li ref={stepRef} id={`journey-step-${step.id}`} className="jstory__step">
      <article className="jstory__article">
        <motion.div
          className="jstory__text"
          variants={textGroup}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="shown"
          viewport={viewport}
        >
          <motion.span className="jstory__num" variants={textItem} aria-hidden="true">
            {step.stepNumber}
          </motion.span>
          <motion.h3 className="jstory__title" variants={textItem}>
            {step.title}
          </motion.h3>
          <motion.div className="jstory__body" variants={textItem}>
            {step.intro && <p className="jstory__p">{step.intro}</p>}
            {step.bullets && (
              <ul className="jstory__bullets">
                {step.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {step.description && <p className="jstory__p">{step.description}</p>}
          </motion.div>
      
        </motion.div>

        <div className="jstory__media">
          <motion.div className="jstory__parallax" style={cinematic ? { y: parallaxY } : undefined}>
            <motion.div
              className="jstory__frame"
              initial={
                reduceMotion
                  ? false
                  : cinematic
                    ? { clipPath: 'inset(15% 15% 15% 15% round 24px)' }
                    : { opacity: 0, y: 20 }
              }
              whileInView={
                cinematic ? { clipPath: 'inset(0% 0% 0% 0% round 24px)' } : { opacity: 1, y: 0 }
              }
              viewport={viewport}
              transition={{ duration: cinematic ? 0.9 : 0.6, ease: EASE }}
            >
              {step.image && (
                <motion.img
                  src={step.image}
                  alt={step.imageAlt}
                  width={1600}
                  height={2000}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="jstory__img"
                  initial={cinematic ? { scale: 1.08 } : false}
                  whileInView={cinematic ? { scale: 1 } : undefined}
                  viewport={viewport}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </article>
    </li>
  );
}

export default function JourneyTimeline() {
  const isDesktop = useSyncExternalStore(subscribeToDesktop, getIsDesktop);
  const reduceMotion = useReducedMotion() ?? false;
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start center', 'end center'] });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // The journey counts as on screen while it crosses the middle band of the viewport.
    const visibility = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: '-35% 0px -35% 0px',
    });
    visibility.observe(list);

    // The active step is the one crossing the vertical centre.
    const steps = [...list.querySelectorAll<HTMLElement>(':scope > li')];
    const centre = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(steps.indexOf(entry.target as HTMLElement));
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    steps.forEach((step) => centre.observe(step));

    return () => {
      visibility.disconnect();
      centre.disconnect();
    };
  }, []);

  const goToStep = (id: number) => {
    document
      .getElementById(`journey-step-${id}`)
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section className="journey-section" id="journey-timeline" dir="rtl">
      <div className="journey-container">
        <div className="glow-corner-top-left" aria-hidden="true" />
        <div className="glow-corner-bottom-right" aria-hidden="true" />

        <h2 className="journey-heading">
          تعديت بنفس تسألتك ومخاوفك قبل 5 سنين وخلي نطمنك إلي فما اجابت لكل تسأل
        </h2>

        <ol className="jstory" ref={listRef}>
          {TIMELINE_STEPS.map((step, i) => (
            <JourneyStep
              key={step.id}
              step={step}
              index={i}
              isDesktop={isDesktop}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>
      </div>

      {isDesktop && (
        <div className={`jstory-progress${onScreen ? ' is-visible' : ''}`}>
          <span className="jstory-progress__track" aria-hidden="true">
            <motion.span
              className="jstory-progress__fill"
              style={reduceMotion ? { scaleY: 1 } : { scaleY: scrollYProgress }}
            />
          </span>
          {TIMELINE_STEPS.map((step, i) => (
            <button
              key={step.id}
              type="button"
              className={`jstory-progress__dot${i === active ? ' is-active' : ''}`}
              aria-label={step.title}
              aria-current={i === active ? 'step' : undefined}
              tabIndex={onScreen ? 0 : -1}
              onClick={() => goToStep(step.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
