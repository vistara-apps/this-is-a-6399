/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(262, 83%, 58%)',
        bg: 'hsl(240, 10%, 4%)',
        surface: 'hsl(240, 10%, 8%)',
        text: 'hsl(0, 0%, 98%)',
        'text-muted': 'hsl(240, 5%, 64%)',
        accent: 'hsl(24, 95%, 53%)',
        'okb-blue': 'hsl(210, 100%, 50%)',
        success: 'hsl(142, 76%, 36%)',
        warning: 'hsl(38, 92%, 50%)',
        error: 'hsl(0, 84%, 60%)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '20px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
        '2xl': '48px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(262, 83%, 58%, 0.12)',
        'glow': '0 0 40px hsla(210, 100%, 50%, 0.3)',
        'hover': '0 12px 32px hsla(262, 83%, 58%, 0.18)',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}