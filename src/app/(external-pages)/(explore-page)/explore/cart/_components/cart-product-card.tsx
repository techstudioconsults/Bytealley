import { TrashIcon } from "lucide-react";
import { useState } from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { ReusableDialog } from "~/components/common/Dialog";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { useCart } from "~/hooks/use-cart";

export const ProductCard = ({ product }: { product: CartedProduct }) => {
  const { removeFromCart, isRemoveFromCartPending } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRemove = () => {
    removeFromCart(product.id);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:flex-row">
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

          <ReusableDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            trigger={
              <CustomButton
                isIconOnly
                className="border-mid-danger text-mid-danger"
                variant="ghost"
                size="icon"
                icon={<TrashIcon />}
              />
            }
            title="Remove Item"
            description="Are you sure you want to remove this item from your cart?"
          >
            <div className="flex justify-end gap-4 pt-4">
              <CustomButton variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </CustomButton>
              <CustomButton
                isDisabled={isRemoveFromCartPending}
                isLoading={isRemoveFromCartPending}
                variant="destructive"
                onClick={handleRemove}
              >
                Remove
              </CustomButton>
            </div>
          </ReusableDialog>
        </div>
      </div>
    </div>
  );
};
