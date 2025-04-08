/* eslint-disable unicorn/prefer-module */
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        active: "0px 0px 0px 2px #6D5DD380",
        spread: "0px 1px 18px 0px #0A39B01F",
        neob: "8px 8px 0px 0px #000000",
        sneob: "4px 4px 0px 0px #000000",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "chart-1": "hsl(var(--chart-1))",
        "chart-2": "hsl(var(--chart-2))",
        "chart-3": "hsl(var(--chart-3))",
        "chart-4": "hsl(var(--chart-4))",
        "chart-5": "hsl(var(--chart-5))",
        white: "hsl(var(--white))",
        black: "hsl(var(--black))",
        "high-purple": "hsl(var(--high-purple))",
        "mid-purple": "hsl(var(--mid-purple))",
        "low-purple": "hsl(var(--low-purple))",
        "high-coral": "hsl(var(--high-coral))",
        "mid-coral": "hsl(var(--mid-coral))",
        "low-coral": "hsl(var(--low-coral))",
        "high-danger": "hsl(var(--high-danger))",
        "mid-danger": "hsl(var(--mid-danger))",
        "low-danger": "hsl(var(--low-danger))",
        "high-warning": "hsl(var(--high-warning))",
        "mid-warning": "hsl(var(--mid-warning))",
        "low-warning": "hsl(var(--low-warning))",
        "high-success": "hsl(var(--high-success))",
        "mid-success": "hsl(var(--mid-success))",
        "low-success": "hsl(var(--low-success))",
        "high-grey-III": "hsl(var(--high-grey-III))",
        "high-grey-II": "hsl(var(--high-grey-II))",
        "high-grey-I": "hsl(var(--high-grey-I))",
        "mid-grey-III": "hsl(var(--mid-grey-III))",
        "mid-grey-II": "hsl(var(--mid-grey-II))",
        "mid-grey-I": "hsl(var(--mid-grey-I))",
        "low-grey-III": "hsl(var(--low-grey-III))",
        "low-grey-II": "hsl(var(--low-grey-II))",
        "low-grey-I": "hsl(var(--low-grey-I))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        nr: ["var(--font-newsreader)"],
      },
      fontSize: {
        h1: ["2.25rem", { fontWeight: "900" }], // 36px
        "h1-sm": ["2.5rem", { fontWeight: "900" }], // 40px
        "h1-md": ["4.5rem", { fontWeight: "900" }], // 72px

        h2: ["2rem", { fontWeight: "900" }], // 32px
        "h2-sm": ["2.25rem", { fontWeight: "900" }], // 36px
        "h2-md": ["2.5rem", { fontWeight: "900" }], // 40px

        h3: ["1.75rem", { fontWeight: "700" }], // 28px
        "h3-sm": ["2rem", { fontWeight: "700" }], // 32px
        "h3-md": ["2.25rem", { fontWeight: "700" }], // 36px

        h4: ["1.5rem", { fontWeight: "700" }], // 24px
        "h4-sm": ["1.75rem", { fontWeight: "700" }], // 28px
        "h4-md": ["2rem", { fontWeight: "700" }], // 32px

        h5: ["1.25rem", { fontWeight: "500" }], // 20px
        "h5-sm": ["1.5rem", { fontWeight: "500" }], // 24px
        "h5-md": ["1.75rem", { fontWeight: "500" }], // 28px

        h6: ["1rem", { fontWeight: "500" }], // 16px
        "h6-sm": ["1.25rem", { fontWeight: "500" }], // 20px
        "h6-md": ["1.5rem", { fontWeight: "500" }], // 24px
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
        },
        shimmer: {
          from: {
            transform: "translateX(-120%)",
          },
          to: {
            transform: "translateX(120%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-in-out",
        "fade-out": "fade-out 0.3s ease-in-out",
        shimmer: "shimmer 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@mertasan/tailwindcss-variables")],
} satisfies Config;

export default config;
