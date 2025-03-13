import CustomButton from "~/components/common/common-button/common-button";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { useCart } from "~/hooks/use-cart";

export const ProductCard = ({ product }: { product: CartedProduct }) => {
  const { removeFromCart, isRemoveFromCartPending } = useCart();
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-black p-4 shadow-sm sm:flex-row">
      <div className="relative h-32 w-32 flex-shrink-0 sm:w-48">
        <BlurImage
          src={product.product_thumbnail || "/placeholder-image.png"}
          alt={product.product_title}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="w-full flex-1 space-y-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{product.product_title}</h3>
          <p className="text-lg font-semibold">₦{product.product_price.toLocaleString()}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm">Qty: {product.quantity}</p>
          <CustomButton
            isLoading={isRemoveFromCartPending}
            isDisabled={isRemoveFromCartPending}
            className={`border-mid-danger text-mid-danger`}
            variant="outline"
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
