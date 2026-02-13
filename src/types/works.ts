export interface WorkProject {
  id: number;
  slug: string;
  title: string;
  video: string;
  poster: string;
  href: string;
}

export interface WorksSection {
  chapter: string;
  chapterIndex: string;
  title: string[];
  description: string;
  cta: {
    label: string;
    href: string;
  };
  projects: WorkProject[];
}
