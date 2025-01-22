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

export const sideItems: SidebarItem[] = [
  {
    route: "Home",
    link: "/admin/home",
    iconUrl: home,
    id: "home",
  },
  {
    route: "Products",
    link: "/admin/products",
    iconUrl: products,
    id: "products",
  },
  {
    route: "Orders",
    link: "/admin/orders",
    iconUrl: orders,
    id: "orders",
    badge: {
      count: 2,
      variant: "danger",
    },
  },
  {
    route: "Analytics",
    link: "/admin/analytics",
    iconUrl: analytics,
    id: "analytics",
  },
  {
    route: "Customers",
    link: "/admin/customers",
    iconUrl: customers,
    id: "customers",
  },
  {
    route: "Payouts",
    link: "/admin/payouts",
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
    link: "/admin/downloads",
    iconUrl: downloads,
    id: "downloads",
  },
  {
    route: "Explore",
    link: "/admin/explore",
    iconUrl: explore,
    id: "explore",
  },
  {
    route: "Integration",
    link: "/admin/integration",
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
    link: "/admin/help",
    iconUrl: help,
    id: "help",
  },
  {
    route: "Settings",
    link: "/admin/settings",
    iconUrl: settings,
    id: "settings",
  },
  {
    route: "Profile",
    link: "/admin/profile",
    iconUrl: profile,
    id: "profile",
  },
];
