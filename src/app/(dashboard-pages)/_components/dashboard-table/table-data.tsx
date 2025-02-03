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
            await productService.softDeleteProduct(product.id);
            Toast.getInstance().showToast({
              title: "Success",
              description: `Product ${product.title} deleted successfully!`,
              variant: "warning",
            });
            router.push(`/dashboard/${product.user_id}/products?tab=deleted`);
          },
          icon: <Trash className={`text-high-danger`} />,
        },
        {
          label: "Preview",
          onClick: () => {
            router.push(`/dashboard/${product.user_id}/products/new?product_id=${product.id}&tab=preview`);
          },
          icon: <Eye className={`text-high-primary`} />,
        },
      );
      break;
    }
    case "published": {
      actions.push(
        {
          label: "Unpublish to draft",
          onClick: async () => {
            await productService.publishProduct(product.id);
            Toast.getInstance().showToast({
              title: "Success",
              description: `Product ${product.title} status updated successfully!`,
              variant: "success",
            });
            router.push(`/dashboard/${product.user_id}/products?tab=drafts`);
          },
          icon: <MinusCircle className={`text-high-warning`} />,
        },
        {
          label: "Edit",
          onClick: async () => {},
          icon: <Edit className={`text-high-primary`} />,
        },
        {
          label: "Delete",
          onClick: async () => {
            await productService.softDeleteProduct(product.id);
            Toast.getInstance().showToast({
              title: "Success",
              description: `Product ${product.title} deleted successfully!`,
              variant: "warning",
            });
            router.push(`/dashboard/${product.user_id}/products?tab=deleted`);
          },
          icon: <Trash className={`text-high-danger`} />,
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
          product.status === "draft" ? "bg-mid-warning text-high-warning" : "bg-mid-success text-white",
          "rounded-sm px-4 py-2",
        )}
      >
        {product.status}
      </Badge>
    ),
  },
];

export const singleProductCustomerColumns: IColumnDefinition<IProductOrderFlat>[] = [
  {
    header: "Customer Name",
    accessorKey: "customer",
    render: (_, product: IProductOrderFlat) => <span>{product?.customer?.name}</span>,
  },
  {
    header: "Customer Email",
    accessorKey: "customer",
    render: (_, product: IProductOrderFlat) => <span>{product?.customer?.email}</span>,
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
];

export const orderColumns: IColumnDefinition<IProductOrderFlat>[] = [
  {
    header: "Product",
    accessorKey: "product",
    render: (_, product: IProductOrderFlat) => (
      <div className={`flex w-fit items-center gap-2`}>
        <Image
          src={product?.product?.thumbnail || ""}
          alt="product"
          width={44}
          height={44}
          className={`h-[44px] w-[44px] rounded-md bg-low-grey-III object-cover`}
        />
        <span className="text-[16px] font-medium">{product?.product?.title}</span>
      </div>
    ),
  },
  {
    header: "Price",
    accessorKey: "product",
    render: (_, product: IProductOrderFlat) => <span>₦{product?.product?.price?.toLocaleString()}</span>,
  },
  {
    header: "Customer Email",
    accessorKey: "customer",
    render: (_, product: IProductOrderFlat) => <span>{product?.customer?.email}</span>,
  },
  {
    header: "Date",
    accessorKey: "date",
  },
];

export const customerColumns: IColumnDefinition<ICustomer>[] = [
  {
    header: "Customer Name",
    accessorKey: "name",
  },
  {
    header: "Customer Email",
    accessorKey: "email",
  },
  {
    header: "Latest Purchase",
    accessorKey: "latest_purchases",
    render: (_, customer: ICustomer) => (
      <div className={`space-y-2`}>
        <p>{customer?.latest_purchases?.[0]?.product_title}</p>
        <p className={`text-sm text-mid-grey-II underline`}>{customer?.id}</p>
      </div>
    ),
  },
  {
    header: "Latest Purchase Price",
    accessorKey: "latest_purchase_price",
    render: (_, customer: ICustomer) => <span>₦{customer?.latest_purchase_price?.toLocaleString()}</span>,
  },
  {
    header: "Date",
    accessorKey: "latest_purchase_date",
    render: (_, customer: ICustomer) => (
      <span>
        {formatDate(customer?.latest_purchase_date)} {formatTime(customer?.latest_purchase_date)}
      </span>
    ),
  },
];

export const latestPurchaseColumns: IColumnDefinition<ILatestPurchase>[] = [
  {
    header: "Latest Purchase",
    accessorKey: "product_thumbnail",
    render: (_, customer: ILatestPurchase) => (
      <div className={`flex w-fit items-center gap-2`}>
        <Image src={customer?.product_thumbnail} alt="product" width={44} height={44} />
        <span className="text-[16px] font-medium">{customer?.product_title}</span>
      </div>
    ),
  },
  {
    header: "Price",
    accessorKey: "product_price",
    render: (_, customer: ILatestPurchase) => <span>₦{customer?.product_price?.toLocaleString()}</span>,
  },
  {
    header: "Date",
    accessorKey: "date",
    render: (_, customer: ILatestPurchase) => (
      <span>
        {formatDate(customer?.date)} {formatTime(customer?.date)}
      </span>
    ),
  },
];
