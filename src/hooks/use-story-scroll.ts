"use client";
import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";

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
// "polygon(10.443% 99.921%, 89.409% 99.921%, 90.623% 99.838%, 91.784% 99.599%, 92.886% 99.212%, 93.924% 98.689%, 94.895% 98.040%, 95.794% 97.275%, 96.615% 96.405%, 97.354% 95.440%, 98.007% 94.390%, 98.569% 93.267%, 99.035% 92.080%, 99.401% 90.839%, 99.661% 89.557%, 99.813% 88.241%, 99.849% 86.904%, 99.768% 85.556%, 99.562% 84.206%, 99.229% 82.866%, 98.762% 81.545%, 98.159% 80.255%, 58.676% 5.812%, 58.022% 4.707%, 57.298% 3.719%, 56.512% 2.848%, 55.672% 2.092%, 54.785% 1.453%, 53.860% 0.930%, 52.904% 0.523%, 51.924% 0.232%, 50.929% 0.058%, 49.926% 0.000%, 48.923% 0.058%, 47.927% 0.232%, 46.948% 0.523%, 45.991% 0.930%, 45.066% 1.453%, 44.179% 2.092%, 43.339% 2.848%, 42.553% 3.719%, 41.830% 4.707%, 41.176% 5.812%, 1.693% 80.259%, 1.089% 81.550%, 0.623% 82.870%, 0.289% 84.210%, 0.084% 85.560%, 0.002% 86.908%, 0.039% 88.245%, 0.190% 89.561%, 0.451% 90.844%, 0.817% 92.084%, 1.283% 93.271%, 1.845% 94.394%, 2.497% 95.444%, 3.237% 96.409%, 4.058% 97.279%, 4.956% 98.044%, 5.927% 98.693%, 6.966% 99.216%, 8.068% 99.603%, 9.228% 99.843%, 10.443% 99.925%)"
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

    if (
      !section ||
      !sticky ||
      !image ||
      !flipTarget ||
      !chapter ||
      !headline ||
      !card
    )
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
