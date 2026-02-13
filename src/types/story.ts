export interface StorySection {
  chapter: string;
  chapterIndex: string;
  headline: string[][];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  description: string;
  detail: string;
  cta: {
    label: string;
    href: string;
  };
}
