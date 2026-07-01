import type { Config } from "tailwindcss";

const config: Config = {
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
    },
  },
  safelist: [
    "border-green-500/40",
    "bg-green-500/10",
    "border-yellow-500/40",
    "bg-yellow-500/10",
    "border-red-500/40",
    "bg-red-500/10",
  ],
  plugins: [],
};
export default config;
