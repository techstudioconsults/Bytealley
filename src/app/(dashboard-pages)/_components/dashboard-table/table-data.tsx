/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit, Eye, MinusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "~/components/ui/badge";
import { ProductService } from "~/services/product.service";
import { Toast } from "~/utils/notificationManager";
import { cn, formatDate, formatTime } from "~/utils/utils";

export const RowActions: (product: IProduct, service: any) => IRowAction<IProduct>[] = (
  product: IProduct,
  productService: ProductService,
) => {
  const router = useRouter();
  const actions: IRowAction<IProduct>[] = [];

  switch (product.status) {
    case "draft": {
      actions.push(
        {
          label: "Edit",
          onClick: () => {},
          icon: <Edit className={`text-high-primary`} />,
        },
        {
          label: "Delete",
          onClick: async () => {
            const response = await productService.softDeleteProduct(product.id);
            if (response) {
              Toast.getInstance().showToast({
                title: "Success",
                description: `Product ${product.title} deleted successfully!`,
                variant: "success",
              });
              router.push(`/dashboard/${product.user_id}/products?tab=deleted`);
            }
          },
          icon: <Trash className={`text-high-danger`} />,
        },
        {
          label: "Preview",
          onClick: () => {},
          icon: <Eye className={`text-high-primary`} />,
        },
      );
      break;
    }
    case "published": {
      actions.push(
        {
          label: "Unpublish to draft",
          onClick: () => {},
          icon: <MinusCircle className={`text-high-warning`} />,
        },
        {
          label: "Edit",
          onClick: () => {},
          icon: <Edit className={`text-high-primary`} />,
        },
        {
          label: "Delete",
          onClick: async () => {
            const response = await productService.softDeleteProduct(product.id);
            if (response) {
              Toast.getInstance().showToast({
                title: "Success",
                description: `Product ${product.title} deleted successfully!`,
                variant: "success",
              });
            }
          },
          icon: <Trash className={`text-high-danger`} />,
        },
        {
          label: "Preview",
          onClick: () => {},
          icon: <Eye className={`text-high-primary`} />,
        },
      );
      break;
    }
    case "deleted": {
      actions.push(
        {
          label: "Recover to Draft",
          onClick: () => {},
          icon: <Eye className={`text-high-primary`} />,
        },
        {
          label: "Delete Permanently",
          onClick: () => {},
          icon: <Trash className={`text-high-danger`} />,
        },
        {
          label: "Preview",
          onClick: () => {},
          icon: <Eye className={`text-high-primary`} />,
        },
      );
      break;
    }
    // No default
  }

  return actions;
};

export const productColumns: IColumnDefinition<IProduct>[] = [
  {
    header: "Product Name",
    accessorKey: "title",
    render: (_, product: IProduct) => (
      <div className={`flex w-fit items-center gap-2`}>
        <Image
          src={product.thumbnail}
          alt="product"
          width={100}
          height={64}
          className={`h-[64px] w-[100px] rounded-md bg-low-grey-III object-cover`}
        />
        <div className="flex flex-col space-y-2">
          <span className="text-[16px] font-medium">{product.title}</span>
          <span className="space-x-1 text-sm text-mid-grey-II">
            {`PDF-55.MB • `}
            {formatDate(product.created_at)}
            <span>•</span>
            <span>{formatTime(product.created_at)}</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Price",
    accessorKey: "price",
    render: (_, product: IProduct) => <span>₦{product.price?.toLocaleString()}</span>,
  },
  {
    header: "Sales",
    accessorKey: "total_sales",
  },
  {
    header: "Type",
    accessorKey: "product_type",
  },
  {
    header: "Status",
    accessorKey: "status",
    render: (_, product: IProduct) => (
      <Badge
        className={cn(
          product.status === "draft" ? "bg-mid-warning text-high-warning" : "bg-mid-success text-high-success",
          "rounded-sm px-4 py-2",
        )}
      >
        {product.status}
      </Badge>
    ),
  },
];
