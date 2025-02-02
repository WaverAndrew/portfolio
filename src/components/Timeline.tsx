"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

function ImageModal({
  imageUrl,
  onClose,
}: {
  imageUrl: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl h-[80vh]">
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -top-4 -right-4 z-50 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <Image
          src={imageUrl}
          alt="Enlarged view"
          fill
          className="object-contain"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
      </div>
    </div>
  );
}

interface TimelineEntry {
  year: string;
  cards: Array<{
    title: string;
    content: React.ReactNode;
    images?: Array<{
      url: string;
      size: "small" | "medium" | "large";
    }>;
    achievements?: Array<{
      value: string;
      label: string;
    }>;
  }>;
}

export default function Timeline({
  items,
}: {
  items: {
    date: string;
    title: string;
    description: string;
    achievements?: Array<{
      value: string;
      label: string;
    }>;
    images?: Array<{
      url: string;
      size: "small" | "medium" | "large";
    }>;
  }[];
}) {
  // Group items by year, handling date ranges
  const groupedItems = items.reduce(
    (acc: { [key: string]: typeof items }, item) => {
      const dates = item.date.split(" - ");
      const startYear = dates[0].split(" ")[0]; // Get first year
      const displayYear =
        dates.length > 1 ? `${startYear} - ${dates[1]}` : startYear;

      if (!acc[displayYear]) {
        acc[displayYear] = [];
      }
      acc[displayYear].push(item);
      return acc;
    },
    {}
  );

  const timelineData: TimelineEntry[] = Object.entries(groupedItems)
    .sort(([yearA], [yearB]) => {
      // Extract first year for sorting (handles both single years and ranges)
      const getFirstYear = (year: string) => parseInt(year.split(" - ")[0]);
      return getFirstYear(yearB) - getFirstYear(yearA);
    })
    .map(([year, yearItems]) => ({
      year,
      cards: yearItems.map((item) => ({
        title: item.title,
        content: (
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100/10 mb-4 hover:shadow-xl transition-all duration-300">
            {item.images && item.images.length > 0 && (
              <div
                className={`grid gap-6 mb-6 ${
                  item.images.length === 1
                    ? "grid-cols-1 max-w-[240px] mx-auto"
                    : "grid-cols-3"
                }`}
              >
                {item.images.slice(0, 3).map((image, idx) => (
                  <div
                    key={idx}
                    className={`relative h-[120px] rounded-2xl overflow-hidden ${
                      image.size === "small"
                        ? "w-[120px]"
                        : image.size === "large"
                        ? "w-[240px]"
                        : "w-[160px]"
                    } mx-auto hover:scale-[1.02] transition-transform duration-200 cursor-pointer`}
                    onClick={() => setSelectedImage(image.url)}
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
            <h3 className="font-medium mb-2 text-lg text-gray-800">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {item.description}
            </p>

            {item.achievements && (
              <div className="border-t border-gray-100/20 pt-4 mt-4">
                <div className="flex flex-wrap gap-3">
                  {item.achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-gray-50/50 px-3 py-1.5 rounded-full"
                    >
                      <span className="text-sm font-semibold text-gray-800">
                        {achievement.value}
                      </span>
                      <span className="text-xs text-gray-500">
                        {achievement.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ),
        achievements: item.achievements,
        images: item.images,
      })),
    }));

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    const newIndex = Math.floor(latest * timelineData.length);
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
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                  <div
                    className={`h-4 w-4 rounded-full transition-all duration-500 ${
                      scrollYProgress.get() * timelineData.length > index
                        ? "bg-gradient-to-b from-blue-800 to-purple-600 shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-125"
                        : "bg-neutral-200 border border-neutral-300"
                    } p-2`}
                  />
                </div>
              </div>
              <h3
                className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold ${
                  activeIndex === index
                    ? "text-black transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                    : "text-neutral-500"
                }`}
              >
                {item.year}
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
                {item.year}
              </h3>
              {item.cards.map((card, cardIndex) => (
                <div key={cardIndex}>{card.content}</div>
              ))}
            </div>
          </div>
        ))}

        {/* Timeline line with beam */}
        <div className="absolute left-8 md:left-8 top-0 bottom-0 w-0.5">
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

        {/* Add ImageModal */}
        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </div>
  );
}
