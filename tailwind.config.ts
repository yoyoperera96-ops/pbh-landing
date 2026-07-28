import type { Config } from "tailwindcss";

// Paleta provisional inspirada en el escudo del FC Barcelona (blaugrana) + dorado
// conmemorativo del 30 aniversario. Sustituir por los valores exactos en cuanto
// llegue el Manual de Marca de la PBH (ver README > "Reemplazar assets de marca").
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
          DEFAULT: "#004D98",
          light: "#0A5FB4",
          dark: "#002B57",
        },
        grana: {
          DEFAULT: "#A50044",
          light: "#C2005A",
          dark: "#6E002D",
        },
        dorado: {
          DEFAULT: "#EDBB00",
          light: "#F5D460",
          dark: "#B38F00",
        },
        tinta: {
          DEFAULT: "#0B1220",
          light: "#141C2E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "blaugrana-gradient":
          "linear-gradient(135deg, #A50044 0%, #7A0038 25%, #002B57 55%, #004D98 100%)",
        "gold-gradient": "linear-gradient(135deg, #F5D460 0%, #EDBB00 50%, #B38F00 100%)",
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
