/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // GitHub-inspired color palette
      colors: {
        // Canvas (backgrounds)
        canvas: {
          default: '#0d1117',
          subtle: '#161b22',
          inset: '#010409',
        },
        // Neutral colors
        neutral: {
          emphasis: '#6e7681',
          muted: '#484f58',
          subtle: '#21262d',
        },
        // Accent colors
        accent: {
          emphasis: '#1f6feb',
          muted: '#388bfd',
          subtle: '#0969da',
        },
        // Success
        success: {
          emphasis: '#2ea043',
          muted: '#238636',
          subtle: '#1a7f37',
        },
        // Danger
        danger: {
          emphasis: '#f85149',
          muted: '#da3633',
          subtle: '#cf222e',
        },
        // Warning
        attention: {
          emphasis: '#d29922',
          muted: '#bf8700',
          subtle: '#9a6700',
        },
        // Border
        border: {
          default: '#30363d',
          muted: '#21262d',
          subtle: '#21262d',
        },
        // Text
        fg: {
          default: '#e6edf3',
          muted: '#7d8590',
          subtle: '#6e7681',
          onEmphasis: '#ffffff',
        },
      },
      // Typography
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      // Spacing
      spacing: {
        '4xs': '2px',
        '3xs': '4px',
        '2xs': '8px',
        'xs': '12px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '40px',
        '2xl': '48px',
        '3xl': '64px',
      },
      // Border radius
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      // Shadows (GitHub style)
      boxShadow: {
        'sm': '0 0 transparent, 0 0 transparent, 0 1px 0 rgba(27,31,36,0.04)',
        'md': '0 3px 6px rgba(140,149,159,0.15)',
        'lg': '0 8px 24px rgba(140,149,159,0.2)',
        'xl': '0 12px 28px rgba(140,149,159,0.25)',
      },
    },
  },
  plugins: [],
}
