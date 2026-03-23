export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          light: 'rgb(var(--color-brand-light) / <alpha-value>)',
          dark: 'rgb(var(--color-brand-dark) / <alpha-value>)',
          subtle: 'rgb(var(--color-brand-subtle) / <alpha-value>)',
        },
        surface: {
          base: 'rgb(var(--color-bg-base) / <alpha-value>)',
          elevated: 'rgb(var(--color-bg-surface) / <alpha-value>)',
          high: 'rgb(var(--color-bg-elevated) / <alpha-value>)',
          invert: 'rgb(var(--color-bg-invert) / <alpha-value>)',
        },
        ink: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          invert: 'rgb(var(--color-text-invert) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          strong: 'rgb(var(--color-border-strong) / <alpha-value>)',
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
        DEFAULT: '10px',
        sm: '12px',
        card: '16px',
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
      boxShadow: {
        velvet: '0 17px 56px rgba(20, 10, 6, 0.245)',
        glass: '0 13px 28px rgba(18, 8, 5, 0.196), inset 0 1px 0 rgba(255, 244, 231, 0.08)',
      },
      backdropBlur: {
        luxury: '18px',
      },
    },
  },
  plugins: [],
};
