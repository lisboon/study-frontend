"use client";
import { useRef, useCallback } from "react";
import Link from "next/link";
import { worksData } from "@/src/lib/works-data";
import { useWorksScroll } from "@/src/hooks/use-works-scroll";

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useWorksScroll({ sectionRef, headerRef, descriptionRef, itemRefs });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = e.currentTarget.querySelector("video");
      video?.play();
    },
    [],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = e.currentTarget.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] px-[4%] py-24 text-white lg:py-32"
    >
      <div ref={headerRef} className="mb-12 flex flex-col gap-8 lg:mb-16">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden">
              <h2 className="works-reveal inline-flex gap-2 font-mono text-sm uppercase">
                <span>[{worksData.chapterIndex}]</span>
                <span>{worksData.chapter}</span>
              </h2>
            </div>

            <div className="overflow-hidden">
              <h3 className="works-reveal font-termina text-[7.8vw] uppercase leading-none tracking-[0.25%]">
                {worksData.title.join(" ")}
              </h3>
            </div>
          </div>

          <div className="hidden items-center gap-4 self-end lg:flex">
            <div className="works-cross">
              <span /><span />
            </div>
            <Link
              href={worksData.cta.href}
              className="works-explore-btn group flex items-center gap-2 font-mono text-sm uppercase"
            >
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                {worksData.cta.label}
              </span>
              <svg
                className="h-2 w-5 transition-transform duration-500 group-hover:translate-x-1"
                viewBox="0 0 21 8"
                fill="none"
              >
                <path
                  d="M20.354 4.354a.5.5 0 0 0 0-.708L17.172.464a.5.5 0 1 0-.708.708L19.293 4l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182ZM0 4.5h20v-1H0v1Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="works-grid">
        <div className="works-grid-text">
          <div className="works-cross mb-4 lg:mb-6">
            <span /><span />
          </div>
          <p
            ref={descriptionRef}
            className="font-alphabet max-w-md text-sm leading-relaxed text-white/70 lg:text-base"
          >
            {worksData.description}
          </p>
          <div className="mt-6 lg:hidden">
            <Link
              href={worksData.cta.href}
              className="group flex items-center gap-2 font-mono text-sm uppercase"
            >
              <span>{worksData.cta.label}</span>
              <svg
                className="h-2 w-5"
                viewBox="0 0 21 8"
                fill="none"
              >
                <path
                  d="M20.354 4.354a.5.5 0 0 0 0-.708L17.172.464a.5.5 0 1 0-.708.708L19.293 4l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182ZM0 4.5h20v-1H0v1Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>

        {worksData.projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`works-item works-item-${index + 1}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={project.href} className="group block h-full w-full">
              <div className="works-video-wrap">
                <div className="works-video">
                  <video
                    preload="metadata"
                    loop
                    muted
                    playsInline
                    poster={project.poster}
                    src={project.video}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
