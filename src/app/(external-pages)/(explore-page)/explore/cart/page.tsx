"use client";

import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import CustomButton from "~/components/common/common-button/common-button";
import { Wrapper } from "~/components/layout/wrapper";
import { WithDependency } from "~/HOC/withDependencies";
import { useCart } from "~/hooks/use-cart";
import { useSession } from "~/hooks/use-session";
import { dependencies } from "~/utils/dependencies";
import { ProductCard } from "./_components/cart-product-card";

const BaseProductCart = () => {
  const { cart, isPending, purchaseProductInCart, isPurchaseProductFromCartPending } = useCart();
  const { user } = useSession();

  if (isPending) {
    return <Loading text={`Loading cart...`} className="w-full p-20" />;
  }

  return (
    <Wrapper className="my-10 max-w-3xl">
      <div className={`mb-5`}>
        <BackNavigator text={`Go back to product page`} />
      </div>
      {user ? (
        cart?.length > 0 ? (
          <div className="shadow-NB rounded-lg border border-black p-6">
            {cart.map((item, index) => (
              <div key={index}>
                <ProductCard product={item} />
                <hr className="my-4 border-gray-200" />
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between px-4 font-semibold">
              <p>Total</p>
              <p>₦{cart.reduce((total, item) => total + item.product_price * item.quantity, 0).toLocaleString()}</p>
            </div>
            <hr className="my-4 border-gray-200" />
            <CustomButton
              isLoading={isPurchaseProductFromCartPending}
              isDisabled={isPurchaseProductFromCartPending}
              onClick={() => purchaseProductInCart(cart)}
              className={`w-full`}
              size={`xl`}
              variant={`primary`}
            >
              Proceed to Pay
            </CustomButton>
          </div>
        ) : (
          <EmptyState
            className={`shadow-NB h-fit rounded-md border border-black bg-low-purple p-4 md:p-5`}
            title="Empty Cart"
            description="There are no products in your cart."
            images={[]}
          />
        )
      ) : (
        <div className="shadow-NB rounded-md border border-black bg-low-purple p-5 text-center md:p-20">
          <h2 className="mb-2 text-lg font-bold sm:text-2xl">Please log in to view your cart</h2>
          <p className="mb-6 text-sm">
            To see the items in your cart, you need to log in. Click the button below to go to the login page.
          </p>
          <CustomButton href="/auth/login" variant={`primary`} size={`xl`}>
            Login
          </CustomButton>
        </div>
      )}
    </Wrapper>
  );
};

const ProductCart = WithDependency(BaseProductCart, {
  appService: dependencies.APP_SERVICE,
});

export default ProductCart;
