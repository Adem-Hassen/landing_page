import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillTrendUp,
  faChartLine,
  faGlobe,
  faLaptop,
  faDollarSign,
  faShippingFast,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/FloatingIcons.css';

interface FloatingIconsProps {
  showIcons?: boolean;
  isScrolling?: boolean;
}

interface IconConfig {
  id: number;
  icon: typeof faMoneyBillTrendUp;
  getCenterOffset: (width: number, height: number) => { x: number; y: number };
  initialRotation: number;
  exitRotation: number;
  floatDuration: number;
  floatY: number[];
  floatX: number[];
  floatRotate: number[];
  floatDelay: number;
}

const ICONS_CONFIG: IconConfig[] = [
  {
    id: 1,
    icon: faMoneyBillTrendUp,
    // Top-left: top 15%, left 10% (mobile left 3%)
    getCenterOffset: (w, h) => ({
      x: (w <= 768 ? 0.47 : 0.40) * w,
      y: 0.35 * h,
    }),
    initialRotation: -180,
    exitRotation: 180,
    floatDuration: 5.4,
    floatY: [-8, 9],
    floatX: [-5, 6],
    floatRotate: [-3, 3],
    floatDelay: 0,
  },
  {
    id: 2,
    icon: faChartLine,
    // Top-right: top 15%, right 10% (mobile right 5%)
    getCenterOffset: (w, h) => ({
      x: (w <= 768 ? -0.45 : -0.40) * w,
      y: 0.35 * h,
    }),
    initialRotation: 180,
    exitRotation: -180,
    floatDuration: 6.2,
    floatY: [8, -9],
    floatX: [6, -4],
    floatRotate: [3, -4],
    floatDelay: 0.5,
  },
  {
    id: 3,
    icon: faGlobe,
    // Bottom-left: top 55%, left 15% (mobile left 2%)
    getCenterOffset: (w, h) => ({
      x: (w <= 768 ? 0.48 : 0.35) * w,
      y: -0.05 * h,
    }),
    initialRotation: -150,
    exitRotation: 150,
    floatDuration: 5.8,
    floatY: [-9, 8],
    floatX: [4, -6],
    floatRotate: [-4, 3],
    floatDelay: 1.0,
  },
  {
    id: 4,
    icon: faLaptop,
    // Bottom-right: top 55%, right 15% (mobile right 3%)
    getCenterOffset: (w, h) => ({
      x: (w <= 768 ? -0.47 : -0.35) * w,
      y: -0.05 * h,
    }),
    initialRotation: 160,
    exitRotation: -160,
    floatDuration: 6.6,
    floatY: [7, -9],
    floatX: [-5, 5],
    floatRotate: [3, -3],
    floatDelay: 1.5,
  },
  {
    id: 5,
    icon: faDollarSign,
    // Middle-left: top 38%, left 5% (mobile left 8%)
    getCenterOffset: (w, h) => ({
      x: (w <= 768 ? 0.42 : 0.45) * w,
      y: 0.12 * h,
    }),
    initialRotation: -200,
    exitRotation: 200,
    floatDuration: 4.9,
    floatY: [-7, 8],
    floatX: [-4, 6],
    floatRotate: [-4, 4],
    floatDelay: 0.8,
  },
  {
    id: 6,
    icon: faShippingFast,
    // Middle-right: top 38%, right 5% (mobile right 10%)
    getCenterOffset: (w, h) => ({
      x: (w <= 768 ? -0.40 : -0.45) * w,
      y: 0.12 * h,
    }),
    initialRotation: 190,
    exitRotation: -190,
    floatDuration: 6.0,
    floatY: [9, -7],
    floatX: [5, -4],
    floatRotate: [4, -3],
    floatDelay: 1.2,
  },
];

export default function FloatingIcons({
  showIcons = true,
}: FloatingIconsProps) {
  const [isPastVideo, setIsPastVideo] = useState(false);
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
        // The user has scrolled past when the bottom of the video section leaves the viewport near the top
        setIsPastVideo(rect.bottom < 1200);
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

  const isVisible = showIcons && !isPastVideo;

  return (
    <div className="floating-icons">
      {ICONS_CONFIG.map((item, index) => {
        const offset = item.getCenterOffset(dimensions.width, dimensions.height);

        return (
          <motion.div
            key={item.id}
            className={`icon icon-${item.id}`}
            initial={{
              x: offset.x,
              y: offset.y,
              scale: 0,
              opacity: 0,
              rotate: item.initialRotation,
            }}
            animate={
              isVisible
                ? {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    transition: {
                      duration: 1.25,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.15 + index * 0.08,
                    },
                  }
                : {
                    x: offset.x,
                    y: offset.y,
                    scale: 0,
                    opacity: 0,
                    rotate: item.exitRotation,
                    transition: {
                      duration: 0.85,
                      ease: [0.4, 0, 0.2, 1],
                      delay: index * 0.04,
                    },
                  }
            }
          >
            <motion.div
              className="icon-float-wrapper"
              animate={
                isVisible
                  ? {
                      y: item.floatY,
                      x: item.floatX,
                      rotate: item.floatRotate,
                    }
                  : { y: 0, x: 0, rotate: 0 }
              }
              transition={{
                duration: item.floatDuration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: item.floatDelay,
              }}
            >
              <div className="icon-inner">
                <FontAwesomeIcon icon={item.icon} />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
