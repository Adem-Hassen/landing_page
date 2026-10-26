import '../../styles/ProblemsSection.css';
import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const DESKTOP_QUERY = '(min-width: 1024px)';
const EASE = [0.16, 1, 0.3, 1] as const;

// Cluster box proportions (width / height). Image boxes below are % of this box.
const CLUSTER_RATIO = '100 / 84';

type Side = 'left' | 'right';

/*
 * aspect: crop shape of the image in the cluster.
 * focus:  object-position, keeps the subject in frame when cropping.
 * box:    left and width in % of the cluster width, top in % of its height (physical, not RTL-mirrored).
 * side:   which side of the cluster the callout sits on; the anchor dot goes on that edge of the image.
 */
const questions: {
  image: string;
  imageSrcSet: string;
  alt: string;
  title: string;
  description: string;
  aspect: string;
  focus: string;
  box: { left: number; top: number; width: number };
  side: Side;
}[] = [
  {
    image: '/problems/problem-information-overload-1024.webp',
    imageSrcSet: '/problems/problem-information-overload-512.webp 512w, /problems/problem-information-overload-1024.webp 1024w',
    alt: 'شاب حاير قدّام برشا فيديوهات ومعلومات',
    title: 'معادش عارف منين تتعلم',
    description: 'فما برشا معلومات و إنتي حاير منين و كفاش تبدا',
    aspect: '4 / 5',
    focus: '47% 50%',
    box: { left: 49, top: 0, width: 40 },
    side: 'right',
  },
  {
    image: '/problems/problem-trust-advice-1024.webp',
    imageSrcSet: '/problems/problem-trust-advice-512.webp 512w, /problems/problem-trust-advice-1024.webp 1024w',
    alt: 'شاب يثبّت بالمكبّرة في صناع المحتوى',
    title: 'هل الناس إلي تعطي في المعلومة، يعرفوا فاش قاعدين يعملوا و نجحوا بالحق ؟',
    description: 'توا برشا صناع محتوى تعطي في معلومات على كيفاش تعمل فلوس، أما لازم تعرف تختار الشخص المناسب !',
    aspect: '1 / 1',
    focus: '22% 50%',
    box: { left: 51, top: 57, width: 34 },
    side: 'right',
  },
  {
    image: '/problems/problem-self-doubt-1024.webp',
    imageSrcSet: '/problems/problem-self-doubt-512.webp 512w, /problems/problem-self-doubt-1024.webp 1024w',
    alt: 'شاب يخمّم إذا ينجم ينجح في التجارة الإلكترونية',
    title: 'هل نجم ننجح انا زادة ؟',
    description: 'بالك صعيبة ولا منجمش روحي ولا لزمني راس مال كبير ولا برش وقت !؟!',
    aspect: '3 / 4',
    focus: '38% 50%',
    box: { left: 6, top: 10, width: 50 },
    side: 'left',
  },
];

// Front-to-back: the largest image (last) sits at the back.
const STACK = [3, 4, 1];

// Desktop grid placement, derived from `side`: RTL column 1 is on the right.
const placement = questions.map((q, i) => {
  const sameSide = questions.filter((o) => o.side === q.side);
  const order = questions.slice(0, i).filter((o) => o.side === q.side).length;
  return {
    col: q.side === 'right' ? 1 : 3,
    row: sameSide.length === 1 ? '1 / span 2' : String(order + 1),
  };
});

// Reveal timeline (seconds)
const IMAGE_STAGGER = 0.12;
const IMAGE_DURATION = 0.5;
const LINE_START = IMAGE_STAGGER * (questions.length - 1) + IMAGE_DURATION;
const LINE_STAGGER = 0.15;
const LINE_DURATION = 0.6;
const HOVER = { duration: 0.25, ease: 'easeOut' } as const;

