// import { useCallback, useEffect, useState, useTransition } from "react";

import { useContext } from "react";

import { CartContext } from "~/context/cart-provider";

// import { AppService } from "~/services/app.service";
// import { Toast } from "~/utils/notificationManager";

// export const useCart = (appService: AppService) => {
//   const [cart, setCart] = useState<CartedProduct[]>([]);
//   const [isPending, startTransition] = useTransition();
//   const [isAddToCartPending, startAddToCartTransition] = useTransition();
//   const [isRemoveFromCartPending, startRemoveFromCartTransition] = useTransition();
//   const [isUpdateQuantityPending, startUpdateQuantityTransition] = useTransition();
//   const [isPurchaseProductFromCartPending, startPurchaseProductFromCartTransition] = useTransition();

//   const addToCart = (productSlug: string, quantity: number) => {
//     startAddToCartTransition(async () => {
//       const response = await appService.storeProductsInCart({ product_slug: productSlug, quantity });
//       if (response) {
//         setCart((previousCart) => [...previousCart, response.data]);
//         Toast.getInstance().showToast({
//           title: "Success",
//           description: `Product added to cart successfully`,
//           variant: "success",
//         });
//       }
//     });
//   };

//   const purchaseProductInCart = (cart: CartedProduct[]) => {
//     if (cart.length === 0) {
//       Toast.getInstance().showToast({
//         title: "Error",
//         description: `No products in cart to purchase`,
//         variant: "error",
//       });
//       return;
//     }

//     const data = {
//       amount: cart.reduce((total, item) => total + item.product_price * item.quantity, 0),
//       products: cart.map((item) => ({
//         product_slug: item.product_slug,
//         quantity: item.quantity,
//       })),
//     };

//     startPurchaseProductFromCartTransition(async () => {
//       const response = await appService.purchaseProductInCart(data);
//       if (response) {
//         Toast.getInstance().showToast({
//           title: "Success",
//           description: `Purchase initiated! Redirecting to payment...`,
//           variant: "success",
//         });
//         window.location.href = response.authorization_url;
//       }
//     });
//   };

//   const getAllProductsFromCart = useCallback(() => {
//     startTransition(async () => {
//       const response = await appService.getProductsFromCart();
//       if (response) {
//         setCart([...response]);
//       }
//     });
//   }, [appService, startTransition]);

//   const removeFromCart = (productId: string) => {
//     startRemoveFromCartTransition(async () => {
//       const response = await appService.deleteProductInCart(productId);
//       if (response) {
//         setCart((previousCart) => previousCart.filter((item) => item.id !== productId));
//         Toast.getInstance().showToast({
//           title: "Success",
//           description: `Product removed from cart successfully`,
//           variant: "success",
//         });
//       }
//     });
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     startUpdateQuantityTransition(async () => {
//       const response = await appService.updateProductInCart(productId, { quantity });
//       if (response) {
//         setCart((previousCart) => previousCart.map((item) => (item.id === productId ? { ...item, quantity } : item)));
//         Toast.getInstance().showToast({
//           title: "Success",
//           description: `Product quantity updated successfully`,
//           variant: "success",
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     const fetchCartProducts = () => {
//       getAllProductsFromCart();
//     };

//     fetchCartProducts();
//   }, [appService, getAllProductsFromCart]);

//   return {
//     cart,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     purchaseProductInCart,
//     getAllProductsFromCart,
//     isPending,
//     isAddToCartPending,
//     isPurchaseProductFromCartPending,
//     isRemoveFromCartPending,
//     isUpdateQuantityPending,
//   };
// };

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
