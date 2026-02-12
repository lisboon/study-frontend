import type { Slide } from "@/src/types/hero";

export const SLIDE_DURATION = 6;

export const slides: Slide[] = [
  {
    id: 0,
    image: "/images/hero.jpeg",
    description:
      "Presenting Lisboa Entertainment, an instrument to redefine creativity and authenticity by empowering Lisboa's talents from screen, to sound, to style her narrative, her standard.",
    title: ["lisboa", "entertainment"],
  },
  {
    id: 1,
    image: "/images/hero2.jpg",
    description:
      "A creative vision driven by passion and purpose. We craft experiences that inspire and captivate audiences across all platforms worldwide.",
    title: ["creative", "vision"],
  },
  {
    id: 2,
    image: "/images/hero3.jpg",
    description:
      "From concept to execution, we deliver projects that push boundaries and set new standards in entertainment and digital media.",
    title: ["our", "projects"],
  },
  {
    id: 3,
    image: "/images/hero4.png",
    description:
      "Every story has the power to change perspectives. We tell stories that resonate, connect, and leave a lasting impression.",
    title: ["success", "stories"],
  },
];
