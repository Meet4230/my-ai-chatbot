import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sora: ["var(--font-sora)"],
      },
      fontSize: {
        "display-heading": ["80px", { lineHeight: "1.1" }],
        "heading-1": ["72px", { lineHeight: "1.1" }],
        "heading-2-60": ["60px", { lineHeight: "1.2" }],
        "heading-2-40": ["40px", { lineHeight: "1.4" }],
        "heading-2-bold": ["40px", { lineHeight: "1.2" }],
        "heading-3": ["32px", { lineHeight: "1.4" }],
        "heading-4": ["24px", { lineHeight: "1.4" }],
        "heading-5": ["18px", { lineHeight: "1.4" }],
        "heading-6": ["16px", { lineHeight: "1.4" }],
        "body-20-regular": ["20px", { lineHeight: "1.7" }],
        "body-18-medium": ["18px", { lineHeight: "1.7" }],
        "body-18-regular": ["18px", { lineHeight: "1.7" }],
        "body-18-light": ["18px", { lineHeight: "1.7" }],
        "body-16-bold": ["16px", { lineHeight: "1.7" }],
        "body-16-medium": ["16px", { lineHeight: "1.7" }],
        "body-16-regular": ["16px", { lineHeight: "1.8" }],
        "body-16-light": ["16px", { lineHeight: "1.7" }],
      },
    },
    colors: {
      neutrel: {
        1: "#171717",
        2: "#333333",
        3: "#4F4F4F",
        4: "#828282",
        5: "#BDBDBD",
        6: "#E0E0E0",
        7: "#F2F2F2",
      },
      primary: {
        1: "#FF0000",
        2: "#FF0000",
        3: "#FF0000",
        4: "#FF0000",
        5: "#FF0000",
        6: "#FF0000",
        7: "#FF0000",
        8: "#FF0000",
        9: "#FF0000",
      },
    },
  },
  plugins: [],
} satisfies Config;
