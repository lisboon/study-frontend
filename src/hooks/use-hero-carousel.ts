"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import type { Slide } from "@/src/types/hero";

interface UseHeroCarouselOptions {
  slides: Slide[];
  duration: number;
  descriptionRef: React.RefObject<HTMLDivElement | null>;
  titleLinesRef: React.MutableRefObject<(HTMLHeadingElement | null)[]>;
  progressBarRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function useHeroCarousel({
  slides,
  duration,
  descriptionRef,
  titleLinesRef,
  progressBarRefs,
}: UseHeroCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const autoplayAnimation = useRef<gsap.core.Tween | null>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndexRef.current || isAnimating.current) return;
      isAnimating.current = true;

      if (autoplayAnimation.current) autoplayAnimation.current.kill();

      const timeline = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      // Out: gentle upward drift
      timeline.to(descriptionRef.current, {
        yPercent: -15,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      timeline.to(
        titleLinesRef.current.filter(Boolean),
        {
          yPercent: -20,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          stagger: 0.05,
        },
        0.05
      );

      // Swap active slide
      timeline.call(() => setActiveIndex(targetIndex));
      timeline.set(descriptionRef.current, { yPercent: 20, opacity: 0 });
      timeline.set(titleLinesRef.current.filter(Boolean), {
        yPercent: 30,
        opacity: 0,
      });

      // In: parallax reveal
      timeline.to(descriptionRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      });

      timeline.to(
        titleLinesRef.current.filter(Boolean),
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.5"
      );
    },
    [descriptionRef, titleLinesRef]
  );

  const startAutoplay = useCallback(() => {
    progressBarRefs.current.forEach((progressElement) => {
      if (progressElement) gsap.set(progressElement, { scaleY: 0 });
    });

    const activeProgressBar = progressBarRefs.current[activeIndexRef.current];
    if (!activeProgressBar) return;

    autoplayAnimation.current = gsap.to(activeProgressBar, {
      scaleY: 1,
      duration,
      ease: "none",
      onComplete: () => {
        const nextIndex = (activeIndexRef.current + 1) % slides.length;
        goToSlide(nextIndex);
      },
    });
  }, [goToSlide, slides.length, duration, progressBarRefs]);

  useEffect(() => {
    const autoplayTimer = setTimeout(startAutoplay, 600);
    return () => {
      clearTimeout(autoplayTimer);
      autoplayAnimation.current?.kill();
    };
  }, [activeIndex, startAutoplay]);

  return { activeIndex, goToSlide };
}
