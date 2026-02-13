"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/src/components/ui/button";
import LogoLight from "@/public/images/logo-apollo-horizontal-red.svg";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ScaleUpdateEvent extends CustomEvent {
  detail: {
    scale: number;
  };
}

declare global {
  interface Window {
    heroScaleEvent?: EventTarget;
  }
}

const ShuffleText = () => {
  const words = ["Limits", "Excuses", "Bullshit", "Ego", "Laziness", "Fluff"];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(containerRef.current, {
        y: -(words.length * 40),
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <div className="flex items-center text-4xl md:text-6xl font-black tracking-tighter uppercase">
      <span>No-</span>
      <div className="h-11.25 overflow-hidden leading-none border-b-4 border-neon-yellow">
        <div ref={containerRef} className="flex flex-col">
          {words.map((word, i) => (
            <div key={i} className="h-11.25">
              {word}
            </div>
          ))}
          <div className="h-11.25">{words[0]}</div>
        </div>
      </div>
    </div>
  );
};

if (typeof window !== "undefined") {
  window.heroScaleEvent = new EventTarget();
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoWhite, setIsLogoWhite] = useState(false);

  useGSAP(() => {
    if (typeof window !== "undefined" && window.heroScaleEvent) {
      const handleScaleChange = (e: Event) => {
        const customEvent = e as ScaleUpdateEvent;
        setIsLogoWhite(customEvent.detail.scale > 1.1);
      };

      window.heroScaleEvent.addEventListener("scaleUpdate", handleScaleChange);

      return () => {
        window.heroScaleEvent?.removeEventListener(
          "scaleUpdate",
          handleScaleChange,
        );
      };
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 z-100 flex w-full items-center justify-between px-6 py-8 md:px-12">
        <div
          className={cn(
            "text-2xl font-bold tracking-tighter transition-colors duration-300",
            isLogoWhite ? "text-white" : "text-black",
          )}
        >
          <Link href="/">
            <Image src={LogoLight} alt="Logo" width={200} />
          </Link>
        </div>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group flex items-center gap-4 text-sm uppercase tracking-widest bg-transparent hover:bg-transparent",
            isOpen ? "text-black" : "text-white",
          )}
        >
          <span className="hidden md:block">{isOpen ? "Fechar" : "Menu"}</span>
          <div className="relative h-4 w-8 overflow-hidden">
            <span
              className={cn(
                "absolute top-0 left-0 h-0.5 w-full transition-all duration-500",
                isOpen ? "top-2 bg-black rotate-45" : "bg-white",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-full transition-all duration-500",
                isOpen ? "bottom-2 -rotate-45 bg-black" : "bg-white",
              )}
            />
          </div>
        </Button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-90 grid h-screen w-full bg-white p-6 md:grid-cols-2 md:p-12"
          >
            <div className="flex flex-col justify-center text-black border-[#898989] md:border-r">
              <ShuffleText />
              <p className="mt-8 max-w-sm text-black justify-end flex text-lg">
                Full Stack Developer de Mato Grosso, criando experiências
                digitais que desafiam o comum.
              </p>
            </div>

            <nav className="flex flex-col justify-center gap-4 md:pl-20">
              {["Home", "About", "Work", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  className="group relative overflow-hidden py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black transition-colors duration-500">
                    {item}
                  </span>
                  <div className="h-1 w-0 transition-all duration-500 group-hover:w-full" />
                </motion.a>
              ))}

              <div className="mt-12 flex gap-6 text-sm uppercase tracking-widest text-black">
                <a href="#" className="hover:text-black">
                  Instagram
                </a>
                <a href="#" className="hover:text-black">
                  Github
                </a>
                <a href="#" className="hover:text-black">
                  LinkedIn
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
