import type { Config } from "tailwindcss";

// Paleta y tipografía oficiales del Manual de Identidad Visual PBH (v1),
// importado desde Claude Design. Colores institucionales: Marino, Azul Barça,
// Grana, Oro Habana y Blanco Hueso — ver sección 08 del manual para Pantone/CMYK.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blau: {
          DEFAULT: "#1D4D91", // Azul Barça · Pantone 293 C
          light: "#3C6AAE",
          dark: "#163B6E",
        },
        grana: {
          DEFAULT: "#9C1C3A", // Grana · Pantone 201 C
          light: "#B8324F",
          dark: "#701429",
        },
        dorado: {
          DEFAULT: "#F0B429", // Oro Habana · Pantone 1235 C
          light: "#F5C55C",
          dark: "#B8860B",
        },
        tinta: {
          DEFAULT: "#142C54", // Marino Institucional · Pantone 289 C
          light: "#1D3A6B",
        },
        hueso: "#FAF6EE", // Blanco Hueso · Pantone 11-0107 TCX
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        eyebrow: ["var(--font-eyebrow)", "sans-serif"],
      },
      backgroundImage: {
        "blaugrana-gradient":
          "linear-gradient(135deg, #9C1C3A 0%, #142C54 55%, #1D4D91 100%)",
        "gold-gradient": "linear-gradient(135deg, #F5C55C 0%, #F0B429 50%, #B8860B 100%)",
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0,0,0,0.25)",
        gold: "0 8px 24px -6px rgba(237,187,0,0.45)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
