"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { storyData } from "@/src/lib/story-data";
import { useStoryScroll } from "@/src/hooks/use-story-scroll";

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const flipTargetRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useStoryScroll({
    sectionRef,
    stickyRef,
    imageRef,
    flipTargetRef,
    chapterRef,
    headlineRef,
    cardRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center h-full w-full bg-white max-lg:min-h-screen max-lg:pt-32 lg:h-[200vh] lg:justify-start"
    >
      <div
        ref={stickyRef}
        className="relative z-1 flex w-full flex-col justify-center pb-6 transition-colors duration-1000 ease-in-out lg:sticky lg:top-0 lg:h-screen"
      >
        <div className="text-wrapper z-1 flex h-fit w-full flex-col items-center justify-center">
          <div
            ref={chapterRef}
            className="chapter-text relative z-2 pb-6 text-center lg:pb-8"
          >
            <h2 className="page-chapter inline-flex gap-2 font-mono text-sm uppercase">
              <span className="chapter-index">
                [{storyData.chapterIndex}]
              </span>
              <span>{storyData.chapter}</span>
            </h2>
          </div>

          <div
            ref={headlineRef}
            className="font-termina relative mx-auto flex w-full flex-col items-center text-center text-[7.8vw] uppercase leading-none tracking-[0.25%] transition-all duration-300 ease-in-out"
          >
            {storyData.headline.map((line, lineIndex) => (
              <div key={lineIndex} className="max-w-full">
                <div className="relative flex h-full max-w-full flex-col flex-wrap items-center justify-center gap-4 lg:inline-flex lg:flex-row lg:flex-nowrap lg:items-baseline">
                  {line.map((word, wordIndex) => {
                    if (word === "MEDIA") {
                      return (
                        <div
                          key={wordIndex}
                          className="item relative max-w-full overflow-visible"
                        >
                          <div className="media-wrapper relative z-1 h-[4lh] w-[4lh] overflow-visible lg:h-[.8lh] lg:w-[.8lh]">
                            <div
                              ref={imageRef}
                              className="media h-[4lh] w-[4lh] overflow-clip lg:h-[.8lh] lg:w-[.8lh]"
                              style={{
                                clipPath:
                                  "polygon(25% 0px, 100% 0px, 75% 100%, 0px 100%)",
                              }}
                            >
                              <Image
                                src={storyData.image.src}
                                alt={storyData.image.alt}
                                width={storyData.image.width}
                                height={storyData.image.height}
                                className="size-full object-cover select-none"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={wordIndex}
                        className="item relative max-w-full overflow-visible"
                      >
                        <p className="relative z-2">{word}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="target-container absolute top-0 right-0 bottom-0 left-0 h-full w-full max-lg:min-h-screen">
        <div
          ref={flipTargetRef}
          className="absolute top-0 left-0 h-full w-full lg:sticky lg:h-screen"
        />
      </div>

      <div className="pointer-events-none relative bottom-0 z-2 ml-auto flex h-full items-end lg:absolute lg:right-0 lg:w-1/2">
        <div
          ref={cardRef}
          className="bottom-0 flex flex-col lg:sticky lg:ml-auto lg:w-1/2"
        >
          <div className="story-card pointer-events-auto relative flex w-78.75 flex-col p-4 max-2xl:aspect-3/4 lg:max-h-[55vh] lg:w-full 2xl:min-h-80">
            <div className="text-lg">
              <p>{storyData.description}</p>
            </div>

            <div className="pt-7 text-base">
              <p>{storyData.detail}</p>
            </div>

            <Link
              href={storyData.cta.href}
              className="group mt-auto flex items-center gap-2 font-mono text-sm uppercase after:absolute after:inset-0"
              aria-label={storyData.cta.label}
            >
              <span className="h-[.6lh] w-3 -skew-x-20 bg-current transition-all duration-200 group-hover:w-7" />
              <span className="transition-transform duration-500 group-hover:translate-x-2">
                {storyData.cta.label}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