function subscribeToDesktop(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

const getIsDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;
const canHover = () => window.matchMedia('(hover: hover)').matches;

/** Dot → callout: horizontal run, soft elbow, vertical run in the gap, horizontal lead-in to the title. */
function connectorPath(x1: number, y1: number, x2: number, y2: number, elbowX: number) {
  const dy = y2 - y1;
  if (Math.abs(dy) < 1) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const dir = Math.sign(x2 - x1) || 1;
  const sy = Math.sign(dy);
  const r = Math.max(0, Math.min(14, Math.abs(dy) / 2, Math.abs(elbowX - x1), Math.abs(x2 - elbowX)));
  return [
    `M ${x1} ${y1}`,
    `H ${elbowX - dir * r}`,
    `Q ${elbowX} ${y1} ${elbowX} ${y1 + sy * r}`,
    `V ${y2 - sy * r}`,
    `Q ${elbowX} ${y2} ${elbowX + dir * r} ${y2}`,
    `H ${x2}`,
  ].join(' ');
}

/** Horizontal extent and vertical centre of the first rendered line of an element's text. */
function firstLineBox(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = [...range.getClientRects()].filter((r) => r.width > 0);
  if (!rects.length) return el.getBoundingClientRect();
  const top = Math.min(...rects.map((r) => r.top));
  const line = rects.filter((r) => r.top - top < 4);
  const left = Math.min(...line.map((r) => r.left));
  const right = Math.max(...line.map((r) => r.right));
  const bottom = Math.max(...line.map((r) => r.bottom));
  return { left, right, top, bottom };
}

export default function ProblemsSection() {
  const isDesktop = useSyncExternalStore(subscribeToDesktop, getIsDesktop);
  const reduceMotion = useReducedMotion() ?? false;

  const layoutRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const inView = useInView(layoutRef, { once: true, amount: 0.3 });
  const revealed = reduceMotion || inView;

  const [paths, setPaths] = useState<string[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<number | null>(null);

  const measure = useCallback(() => {
    const layout = layoutRef.current;
    const cluster = clusterRef.current;
    if (!layout || !cluster || !getIsDesktop()) return;

    // Offsets ignore transforms, so the reveal and hover scale never shift the anchors.
    const l = layout.getBoundingClientRect();
    const clusterLeft = cluster.offsetLeft;
    const clusterRight = clusterLeft + cluster.offsetWidth;
    setBox({ w: layout.offsetWidth, h: layout.offsetHeight });
    setPaths(
      questions.map((q, i) => {
        const img = imageRefs.current[i];
        const title = titleRefs.current[i];
        if (!img || !title) return '';
        const toRight = q.side === 'right';
        const x1 = clusterLeft + img.offsetLeft + (toRight ? img.offsetWidth : 0);
        const y1 = cluster.offsetTop + img.offsetTop + img.offsetHeight / 2;
        const line = firstLineBox(title);
        const x2 = (toRight ? line.left - 12 : line.right + 12) - l.left;
        const y2 = (line.top + line.bottom) / 2 - l.top;
        const start = toRight ? Math.max(x1, clusterRight) : Math.min(x1, clusterLeft);
        return connectorPath(x1, y1, x2, y2, (start + x2) / 2);
      })
    );
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) return;
    measure();
    const layout = layoutRef.current;
    const observer = new ResizeObserver(measure);
    if (layout) observer.observe(layout);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop, measure]);

  const swipeRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const onSwipeScroll = () => {
    const el = swipeRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    // RTL scrollLeft is negative in Chromium/Firefox and positive in old WebKit.
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
    setSlide(Math.min(questions.length - 1, Math.round(Math.abs(el.scrollLeft) / step)));
  };

  const hoverOn = (index: number) => {
    if (canHover()) setActive(index);
  };
  const hoverOff = () => setActive(null);

  const lineStart = (i: number) => LINE_START + i * LINE_STAGGER;
  // A callout appears as its line arrives.
  const calloutDelay = (i: number) => lineStart(i) + LINE_DURATION * 0.75;
  const dimmed = (i: number) => active !== null && active !== i;

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

        {!isDesktop && (
          <>
            <div className="pswipe" ref={swipeRef} onScroll={onSwipeScroll}>
              {questions.map((q, i) => (
                <motion.article
                  key={q.image}
                  className="pswipe__card"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * IMAGE_STAGGER }}
                >
                  <img
                    src={q.image}
                    srcSet={q.imageSrcSet}
                    sizes="min(380px, 90vw)"
                    alt={q.alt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="pswipe__img"
                  />
                  <div className="pswipe__body">
                    <h4 className="pcallout__title">{q.title}</h4>
                    <p className="pcallout__text">{q.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="pswipe__dots" aria-hidden="true">
              {questions.map((q, i) => (
                <span key={q.image} className={`pswipe__dot${i === slide ? ' is-active' : ''}`} />
              ))}
            </div>
          </>
        )}

        {isDesktop && (
          <div ref={layoutRef} className={`pcluster-layout${reduceMotion ? ' is-static' : ''}`}>
            <div ref={clusterRef} className="pcluster" style={{ aspectRatio: CLUSTER_RATIO }}>
              {questions.map((q, i) => (
                <motion.div
                  key={q.image}
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                  className={`pcluster__item pcluster__item--${q.side}${active === i ? ' is-active' : ''}`}
                  style={
                    {
                      left: `${q.box.left}%`,
                      top: `${q.box.top}%`,
                      width: `${q.box.width}%`,
                      aspectRatio: q.aspect,
                      zIndex: active === i ? 10 : STACK[i],
                    } as CSSProperties
                  }
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={revealed ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: IMAGE_DURATION, ease: EASE, delay: i * IMAGE_STAGGER }}
                  onMouseEnter={() => hoverOn(i)}
                  onMouseLeave={hoverOff}
                >
                  <motion.div
                    className="pcluster__frame"
                    animate={{ scale: active === i ? 1.03 : 1, opacity: dimmed(i) ? 0.55 : 1 }}
                    transition={reduceMotion ? { duration: 0 } : HOVER}
                  >
                    <img
                      src={q.image}
                      srcSet={q.imageSrcSet}
                      sizes="460px"
                      alt={q.alt}
                      width={1024}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className="pcluster__img"
                      style={{ objectPosition: q.focus }}
                    />
                  </motion.div>
                  <span className="pcluster__dot" aria-hidden="true" />
                </motion.div>
              ))}
            </div>

            {isDesktop && box.w > 0 && (
              <svg
                className="pcluster-lines"
                width={box.w}
                height={box.h}
                viewBox={`0 0 ${box.w} ${box.h}`}
                aria-hidden="true"
                focusable="false"
              >
                {paths.map((d, i) =>
                  d ? (
                    <motion.path
                      key={i}
                      d={d}
                      className={`pcluster-line${active === i ? ' is-active' : ''}`}
                      initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                      animate={revealed ? { pathLength: 1, opacity: dimmed(i) ? 0.55 : 1 } : undefined}
                      transition={{
                        pathLength: { duration: LINE_DURATION, ease: 'easeInOut', delay: lineStart(i) },
                        opacity: revealed && active !== null ? HOVER : { duration: 0.01, delay: lineStart(i) },
                      }}
                    />
                  ) : null
                )}
              </svg>
            )}

            {questions.map((q, i) => (
              <motion.article
                key={q.image}
                className={`pcallout pcallout--${q.side}${active === i ? ' is-active' : ''}`}
                style={{ '--col': placement[i].col, '--row': placement[i].row } as CSSProperties}
                tabIndex={0}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={revealed ? { opacity: 1 } : undefined}
                transition={{ duration: 0.4, ease: EASE, delay: calloutDelay(i) }}
                onMouseEnter={() => hoverOn(i)}
                onMouseLeave={hoverOff}
                onFocus={() => setActive(i)}
                onBlur={hoverOff}
              >
                <motion.div
                  className="pcallout__inner"
                  animate={{ opacity: dimmed(i) ? 0.55 : 1 }}
                  transition={reduceMotion ? { duration: 0 } : HOVER}
                >
                  <div className="pcallout__body">
                    <h4
                      className="pcallout__title"
                      ref={(el) => {
                        titleRefs.current[i] = el;
                      }}
                    >
                      {q.title}
                    </h4>
                    <p className="pcallout__text">{q.description}</p>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
