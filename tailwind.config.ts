
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hzred: "#B91C1C",
        hzgold: "#D4AF37",
        hzblack: "#090909",
      },
    },
  },
  plugins: [],
};

export default config;
