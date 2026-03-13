export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#C8873A',
          light: '#E0A85C',
          dark: '#9E6020',
          subtle: '#3A2710',
        },
        surface: {
          base: '#1A1209',
          elevated: '#231A0E',
          high: '#2E2114',
          invert: '#F5EFE6',
        },
        ink: {
          primary: '#F5EFE6',
          secondary: '#C4B49A',
          muted: '#7A6A55',
          invert: '#1A1209',
        },
        border: {
          DEFAULT: '#3A2C1A',
          strong: '#5C4530',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.0' }],
        'display-lg': ['48px', { lineHeight: '1.1' }],
        'display-md': ['36px', { lineHeight: '1.15' }],
        'display-sm': ['24px', { lineHeight: '1.2' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.7' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'body-xs': ['12px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        DEFAULT: '2px',
        card: '4px',
        pill: '9999px',
      },
      transitionTimingFunction: {
        'ease-luxury': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '900': '900ms',
      },
    },
  },
  plugins: [],
};
