/* eslint-disable @typescript-eslint/no-explicit-any */
import orders from "@/icons/Property_2_Cart_1_ubt3so.svg";
import analytics from "@/icons/Property_2_Chart-pie_bygfly.svg";
import help from "@/icons/Property_2_Chat_6_qlrj4q.svg";
import explore from "@/icons/Property_2_Compass_jfe95t.svg";
import downloads from "@/icons/Property_2_Downloads-folder_zb8tdq.svg";
import home from "@/icons/Property_2_Layout-4-blocks_gs8r2r.svg";
import integration from "@/icons/Property_2_Outlet_gqk6rs.svg";
import products from "@/icons/Property_2_Price_2_ugwdhq.svg";
import settings from "@/icons/Property_2_Settings_4_tm54pe.svg";
import profile from "@/icons/Property_2_User_iiqfxz.svg";
import customers from "@/icons/Property_2_User-folder_n4spfl.svg";
import payouts from "@/icons/Property_2_Wallet_3_teopvy.svg";
import { Edit, Eye, MinusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "~/components/ui/badge";
import { ProductService } from "~/services/product.service";
import { Toast } from "./notificationManager";
import { cn, formatDate, formatTime } from "./utils";

export const sideItems: SidebarItem[] = [
  {
    route: "Home",
    link: "/dashboard/:userID/home",
    iconUrl: home,
    id: "home",
  },
  {
    route: "Products",
    link: "/dashboard/:userID/products",
    iconUrl: products,
    id: "products",
  },
  {
    route: "Orders",
    link: "/dashboard/:userID/orders",
    iconUrl: orders,
    id: "orders",
    badge: {
      count: 2,
      variant: "danger",
    },
  },
  {
    route: "Analytics",
    link: "/dashboard/:userID/analytics",
    iconUrl: analytics,
    id: "analytics",
  },
  {
    route: "Customers",
    link: "/dashboard/:userID/customers",
    iconUrl: customers,
    id: "customers",
  },
  {
    route: "Payouts",
    link: "/dashboard/:userID/payouts",
    iconUrl: payouts,
    id: "payouts",
  },
  {
    divider: true,
    route: "",
    link: "",
    id: "divider-1",
  },
  {
    route: "Downloads",
    link: "/dashboard/:userID/downloads",
    iconUrl: downloads,
    id: "downloads",
  },
  {
    route: "Explore",
    link: "/dashboard/:userID/explore",
    iconUrl: explore,
    id: "explore",
  },
  {
    route: "Integration",
    link: "/dashboard/:userID/integration",
    iconUrl: integration,
    id: "integration",
  },
  {
    divider: true,
    route: "",
    link: "",
    id: "divider-2",
  },
  {
    route: "Help",
    link: "/dashboard/:userID/help",
    iconUrl: help,
    id: "help",
  },
  {
    route: "Settings",
    link: "/dashboard/:userID/settings",
    iconUrl: settings,
    id: "settings",
  },
  {
    route: "Profile",
    link: "/dashboard/:userID/profile",
    iconUrl: profile,
    id: "profile",
  },
];

export const statusOptions = [
  { label: "All Products", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

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
