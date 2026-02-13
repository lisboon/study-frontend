"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

    const moveMouse = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useGSAP(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isHovering) {
      gsap.to(cursor, {
        scale: 4,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
    />
  );
}
