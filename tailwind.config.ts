import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  // darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-up": "slideUp 0.3s ease-out forwards",
      },
      keyframes: {
        slideUp: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      fontFamily: {
        bricolage: ["var(--font-bricolage)"],
        geist: ["var(--font-geist)"],
        geistMono: ["var(--font-geist-mono)"],
      },
      fontWeight: {
        "grotesk-regular": "400",
        "grotesk-medium": "500",
        "grotesk-bold": "700",
        "grotesk-extrabold": "800",
        "grotesk-black": "900",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#690BB7",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E91E5F",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#00AA52",
          foreground: "#FFFFFF",
        },
        tertiary: {
          DEFAULT: "#FF9500",
          foreground: "#FFFFFF",
        },
        darker: {
          DEFAULT: "#041827",
          foreground: "#FFFFFF",
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
      screens: {
        "landscape-md": {
          raw: "(orientation: landscape) and (max-width: 1550px)",
        },
        // "tablet": {
        //   raw: "(min-width: 768px)",
        // },
        // "custom-tablet": {
        //   "min": "768px",
        //   "max": "1024px"
        // }
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
