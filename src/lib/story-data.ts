import type { StorySection } from "@/src/types/story";

export const storyData: StorySection = {
  chapter: "Our story",
  chapterIndex: "01",
  headline: [
    ["from vision"],
    ["to", "MEDIA", "global"],
    ["impact"],
  ],
  image: {
    src: "/images/hero2.jpg",
    alt: "Our story — from vision to global impact",
    width: 1792,
    height: 2140,
  },
  description:
    "Founded with a bold mission to reinvent the entertainment landscape, Lisboa Entertainment has rapidly transformed into a multi-continent creative powerhouse.",
  detail:
    "Today, our cross-functional teams work seamlessly across continents, backed by a network of world-class talent. Through proprietary tech and creative excellence, we deliver speed and transparency — redefining how stories are told and experienced worldwide.",
  cta: {
    label: "Inside Lisboa",
    href: "/inside",
  },
};
