/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: "#080B16",
          deep: "#04060B",
          surface: "rgba(13, 19, 36, 0.75)",
          glass: "rgba(255, 255, 255, 0.04)",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(54, 120, 229, 0.4)",
        },
        cosmic: {
          blue: "#3678E5",
          violet: "#8B5CF6",
          cyan: "#06B6D4",
          indigo: "#6366F1",
          gold: "#F59E0B",
          emerald: "#10B981",
        },
        slate: {
          light: "#F8FAFC",
          muted: "#94A3B8",
          dim: "#64748B",
        }
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(ellipse at top, #141c33 0%, #080B16 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'card-glow': 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(54, 120, 229, 0.12), transparent 40%)',
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(54, 120, 229, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}

