/** @type {import('tailwindcss').Config} */
module.exports = {
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
        black: "var(--foreground)",
        white: "var(--white-smoke)",
        dark: "var(--ebony)",
        medium: "var(--ecru)",
        accent: "var(--redwood)",
        secondary: "var(--blue-munsell)",
      },
      fontSize: {
        normal: "var(--text)",
        emphasize: "var(--emphasize)",
        "sub-subtitle": "var(--sub-subtitle)",
        subtitle: "var(--subtitle)",
        title: "var(--title)",
        "big-title": "var(--big-title)",
      },
      spacing: {
        "3xs": "var(--space-3xs)",
        "2xs": "var(--space-2xs)",
        xs: "var(--space-xs)",
        s: "var(--space-s)",
        m: "var(--space-m)",
        l: "var(--space-l)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
      },
    },
  },
  plugins: [],
};
