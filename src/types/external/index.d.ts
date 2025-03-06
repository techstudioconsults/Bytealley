declare global {
  interface SubLink {
    id: number;
    name: string;
    path: string;
  }

  interface LinkProperty {
    id: number;
    name: string;
    path: string;
    type: string;
    subLinks?: SubLink[];
  }

  interface HeroProperties {
    children: React.ReactNode;
    height?: string;
    bgImg?: string;
    bgColor?: string;
  }

  interface SectionLayoutProperties {
    height?: string;
    bgColor?: string;
    bgImg?: string;
    children: React.ReactNode;
  }

  interface CardData {
    image: string;
    title: string;
    description: string;
  }

  interface DualSectionLayoutProperties {
    children: React.ReactNode;
    img: string;
    height?: string;
    className?: string;
    imgClassName?: string;
    leftSectionClassName?: string;
    rightSectionClassName?: string;
  }

  interface DualSectionLayoutListProperties {
    title: string;
    subTitle: string;
    listItems?: string[];
    iconColor?: string;
    shouldShowButton?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
    headerClassName?: string;
    subHeaderClassName?: string;
    buttonClassName?: string;
  }
  interface StepCardProperties {
    title: string;
    description: string;
    imageSrc: string;
  }
}

export {};
