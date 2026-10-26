"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface TimelineItem {
  title: string;
  description: ReactNode;
  date: string;
  image?: string;
  /** Used when `image` fails to load (e.g. a local file that has not been added yet). */
  fallbackImage?: string;
  imageAlt?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

function TimelineImage({ item }: { item: TimelineItem }) {
  const [src, setSrc] = useState(item.image ?? item.fallbackImage);
  if (!src) return null;

  return (
    <img
      src={src}
      alt={src === item.image ? item.imageAlt ?? "" : ""}
      loading="lazy"
      onError={() => {
        if (item.fallbackImage && src !== item.fallbackImage) setSrc(item.fallbackImage);
      }}
      className="mt-6 aspect-[4/3] w-full max-w-[560px] rounded-xl border border-white/10 object-cover shadow-[0_24px_48px_-24px_rgba(2,6,23,0.9),0_18px_40px_-22px_rgba(30,78,216,0.5)]"
    />
  );
}

const Timeline = ({ items, className }: TimelineProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <ol className={cn("relative m-0 list-none p-0", className)}>
      {items.map((item, index) => (
        <li
          key={`${item.date}-${index}`}
          className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]"
        >
          {/* Date column: sticky on md+ so it stays beside its entry */}
          <div className="px-6 pt-8 md:border-e md:border-white/10 md:px-8 md:py-12 lg:px-10">
            <div className="md:sticky md:top-28">
              <span className="inline-flex items-center rounded-full border border-[#1E4ED8]/50 bg-[#1E4ED8]/10 px-3 py-1 text-sm font-semibold tabular-nums text-[#93b4ff]">
                {item.date}
              </span>
            </div>
          </div>

          <motion.article
            className="relative min-w-0 px-6 pb-10 pt-5 md:px-10 md:py-12 lg:px-14"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Marker on the column divider */}
            <span
              aria-hidden="true"
              className="absolute -start-[6px] top-[3.6rem] hidden size-3 rounded-full bg-[#1E4ED8] shadow-[0_0_0_4px_#0a1020,0_0_14px_rgba(59,130,246,0.8)] md:block"
            />
            <h3 className="m-0 text-slate-50">{item.title}</h3>
            <div className="mt-3 max-w-[60ch] text-slate-300">{item.description}</div>
            <TimelineImage item={item} />
          </motion.article>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
