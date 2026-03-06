const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      fontFamily: {
        // Map the CSS variables defined in layout.tsx
        arimo: ['var(--font-arimo)', 'sans-serif'],
        public_sans : ['var(--font-public-sans', 'sans-serif']
      },
    },
  }
};

export default config;
