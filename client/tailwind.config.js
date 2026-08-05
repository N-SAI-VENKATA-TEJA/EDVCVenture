/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          color: '#024ed4',
          'dark-blue': '#004cd3',
          'light-blue': '#327afa',
          'blue-50': '#f4f8fc',
          'blue-100': '#e0e7f5',
          white: '#ffffff',
          black: '#000000',
          'neutral-lighter': '#909090',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        input: '0 0 0 1px #0000001a, 0 1px 3px #0000001a',
        elevated: '0 19px 16px -4px #10182826, 0 8px 25px -2px #0d101440',
        ambient: '0 105px 29px #0000, 0 67px 27px #00000003, 0 38px 23px #00000005, 0 17px 17px #00000008, 0 4px 9px #00000008',
        glow: '0 213.54px 59.43px #0a438000, 0 135.98px 54.39px #0a438003, 0 76.55px 46.33px #0a43800d, 0 34.24px 34.24px #0a438017, 0 8.05px 19.13px #0a43801a',
      },
      borderRadius: {
        pill: '40px',
        lg: '24px',
        md: '20px',
        sm: '12px',
        xs: '8px',
      },
    },
  },
  plugins: [],
}
