/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("portrait", "@media (orientation: portrait)");
      addVariant("landscape", "@media (orientation: landscape)");
    },
  ],
};
