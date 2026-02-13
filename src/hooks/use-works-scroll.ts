"use client";
import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseWorksScrollOptions {
  sectionRef: React.RefObject<HTMLElement | null>;
  headerRef: React.RefObject<HTMLDivElement | null>;
  descriptionRef: React.RefObject<HTMLParagraphElement | null>;
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export function useWorksScroll({
  sectionRef,
  headerRef,
  descriptionRef,
  itemRefs,
}: UseWorksScrollOptions) {
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const setup = useCallback(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const description = descriptionRef.current;
    const items = itemRefs.current;

    if (!section || !header || !description || !items) return;

    triggersRef.current.forEach((t) => t.kill());
    triggersRef.current = [];

    const headerTrigger = ScrollTrigger.create({
      trigger: header,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(
          header.querySelectorAll(".works-reveal"),
          { yPercent: 100, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          },
        );
      },
      once: true,
    });
    triggersRef.current.push(headerTrigger);

    const descTrigger = ScrollTrigger.create({
      trigger: description,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(
          description,
          { yPercent: 40, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
        );
      },
      once: true,
    });
    triggersRef.current.push(descTrigger);

    items.forEach((item, index) => {
      if (!item) return;

      gsap.set(item, { autoAlpha: 0, yPercent: 15 });

      const trigger = ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          gsap.to(item, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.9,
            delay: index * 0.1,
            ease: "power3.out",
          });
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    });
  }, [sectionRef, headerRef, descriptionRef, itemRefs]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(setup);
    });

    return () => {
      cancelAnimationFrame(raf);
      triggersRef.current.forEach((t) => t.kill());
    };
  }, [setup]);
}
