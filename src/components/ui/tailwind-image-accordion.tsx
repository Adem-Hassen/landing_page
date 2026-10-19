"use client";
import React from "react";

// For Vite/React compatibility, Image can be a standard img wrapper with Next.js props
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

const Image = ({ src, alt, className, ...props }: ImageProps) => (
  <img src={src} alt={alt} className={className} loading="lazy" {...props} />
);

const items = [
  {
    id: "1",
    url: "/teachers/mohamed-aziz.jpg",
    title: "Adrian Paul",
    description: "COO & Co-Founder",
    tags: ["Floral", "Highlands", "Wildflowers", "Colorful", "Resilience"],
  },
  {
    id: "2",
    url: "/teachers/rayan-bensalem.jpg",
    title: "Flualy Cual",
    description: "Founder & CEO",
    tags: ["Twilight", "Peaks", "Silhouette", "Evening Sky", "Peaceful"],
  },
  {
    id: "3",
    url: "/teachers/youssef-mejri.jpg",
    title: "Naymur Rahman",
    description: "CTO & Co-Founder",
    tags: ["Rocky", "Ridges", "Contrast", "Adventure", "Clouds"],
  },
];

export function TailwindImageAccordion() {
  return (
    <>
      <div className="group flex max-md:flex-col justify-center gap-2 w-[80%] mx-auto mb-10 mt-3">
        {items.map((item) => {
          return (
            <article
              key={item?.id ?? item?.title}
              className="group/article relative w-full rounded-xl overflow-hidden md:not-[&:hover]:group-hover:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/70 before:to-transparent before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:not-[&:hover]:group-hover:after:opacity-100 md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-100 after:absolute after:inset-0 after:bg-white/10 after:backdrop-blur-[2px] after:rounded-lg after:transition-all focus-within:ring-2 focus-within:ring-indigo-300"
            >
              <div
                className="absolute inset-0 text-white z-10 p-4 flex flex-col justify-end"
              >
                <h3 className="text-xl font-medium md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-200 group-focus-within/article:delay-200">
                  {item?.title}
                </h3>
                <span className="text-2xl font-medium md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300 text-blue-200">
                  {item?.description}
                </span>
              </div>
              <Image
                className="object-cover h-72 md:h-[420px] w-full"
                src={item?.url}
                width="960"
                height="480"
                alt={item?.title}
              />
            </article>
          );
        })}
      </div>
    </>
  );
}

export default TailwindImageAccordion;
