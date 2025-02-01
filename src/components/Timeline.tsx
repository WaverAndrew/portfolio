"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  images?: Array<{
    url: string;
    size: "small" | "medium" | "large";
  }>;
}

export default function Timeline({
  items,
}: {
  items: {
    date: string;
    title: string;
    description: string;
    images?: Array<{
      url: string;
      size: "small" | "medium" | "large";
    }>;
  }[];
}) {
  const timelineData: TimelineEntry[] = items.map((item) => ({
    title: item.date,
    content: (
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 mb-4">
        {item.images && item.images.length > 0 && (
          <div
            className={`grid gap-4 mb-4 ${
              item.images.length === 1
                ? "grid-cols-1 max-w-[240px] mx-auto"
                : "grid-cols-3"
            }`}
          >
            {item.images.slice(0, 3).map((image, idx) => (
              <div
                key={idx}
                className={`relative h-[120px] rounded-lg overflow-hidden ${
                  image.size === "small"
                    ? "w-[120px]"
                    : image.size === "large"
                    ? "w-[240px]"
                    : "w-[160px]" // medium (default)
                } mx-auto`}
              >
                <Image
                  src={image.url}
                  alt={`${item.title} - image ${idx + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 240px) 100vw, 240px"
                  priority={idx === 0}
                  onError={(e: any) => {
                    console.error(`Failed to load image: ${image.url}`);
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </div>
            ))}
          </div>
        )}
        <h3 className="font-medium mb-2 text-lg">{item.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    ),
  }));

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Add scroll progress tracking
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.floor(latest * items.length);
    setActiveIndex(newIndex);
  });

  return (
    <div className="w-full font-sans md:px-10 relative" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 flex items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full transition-all duration-500 ${
                    scrollYProgress.get() * items.length > index
                      ? "bg-gradient-to-b from-blue-800 to-purple-600 shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-125"
                      : "bg-neutral-200"
                  } p-2`}
                />
              </div>
              <h3
                className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold ${
                  activeIndex === index
                    ? "text-black transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                    : "text-neutral-500"
                }`}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className={`md:hidden block text-2xl mb-4 text-left font-bold ${
                  activeIndex === index
                    ? "text-black transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                    : "text-neutral-500"
                }`}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Timeline line with beam */}
        <div className="absolute left-7 md:left-8 top-0 bottom-0 w-0.5">
          {/* Background line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-200 to-transparent" />

          {/* Animated beam */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-800 to-blue-400 shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] origin-top"
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
          />
        </div>
      </div>
    </div>
  );
}
