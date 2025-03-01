import { StaticImageData } from "next/image";

export type template = {
  pages: {
    content: string;
    id: string;
    name: string;
    styles: string;
  }[];
  id: string;
  thumbnail: StaticImageData;
};
