import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../../styles/HeroSection.css';
import Button from '../shared/Button';
import VideoPlayer from '../shared/VideoPlayer';

const HEADLINE =
  'الأسرار إلي باش تكتشفهم بعد ما تتفرّج في الفيديو هذا، باش تخلّيك تكتشف إنك قادر تعمل فلوس أكثر ببرشا من التجارة الإلكترونية في تونس، سواء كنت مبتدئ ولا عندك خبرة!';
const WORDS = HEADLINE.split(' ');

const EASE = [0.16, 1, 0.3, 1] as const;
const WORD_DURATION = 0.6;
// ~30 words: 35ms keeps the whole sequence within ~1.8s.
const WORD_STAGGER = 0.035;
const LAST_WORD_START = (WORDS.length - 1) * WORD_STAGGER;
const CTA_DELAY = LAST_WORD_START + 0.15;
const VIDEO_DELAY = CTA_DELAY + 0.15;

const BEAM_SEGMENTS = [
  { len: 18, cls: 'video-beam__seg--tail' },
  { len: 11, cls: 'video-beam__seg--mid' },
  { len: 5, cls: 'video-beam__seg--body' },
  { len: 1.5, cls: 'video-beam__seg--head' },
];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [compact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      frame.classList.toggle('is-offscreen', !entry.isIntersecting);
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const scrollToVideo = () => {
    const videoElement = document.getElementById('video-section');
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const wordFrom = compact
    ? { opacity: 0, y: 8, filter: 'blur(6px)' }
    : { opacity: 0, y: 12, filter: 'blur(8px)' };
  const wordTo = { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <>
      <section id="/" className="hero-section">
        <h1 className="title1">
          {WORDS.map((word, i) => (
            <Fragment key={i}>
              <motion.span
                className="hero-word"
                initial={reduceMotion ? false : wordFrom}
                animate={wordTo}
                transition={{ duration: WORD_DURATION, ease: EASE, delay: i * WORD_STAGGER }}
              >
                {word}
              </motion.span>
              {i < WORDS.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h1>
      </section>
      <motion.div
        className="cta-section"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: CTA_DELAY }}
      >
        <Button variant="outline" size="lg" className="btn-glow" onClick={scrollToVideo}>
          تفرج في الفيديو قبل كل شي
        </Button>
      </motion.div>
      <div id="video-section" className="video-section">
        <motion.div
          ref={frameRef}
          className="video-frame"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: VIDEO_DELAY }}
        >
          <VideoPlayer videoUrl="https://www.youtube.com/watch?v=Kl-I7sUcAOY" />
          <svg className="video-beam" aria-hidden="true" focusable="false">
            <rect className="video-beam__base" pathLength={100} />
            {BEAM_SEGMENTS.map(({ len, cls }) => (
              <rect
                key={cls}
                className={`video-beam__seg ${cls}`}
                pathLength={100}
                style={{ '--seg': len } as CSSProperties}
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </>
  );
}
