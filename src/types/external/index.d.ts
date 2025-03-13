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

  interface SectionLayoutProperties extends React.HTMLAttributes<HTMLDivElement> {
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

  interface DualLayoutProperties extends React.HTMLAttributes<HTMLDivElement> {
    bgClassName?: string;
    leftChild: React.ReactNode | string;
    leftChildBgColor: string;
    rightChild: React.ReactNode | string;
    rightChildBgColor: string;
    rightChildClassName?: string;
    leftChildClassName?: string;
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
    subTitle: string | React.ReactNode;
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
  interface StepCardProperties extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    imageSrc?: string;
  }

  interface Term {
    title: string;
    text: string;
    points: string[];
  }

  type CategoryItem = {
    name: string;
    categories: string[];
  };

  interface CardProperties {
    width?: string;
    image: string;
    heading: string;
    rate?: number;
    count?: number;
    price: number;
    publisher: string;
    productID: string | number;
    aggrRating: string | number;
    discountPrice: number;
  }

  interface CartedProduct {
    id: string;
    quantity: number;
    product_slug: string;
    product_title: string;
    product_thumbnail: string;
    product_price: number;
  }

  interface CartState {
    cart: CartedProduct[];
    isPending: boolean;
    isAddToCartPending: boolean;
    isRemoveFromCartPending: boolean;
    isUpdateQuantityPending: boolean;
    isPurchaseProductFromCartPending: boolean;
  }

  interface CartContextType {
    cart: CartedProduct[];
    isPending: boolean;
    isAddToCartPending: boolean;
    isRemoveFromCartPending: boolean;
    isUpdateQuantityPending: boolean;
    isPurchaseProductFromCartPending: boolean;
    addToCart: (productSlug: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    purchaseProductInCart: (cart: CartedProduct[]) => void;
    getAllProductsFromCart: () => void;
  }
}

export {};
