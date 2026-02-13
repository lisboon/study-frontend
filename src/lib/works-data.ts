import type { WorksSection } from "@/src/types/works";

export const worksData: WorksSection = {
  chapter: "Our Work",
  chapterIndex: "02",
  title: ["RECENT", "PROJECTS"],
  description:
    "From dynamic campaigns that reinvent brand narratives to groundbreaking visual experiences, if it's on a screen, we're all about it.",
  cta: {
    label: "Explore",
    href: "/works",
  },
  projects: [
    {
      id: 0,
      slug: "project-alpha",
      title: "Project Alpha",
      video: "/videos/hero.mp4",
      poster: "/images/hero.jpeg",
      href: "/works/project-alpha",
    },
    {
      id: 1,
      slug: "creative-vision",
      title: "Creative Vision",
      video: "/videos/hero.mp4",
      poster: "/images/hero2.jpg",
      href: "/works/creative-vision",
    },
    {
      id: 2,
      slug: "brand-campaign",
      title: "Brand Campaign",
      video: "/videos/hero.mp4",
      poster: "/images/hero3.jpg",
      href: "/works/brand-campaign",
    },
    {
      id: 3,
      slug: "digital-experience",
      title: "Digital Experience",
      video: "/videos/hero.mp4",
      poster: "/images/hero4.png",
      href: "/works/digital-experience",
    },
  ],
};
