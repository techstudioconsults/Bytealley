import { TrashIcon } from "lucide-react";

import CustomButton from "~/components/common/common-button/common-button";
import { ConfirmationDialog } from "~/components/common/dialog/confirmation-dialog";
import { SetToolTip } from "~/components/common/tool-tip";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { useCart } from "~/hooks/use-cart";

export const ProductCard = ({ product }: { product: CartedProduct }) => {
  const { removeFromCart, isRemoveFromCartPending } = useCart();

  const handleRemove = () => {
    removeFromCart(product.id);
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

          <ConfirmationDialog
            action={{
              pending: isRemoveFromCartPending,
              onOpenChange: () => {},
              title: "Remove Item",
              description: "Are you sure you want to remove this item from your cart?",
              onConfirm: handleRemove,
              buttonName: "Remove",
            }}
          >
            <CustomButton
              isIconOnly
              className="border-mid-danger text-mid-danger"
              variant="ghost"
              size="icon"
              icon={
                <SetToolTip content="Remove">
                  <TrashIcon />
                </SetToolTip>
              }
            />
          </ConfirmationDialog>
        </div>
      </div>
    </div>
  );
};
