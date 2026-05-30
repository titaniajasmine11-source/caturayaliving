import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1C1A17",
          dark: "#121110",
          neutral: "#2C2925",
        },
        accent: {
          DEFAULT: "#A8753D",
          hover: "#C08B51",
          light: "#FAF8F5",
          cream: "#F3EFE9",
        },
        neutral: {
          text: "#4E463E",
          muted: "#7E7467",
        },
        border: {
          DEFAULT: "rgba(28, 26, 23, 0.08)",
          hover: "rgba(28, 26, 23, 0.16)",
          premium: "#E6E0D8",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slow-zoom": "slowZoom 20s ease-out infinite alternate",
        "pulse-subtle": "pulseSubtle 2s infinite ease-in-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowZoom: {
          "0%": { transform: "scale(1.0)" },
          "100%": { transform: "scale(1.1)" },
        },
        pulseSubtle: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 10px 25px -5px rgba(168, 117, 61, 0.4)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 15px 30px -5px rgba(168, 117, 61, 0.6)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
