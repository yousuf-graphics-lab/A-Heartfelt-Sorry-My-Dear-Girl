/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'petal-bg': '#FFF5F5',
        'blush': '#EFA6B6',
        'blush-light': '#F7CDD5',
        'deep-rose': '#C85B79',
        'romantic': '#A83D58',
        'romantic-dark': '#8C2E47',
        'cream': '#FFF9F0',
        'paper': '#FFFBEF',
        'ink': '#51343D',
        'ink-soft': '#6E4B56',
        'gold': '#D8B47A',
        'gold-deep': '#B98F4E',
        'lavender': '#B9A7D9',
        'lavender-deep': '#8F7BB8',
        'cream-2': '#FFF8EC',
        'paper-warm': '#FBF0DE',
        'paper-deep': '#F3E3CC',
        'ink-story': '#46303B',
        'ink-soft': '#6E4B56',
        'gold-light': '#F2CE8F',
        'sage': '#7FA08B',
        'sage-deep': '#55755F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['Caveat', '"Segoe Script"', 'cursive'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-xl': '0 24px 60px -18px rgba(81, 52, 61, 0.45)',
        'paper': '0 30px 70px -22px rgba(81, 52, 61, 0.55), 0 4px 14px rgba(81,52,61,0.12)',
        'glow-rose': '0 0 26px 4px rgba(239, 166, 182, 0.65)',
        'glow-gold': '0 0 30px 6px rgba(216, 180, 122, 0.55)',
      },
      backgroundImage: {
        'gold-line': 'linear-gradient(90deg, transparent, #D8B47A 22%, #F4E3C0 50%, #D8B47A 78%, transparent)',
      },
    },
  },
  plugins: [],
};
