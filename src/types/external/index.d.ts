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
}

export {};
