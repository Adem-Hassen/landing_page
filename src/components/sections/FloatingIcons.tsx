import { useState, useEffect, useRef, type ComponentType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  PiStorefrontFill,
  PiShoppingBagFill,
  PiTruckFill,
  PiChartLineUpFill,
  PiTargetFill,
  PiStarFill,
} from 'react-icons/pi';
import '../../styles/FloatingIcons.css';

interface FloatingIconsProps {
  showIcons?: boolean;
  isScrolling?: boolean;
}

interface OrbitIcon {
  Icon: ComponentType;
  angle: number;
}

interface OrbitRing {
  ring: 'inner' | 'outer';
  icons: OrbitIcon[];
}

// Outer ring is offset by 60deg so its tiles start between the inner ones
const ORBITS: OrbitRing[] = [
  {
    ring: 'inner',
    icons: [
      { Icon: PiStorefrontFill, angle: -90 },
      { Icon: PiShoppingBagFill, angle: 30 },
      { Icon: PiTruckFill, angle: 150 },
    ],
  },
  {
    ring: 'outer',
    icons: [
      { Icon: PiChartLineUpFill, angle: -30 },
      { Icon: PiTargetFill, angle: 90 },
      { Icon: PiStarFill, angle: 210 },
    ],
  },
];

const RING_ENTRANCE = 1;
const TILE_STAGGER = 0.08;

export default function FloatingIcons({
  showIcons = true,
}: FloatingIconsProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPastVideo, setIsPastVideo] = useState(false);
  const [isHeroOnScreen, setIsHeroOnScreen] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  // Track responsive viewport dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateDimensions, { passive: true });
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Track user scrolling past the video section
  useEffect(() => {
    let ticking = false;

    const checkScrollPosition = () => {
      const videoElement = document.querySelector('.video-section');
      if (videoElement) {
        const rect = videoElement.getBoundingClientRect();
        // On short layouts the video ends above 1200px at scroll 0, so cap the line below its resting position
        const restingBottom = rect.bottom + window.scrollY;
        const hideLine = Math.min(1200, restingBottom - 100);
        // The user has scrolled past when the bottom of the video section leaves the viewport near the top
        setIsPastVideo(rect.bottom < hideLine);
      } else {
        // Fallback if video element is not yet in DOM
        setIsPastVideo(window.scrollY > 850);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScrollPosition);
        ticking = true;
      }
    };

    // Initial check on mount
    checkScrollPosition();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Centre the orbit on the CTA and cut a soft hole behind the headline and CTA
  useEffect(() => {
    let ticking = false;

    const updateLayout = () => {
      ticking = false;
      const container = containerRef.current;
      const headline = document.querySelector('.title1');
      const cta = document.querySelector('.cta-section .btn');
      const video = document.querySelector('.video-section');
      if (!container || !headline || !cta || !video) return;

      const range = document.createRange();
      range.selectNodeContents(headline);
      const text = range.getBoundingClientRect();
      const ctaRect = cta.getBoundingClientRect();
      const videoTop = video.getBoundingClientRect().top;

      const style = container.style;
      style.setProperty('--orbit-x', `${window.innerWidth / 2}px`);
      style.setProperty('--orbit-y', `${videoTop - 48}px`);
      style.setProperty('--hole-x0', `${Math.min(text.left, ctaRect.left)}px`);
      style.setProperty('--hole-x1', `${Math.max(text.right, ctaRect.right)}px`);
      style.setProperty('--hole-y0', `${text.top}px`);
      style.setProperty('--hole-y1', `${ctaRect.bottom}px`);
    };

    const schedule = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateLayout);
      }
    };

    updateLayout();
    document.fonts?.ready.then(schedule);
    const ctaSection = document.querySelector('.cta-section');
    ctaSection?.addEventListener('animationend', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      ctaSection?.removeEventListener('animationend', schedule);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [dimensions.width]);

  // Pause the orbit while the hero and video are out of view
  useEffect(() => {
    const targets = ['.hero-section', '.video-section']
      .map((selector) => document.querySelector(selector))
      .filter((el): el is Element => el !== null);
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const onScreen = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => onScreen.set(entry.target, entry.isIntersecting));
      setIsHeroOnScreen([...onScreen.values()].some(Boolean));
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const isVisible = showIcons && !isPastVideo;
  const isPaused = !isVisible || !isHeroOnScreen;

  let tileIndex = 0;

  return (
    <div
      ref={containerRef}
      className={`floating-icons${isPaused ? ' is-paused' : ''}`}
      aria-hidden="true"
    >
      <div className="orbit-anchor">
        <motion.div
          className="orbit-stage"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={
            isVisible
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: reduceMotion ? 0 : RING_ENTRANCE, ease: [0.22, 1, 0.36, 1] },
                }
              : {
                  opacity: 0,
                  transition: { duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' },
                }
          }
        >
          {ORBITS.map(({ ring, icons }) => (
            <div key={ring} className={`orbit orbit--${ring}`}>
              <div className="orbit-ring" />
              <div className="orbit-track">
                {icons.map(({ Icon, angle }) => {
                  const delay = RING_ENTRANCE * 0.8 + tileIndex++ * TILE_STAGGER;
                  return (
                    <div
                      key={angle}
                      className="orbit-slot"
                      style={{ transform: `rotate(${angle}deg) translateX(var(--radius)) rotate(${-angle}deg)` }}
                    >
                      <div className="orbit-upright">
                        <motion.div
                          className="orbit-tile"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{
                            opacity: isVisible ? 1 : 0,
                            transition: {
                              duration: reduceMotion ? 0 : 0.5,
                              delay: isVisible && !reduceMotion ? delay : 0,
                            },
                          }}
                        >
                          <Icon />
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
