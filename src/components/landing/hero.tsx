"use client";
import { useRef } from "react";
import Image from "next/image";
import { slides, SLIDE_DURATION } from "@/src/lib/hero-slides";
import { useHeroCarousel } from "@/src/hooks/use-hero-carousel";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const titleLinesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { activeIndex, goToSlide } = useHeroCarousel({
    slides,
    duration: SLIDE_DURATION,
    descriptionRef,
    titleLinesRef,
    progressBarRefs,
  });

  const currentSlide = slides[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {slides.map((slideData, index) => (
        <div
          key={slideData.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            className={`size-full object-cover transition-transform duration-6000 ease-out ${
              index === activeIndex ? "scale-105" : "scale-100"
            }`}
            src={slideData.image}
            alt={slideData.title.join(" ")}
            width={1920}
            height={1080}
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/40 z-1" />

      <div className="relative z-10 flex flex-col items-center justify-end w-full h-full px-[2%] pb-10 gap-8 md:gap-4 text-white">
        <div ref={descriptionRef}>
          <p className="font-alphabet w-full max-w-102.75 text-[13px] leading-[1.6] text-center max-md:px-7 max-md:pb-14">
            {currentSlide.description}
          </p>
        </div>

        <div className="relative flex items-end justify-center w-full">
          <div className="absolute left-0 bottom-0 flex gap-0 mb-[1vw] desktop-only">
            {slides.map((slideData, index) => (
              <button
                key={slideData.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`relative size-9.5 flex items-center justify-center border border-white/10 overflow-hidden transition-colors duration-300 ${
                  index === activeIndex
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
                aria-label={`Slide ${index + 1}`}
              >
                <div
                  ref={(element) => {
                    progressBarRefs.current[index] = element;
                  }}
                  className="absolute inset-0 bg-white/15 origin-bottom will-change-transform"
                  style={{ transform: "scaleY(0)" }}
                />
                <span className="relative z-10 text-[10px] tracking-tight font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <div className="font-termina uppercase text-center tracking-[0.25%] leading-none text-[7.8vw]">
            {currentSlide.title.map((line, index) => (
              <h1
                key={`${activeIndex}-${index}`}
                ref={(element) => {
                  titleLinesRef.current[index] = element;
                }}
              >
                {line}
              </h1>
            ))}
          </div>
        </div>

        <p className="uppercase font-alphabet text-[11px] lg:text-[14px] text-center items-center">
          Copyright 2026 Lisboon. All rights reserved.
        </p>
      </div>
    </section>
  );
}
