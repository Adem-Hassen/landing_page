import React, { useState, useEffect, useRef, type HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
export interface CircularGalleryProps<T = GalleryItem> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  items: T[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not interacting. */
  autoRotateSpeed?: number;
  /** Whether to allow mouse and touch dragging to spin. */
  enableDrag?: boolean;
  /** Reverse navigation, scrolling, and item placement order (e.g. for RTL). */
  reverseDirection?: boolean;
  /** Pause auto-rotation when true (e.g. while reading an expanded card). */
  isPaused?: boolean;
  /** Custom renderer for gallery items. */
  renderItem?: (item: T, index: number, isFront: boolean) => React.ReactNode;
  /** Callback when the item facing front changes. */
  onActiveIndexChange?: (index: number) => void;
}

export interface CircularGalleryRef {
  next: () => void;
  prev: () => void;
  rotateToIndex: (index: number) => void;
}

const CircularGalleryComponent = (
  {
    items,
    className,
    radius: customRadius,
    autoRotateSpeed = 0.2,
    enableDrag = true,
    reverseDirection = false,
    isPaused = false,
    renderItem,
    onActiveIndexChange,
    ...props
  }: CircularGalleryProps<any>,
  ref: React.ForwardedRef<CircularGalleryRef>
) => {
  const [rotation, setRotation] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [calculatedRadius, setCalculatedRadius] = useState(customRadius || 850);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Drag interaction tracking
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startRotationRef = useRef(0);
    const lastActiveIndexRef = useRef(0);

    const anglePerItem = items.length > 0 ? 360 / items.length : 0;
    const angleDirection = reverseDirection ? -1 : 1;

    // Dynamically calculate appropriate radius based on screen width and item count
    useEffect(() => {
      if (customRadius) {
        setCalculatedRadius(customRadius);
        return;
      }

      const updateRadius = () => {
        const width = window.innerWidth;
        if (width < 640) {
          // Mobile: comfortable radius to space adjacent cards
          setCalculatedRadius(680);
        } else if (width < 1024) {
          // Tablet
          setCalculatedRadius(820);
        } else {
          // Desktop: scale with items
          const cardWidthWithGap = 320;
          const optimalRadius = Math.max(900, Math.min(1250, (items.length * cardWidthWithGap) / (2 * Math.PI)));
          setCalculatedRadius(optimalRadius);
        }
      };

      updateRadius();
      window.addEventListener('resize', updateRadius);
      return () => window.removeEventListener('resize', updateRadius);
    }, [customRadius, items.length]);

    // Expose imperative navigation controls (next, prev, rotateToIndex) via ref
    React.useImperativeHandle(ref, () => ({
      next: () => {
        setIsInteracting(true);
        setRotation((prev) => prev - angleDirection * anglePerItem);
        resumeAutoRotateAfterDelay();
      },
      prev: () => {
        setIsInteracting(true);
        setRotation((prev) => prev + angleDirection * anglePerItem);
        resumeAutoRotateAfterDelay();
      },
      rotateToIndex: (index: number) => {
        setIsInteracting(true);
        const baseTarget = -angleDirection * index * anglePerItem;
        // Calculate the shortest angular delta relative to current rotation to prevent multi-revolution jumps
        setRotation((currentRot) => {
          const diff = ((((baseTarget - currentRot) % 360) + 540) % 360) - 180;
          return currentRot + diff;
        });
        resumeAutoRotateAfterDelay();
      },
    }));

    const resumeAutoRotateAfterDelay = () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 2500);
    };

    // Calculate which item is currently facing front
    useEffect(() => {
      if (!items.length) return;
      // Normalizing rotation
      const normalizedRotation = reverseDirection
        ? ((rotation % 360) + 360) % 360
        : ((-rotation % 360) + 360) % 360;
      const activeIdx = Math.round(normalizedRotation / anglePerItem) % items.length;
      if (activeIdx !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = activeIdx;
        onActiveIndexChange?.(activeIdx);
      }
    }, [rotation, anglePerItem, items.length, reverseDirection, onActiveIndexChange]);

    // Auto-rotation effect
    useEffect(() => {
      if (autoRotateSpeed === 0) return;

      const autoRotate = () => {
        if (!isInteracting && !isDraggingRef.current && !isPaused) {
          setRotation((prev) => prev - angleDirection * autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed, isInteracting, isPaused, angleDirection]);

    // Drag / Touch / Mouse pointer interactions
    const pointerDownRef = useRef(false);

    const handlePointerDown = (e: React.PointerEvent) => {
      if (!enableDrag) return;
      pointerDownRef.current = true;
      isDraggingRef.current = false;
      startXRef.current = e.clientX;
      startRotationRef.current = rotation;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!pointerDownRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      
      if (!isDraggingRef.current) {
        // Drag threshold of 6px before initiating drag and capturing pointer
        if (Math.abs(deltaX) > 6) {
          isDraggingRef.current = true;
          setIsInteracting(true);
          try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          } catch {
            // Safe fallback
          }
        } else {
          return;
        }
      }

      // Scale sensitivity based on screen width
      const sensitivity = window.innerWidth < 768 ? 0.35 : 0.22;
      setRotation(startRotationRef.current + deltaX * sensitivity);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      pointerDownRef.current = false;
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
          // Pointer was already released
        }
        resumeAutoRotateAfterDelay();
      }
    };

    return (
      <div
        ref={containerRef}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          'relative w-full h-full flex items-center justify-center select-none overflow-hidden touch-pan-y',
          enableDrag && 'cursor-grab active:cursor-grabbing',
          className
        )}
        style={{ perspective: '2000px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `translateZ(-${calculatedRadius}px) rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDraggingRef.current ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = angleDirection * i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = ((itemAngle + totalRotation) % 360 + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            
            // Opacity: front facing = 1.0, adjacent cards fade smoothly
            const isFront = normalizedAngle < anglePerItem /2;
            const opacity = isFront 
              ? 1 
              : Math.max(0.08, Math.min(0.48, 1 - Math.pow(normalizedAngle / 90, 1.2)));

            // Don't render cards that are completely to the sides or back
            const isBehind = normalizedAngle > 85;

            return (
              <div
                key={i}
                role="group"
                aria-label={`Module ${i + 1}`}
                className={cn(
                  'absolute w-[270px] h-[390px] max-md:w-[220px] max-md:h-[340px]',
                  isBehind ? 'pointer-events-none' : 'pointer-events-auto'
                )}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${calculatedRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: 'var(--card-half-width, -135px)',
                  marginTop: 'var(--card-half-height, -195px)',
                  opacity: isBehind ? 0.05 : opacity,
                  backfaceVisibility: 'hidden',
                  transition: isDraggingRef.current ? 'opacity 0.15s ease' : 'opacity 0.4s ease',
                }}
              >
                {renderItem ? (
                  renderItem(item, i, isFront)
                ) : (
                  // Default photo card fallback matching original component spec
                  <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg">
                    {'photo' in (item as any) && (
                      <img
                        src={(item as any).photo.url}
                        alt={(item as any).photo.text}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: (item as any).photo.pos || 'center' }}
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                      <h2 className="font-heading text-[length:var(--text-h2)] font-bold leading-[var(--leading-h2)] tracking-normal">{(item as any).common || ''}</h2>
                      <em className="font-body text-[length:var(--text-small)] not-italic font-medium leading-[var(--leading-small)] tracking-normal opacity-80">{(item as any).binomial || ''}</em>
                      <p className="font-body text-[length:var(--text-body)] font-normal leading-[var(--leading-body)] tracking-normal mt-2 opacity-70">
                        Photo by: {(item as any).photo?.by || ''}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

export const CircularGallery = React.forwardRef(CircularGalleryComponent);
CircularGallery.displayName = 'CircularGallery';

export default CircularGallery;
