"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function IntroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!textRef.current || !containerRef.current) return

    const lines = textRef.current.querySelectorAll('.line-inner')
    
    if (lines.length > 0) {
      gsap.from(lines, {
        y: "100%",
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    }

    const label = containerRef.current.querySelector(".intro-label")
    if (label) {
      gsap.from(label, {
        x: -20,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        }
      })
    }
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="bg-black w-full py-40 px-6 md:px-20 flex justify-center text-white">
      {/* <div className="intro-label flex items-center gap-4 font-mono text-xs mb-12 uppercase tracking-widest opacity-60">
        <span>01</span>
        <span className="text-neon-yellow font-bold"> // </span>
        <span>Intro</span>
      </div> */}
      <div ref={textRef} className="max-w-5xl">
        <h2 className="text-3xl md:text-6xl font-medium tracking-tight leading-[1.1] md:leading-[1.2]">
          {[
            "Lisboa is a full stack engineer",
            "crafting innovative visuals for the",
            "world's boldest brands. Based in",
            "Sinop - MT, shattering boundaries",
            "with no excuses and no mercy."
          ].map((line, i) => (
            <div key={i} className="overflow-hidden mb-1">
              <span className="line-inner inline-block">
                {line.split(" ").map((word, j) => (
                  <span key={j} className={word === "shattering" || word === "boundaries" ? "font-black italic" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </h2>
      </div>
    </section>
  )
}