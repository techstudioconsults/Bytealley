"use client";

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

export const customersData = {
  data: [
    {
      id: "9ad4f0b6-aa97-49aa-9a68-f11e701e474c",

      name: "Kingsley Solomon Free",
      email: "kinxly@testemail.com",
      free_products: 5,
      sale_products: 5,
      total_order: 1,
      total_transactions: "17085",
      latest_purchase_title: "Porro cum aut.",
      latest_purchase_price: 5695,
      latest_purchase_date: "2023-12-12T15:07:02.000000Z",
      joined: "2023-12-12T15:07:02.000000Z",
      latest_purchases: [
        {
          id: "9ad4f0b6-ac34-4445-a5e8-d4dbc882d5ac",
          product_title: "Porro cum aut.",
          product_price: 5695,
          product_thumbnail:
            "https://productize.nyc3.cdn.digitaloceanspaces.com/products-thumbnail/3d_collection_showcase-20210110-0001.jpg",
          quantity: 3,
          total_amount: 17_085,
          customer_name: "Kingsley Solomon Free",
          customer_email: "kinxly@testemail.com",
          total_order: 1,
          total_sales: 17_085,
          total_views: 1,
          date: "2023-12-12T15:07:02.000000Z",
        },
        {
          id: "9ad4f0b6-ac34-4445-a5e8-d4dbc882d5ac",
          product_title: "Porro cum aut.",
          product_price: 5695,
          product_thumbnail:
            "https://productize.nyc3.cdn.digitaloceanspaces.com/products-thumbnail/3d_collection_showcase-20210110-0001.jpg",
          quantity: 3,
          total_amount: 17_085,
          customer_name: "Kingsley Solomon Free",
          customer_email: "kinxly@testemail.com",
          total_order: 1,
          total_sales: 17_085,
          total_views: 1,
          date: "2023-12-12T15:07:02.000000Z",
        },
        {
          id: "9ad4f0b6-ac34-4445-a5e8-d4dbc882d5ac",
          product_title: "Porro cum aut.",
          product_price: 5695,
          product_thumbnail:
            "https://productize.nyc3.cdn.digitaloceanspaces.com/products-thumbnail/3d_collection_showcase-20210110-0001.jpg",
          quantity: 3,
          total_amount: 17_085,
          customer_name: "Kingsley Solomon Free",
          customer_email: "kinxly@testemail.com",
          total_order: 1,
          total_sales: 17_085,
          total_views: 1,
          date: "2023-12-12T15:07:02.000000Z",
        },
      ],
    },
    {
      id: "9ad4f0b6-aa97-49aa-9a68-f11e701e474c",
      name: "Kingsley Solomon Free",
      email: "kinxly@testemail.com",
      free_products: 5,
      sale_products: 5,
      total_order: 1,
      total_transactions: "17085",
      latest_purchase_title: "Porro cum aut.",
      latest_purchase_price: 5695,
      latest_purchase_date: "2023-12-12T15:07:02.000000Z",
      joined: "2023-12-12T15:07:02.000000Z",
      latest_purchases: [
        {
          id: "9ad4f0b6-ac34-4445-a5e8-d4dbc882d5ac",
          product_title: "Porro cum aut.",
          product_price: 5695,
          product_thumbnail:
            "https://productize.nyc3.cdn.digitaloceanspaces.com/products-thumbnail/3d_collection_showcase-20210110-0001.jpg",
          quantity: 3,
          total_amount: 17_085,
          customer_name: "Kingsley Solomon Free",
          customer_email: "kinxly@testemail.com",
          total_order: 1,
          total_sales: 17_085,
          total_views: 1,
          date: "2023-12-12T15:07:02.000000Z",
        },
      ],
    },
    {
      id: "9ad4f0b6-aa97-49aa-9a68-f11e701e474c",
      name: "Kingsley Solomon Free",
      email: "kinxly@testemail.com",
      free_products: 5,
      sale_products: 5,
      total_order: 1,
      total_transactions: "17085",
      latest_purchase_title: "Porro cum aut.",
      latest_purchase_price: 5695,
      latest_purchase_date: "2023-12-12T15:07:02.000000Z",
      joined: "2023-12-12T15:07:02.000000Z",
      latest_purchases: [
        {
          id: "9ad4f0b6-ac34-4445-a5e8-d4dbc882d5ac",
          product_title: "Porro cum aut.",
          product_price: 5695,
          product_thumbnail:
            "https://productize.nyc3.cdn.digitaloceanspaces.com/products-thumbnail/3d_collection_showcase-20210110-0001.jpg",
          quantity: 3,
          total_amount: 17_085,
          customer_name: "Kingsley Solomon Free",
          customer_email: "kinxly@testemail.com",
          total_order: 1,
          total_sales: 17_085,
          total_views: 1,
          date: "2023-12-12T15:07:02.000000Z",
        },
      ],
    },
    {
      id: "9ad4f0b6-aa97-49aa-9a68-f11e701e474c",
      name: "Kingsley Solomon Free",
      email: "kinxly@testemail.com",
      free_products: 5,
      sale_products: 5,
      total_order: 1,
      total_transactions: "17085",
      latest_purchase_title: "Porro cum aut.",
      latest_purchase_price: 5695,
      latest_purchase_date: "2023-12-12T15:07:02.000000Z",
      joined: "2023-12-12T15:07:02.000000Z",
      latest_purchases: [
        {
          id: "9ad4f0b6-ac34-4445-a5e8-d4dbc882d5ac",
          product_title: "Porro cum aut.",
          product_price: 5695,
          product_thumbnail:
            "https://productize.nyc3.cdn.digitaloceanspaces.com/products-thumbnail/3d_collection_showcase-20210110-0001.jpg",
          quantity: 3,
          total_amount: 17_085,
          customer_name: "Kingsley Solomon Free",
          customer_email: "kinxly@testemail.com",
          total_order: 1,
          total_sales: 17_085,
          total_views: 1,
          date: "2023-12-12T15:07:02.000000Z",
        },
      ],
    },
    {
      id: "9ad4f0b6-aa97-49aa-9a68-f11e701e474c",
      name: "Kingsley Solomon Free",
      email: "kinxly@testemail.com",
      free_products: 5,
      sale_products: 5,
      total_order: 1,
      total_transactions: "17085",
      latest_purchase_title: "Porro cum aut.",
      latest_purchase_price: 5695,
      latest_purchase_date: "2023-12-12T15:07:02.000000Z",
      joined: "2023-12-12T15:07:02.000000Z",
      latest_purchases: [
        {
          id: "9ad4f0b6-ac34-4445-a5e8-d4dbc882d5ac",
          product_title: "Porro cum aut.",
          product_price: 5695,
          product_thumbnail:
            "https://productize.nyc3.cdn.digitaloceanspaces.com/products-thumbnail/3d_collection_showcase-20210110-0001.jpg",
          quantity: 3,
          total_amount: 17_085,
          customer_name: "Kingsley Solomon Free",
          customer_email: "kinxly@testemail.com",
          total_order: 1,
          total_sales: 17_085,
          total_views: 1,
          date: "2023-12-12T15:07:02.000000Z",
        },
      ],
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost:8000/api/customers?page=1",
        label: "1",
        active: true,
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false,
      },
    ],
    path: "http://localhost:8000/api/customers",
    per_page: 10,
    to: 1,
    total: 1,
  },
};
