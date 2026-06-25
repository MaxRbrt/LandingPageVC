/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Anton"', "sans-serif"],
        sans: ['"Inter"', "sans-serif"],
        signature: ['"Great Vibes"', "cursive"],
      },
      colors: {
        ink: {
          900: "#0B0B0D", // fundo principal
          800: "#121214", // fundo alternado
          700: "#151515", // superfície / cards
          600: "#1d1d20", // card hover
          500: "#26262b", // bordas claras
        },
        blood: {
          DEFAULT: "#E30613", // vermelho principal
          600: "#c10310",
          700: "#9c020c",
        },
        cream: "#F4EEDC", // off-white quente
        ash: "#8E8E8E", // cinza secundário
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        aurora: {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-8%,0) scale(1.15)" },
          "66%": { transform: "translate3d(-6%,6%,0) scale(0.92)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 28s linear infinite",
        "gradient-pan": "gradient-pan 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        shimmer: "shimmer 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
