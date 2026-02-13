"use client";
import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

interface UseStoryScrollOptions {
  sectionRef: React.RefObject<HTMLElement | null>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLDivElement | null>;
  flipTargetRef: React.RefObject<HTMLDivElement | null>;
  chapterRef: React.RefObject<HTMLDivElement | null>;
  headlineRef: React.RefObject<HTMLDivElement | null>;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

const FLIP_THRESHOLD = 0.3;
const FLIP_DURATION = 2;
const PARALLELOGRAM_CLIP = "polygon(25% 0px, 100% 0px, 75% 100%, 0px 100%)";
const FULL_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

export function useStoryScroll({
  sectionRef,
  stickyRef,
  imageRef,
  flipTargetRef,
  chapterRef,
  headlineRef,
  cardRef,
}: UseStoryScrollOptions) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const flipAnimRef = useRef<gsap.core.Timeline | null>(null);
  const isFlippedRef = useRef(false);

  const flipToFullscreen = useCallback(
    (image: HTMLDivElement, flipTarget: HTMLDivElement) => {
      const state = Flip.getState(image);

      flipTarget.appendChild(image);
      image.style.position = "absolute";
      image.style.top = "0";
      image.style.left = "0";
      image.style.width = "100%";
      image.style.height = "100%";
      image.style.clipPath = FULL_CLIP;

      flipAnimRef.current = Flip.from(state, {
        duration: FLIP_DURATION,
        ease: "power2.inOut",
        absolute: true,
      });
    },
    [],
  );

  const flipToInline = useCallback(
    (image: HTMLDivElement, section: HTMLElement) => {
      const state = Flip.getState(image);

      const mediaWrapper = section.querySelector(".media-wrapper");
      if (mediaWrapper) mediaWrapper.appendChild(image);

      image.style.position = "";
      image.style.top = "";
      image.style.left = "";
      image.style.width = "";
      image.style.height = "";
      image.style.clipPath = PARALLELOGRAM_CLIP;

      flipAnimRef.current = Flip.from(state, {
        duration: FLIP_DURATION,
        ease: "power2.inOut",
        absolute: true,
      });
    },
    [],
  );

  const setup = useCallback(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const image = imageRef.current;
    const flipTarget = flipTargetRef.current;
    const chapter = chapterRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;

    if (!section || !sticky || !image || !flipTarget || !chapter || !headline || !card)
      return;

    scrollTriggerRef.current?.kill();
    flipAnimRef.current?.kill();
    isFlippedRef.current = false;

    gsap.set(card, { autoAlpha: 0, yPercent: 30 });

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.set(sticky, { y: `${progress * -15}%` });

        if (progress < 0.15) {
          gsap.set([chapter, headline], { autoAlpha: 1, yPercent: 0 });
        } else if (progress < 0.35) {
          const fade = (progress - 0.15) / 0.2;
          gsap.set([chapter, headline], {
            autoAlpha: 1 - fade,
            yPercent: fade * -20,
          });
        } else {
          gsap.set([chapter, headline], { autoAlpha: 0, yPercent: -20 });
        }

        if (progress > FLIP_THRESHOLD && !isFlippedRef.current) {
          isFlippedRef.current = true;
          flipToFullscreen(image, flipTarget);
        }

        if (progress <= FLIP_THRESHOLD && isFlippedRef.current) {
          isFlippedRef.current = false;
          flipToInline(image, section);
        }

        if (progress > 0.85) {
          const cardProgress = (progress - 0.85) / 0.15;
          gsap.set(card, {
            autoAlpha: cardProgress,
            yPercent: (1 - cardProgress) * 30,
          });
        } else {
          gsap.set(card, { autoAlpha: 0, yPercent: 30 });
        }
      },
    });
  }, [
    sectionRef,
    stickyRef,
    imageRef,
    flipTargetRef,
    chapterRef,
    headlineRef,
    cardRef,
    flipToFullscreen,
    flipToInline,
  ]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(setup);
    });

    return () => {
      cancelAnimationFrame(raf);
      scrollTriggerRef.current?.kill();
      flipAnimRef.current?.kill();
    };
  }, [setup]);

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
}
