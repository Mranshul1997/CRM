/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';


export default  {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx,mdx,tsx,ts}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        'h1': '48px',
        'h2': '32px',
        'h3': '28px',
        'h4': '24px',
        'h5': '20px',
        'xl': '20px',
        'l': '18px',
        'm': '16px',
        's': '14px',
        'xs': '12px',
        '1xs': '10px',
      },
      fontFamily : {
        'b' : ['Inter', 'sans-serif'], // body
        'h' : ['Inter', 'sans-serif'], // heading
      },
      colors: {
        neutral: {
          0: '#FFF',
          10: '#FCFCFE',
          20: '#F7F9FB',
          30: '#F0F2F7',
          40: '#E8ECF3',
          50: '#E1E5EF',
          60: '#D9DFEB',
          70: '#A3A7B0',
          80: '#6D7076',
          90: '#36383B',
          100: '#0000',
        },
        red: {
          100: '#230F0F',
          90: '#461E1E',
          80: '#6D7076',
          70: '#8C3C3C',
          60: '#D9DFEB',
          50: '#BF6F6F',
          40: '#CF9393',
          30: '#DFB7B7',
          20: '#EFDBDB',
          10: '#F7EDED',
        },
        orange: {
          100: '#2A1C0C',
          90: '#543918',
          80: '#7E5525',
          70: '#A87231',
          60: '#D28E3D',
          50: '#DBA564',
          40: '#E4BB8B',
          30: '#EDD2B1',
          20: '#F6E8D8',
          10: '#FBF4EC',
        },
        lime: {
          100: '#232206',
          90: '#47440C',
          80: '#6A6711',
          70: '#8E8917',
          60: '#B1AB1D',
          50: '#C1BC4A',
          40: '#D0CD77',
          30: '#E0DDA5',
          20: '#EFEED2',
          10: '#F7F7E8',
        },
        purple: {
          100: '#1E0F23',
          90: '#3C1E46',
          80: '#592D69',
          70: '#773C8C',
          60: '#954BAF',
          50: '#AA6FBF',
          40: '#BF93CF',
          30: '#D5B7DF',
          20: '#EADBEF',
          10: '#F4EDF7',
        },
        green: {
          100: '#122015',
          90: '#233F29',
          80: '#233F29',
          70: '#467E52',
          60: '#589E67',
          50: '#79B185',
          40: '#9BC5A4',
          30: '#BCD8C2',
          20: '#DEECE1',
          10: '#EEF5F0',
        },
        irish: {
          100: '#121320',
          90: '#23263F',
          80: '#35395F',
          70: '#464C7E',
          60: '#585F9E',
          50: '#797FB1',
          40: '#9B9FC5',
          30: '#BCBFD8',
          20: '#DEDFEC',
          10: '#EEEFF5',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],

};
