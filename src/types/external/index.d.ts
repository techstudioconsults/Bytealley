declare global {
  type SubLink = {
    id: number;
    name: string;
    path: string;
  };

  type LinkProperty = {
    id: number;
    name: string;
    path: string;
    type: string;
    subLinks?: SubLink[];
  };

  type HeroProperties = {
    children: React.ReactNode;
    height?: string;
    bgImg?: string;
    bgColor?: string;
  };

  type SectionLayoutProperties = {
    height?: string;
    bgColor?: string;
    bgImg?: string;
    children: React.ReactNode;
  };

  type CardData = {
    image: string;
    title: string;
    description: string;
  };
}

export {};
