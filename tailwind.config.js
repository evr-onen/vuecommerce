module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF233C',
        secondary: '#3BC9DB',
        warning: '#EFB657',
        info: '#E9ECEF',
        danger: '#F03E3E',
        review: '#FFD43B',
        succes: '#12B886',
        body: '#fff',
        text: '#212529',
        textBlur: '#c2c2d3',
        description: '#868E96',
        formBorder: '#CED4DA',
        formActive: '#ebedf0',
        formPlaceholder: '#ADB5BD',
        linkHover: '#7A9FDD',
        dashHover: '#f8f8f8',
        dashBody: '#F7F6F9',
        dashText: '#5d596c',
        dashTitleBg: '#f4f4f5',
        dashTextSecondary: '#5d596c',
        menuHover: '#FEF4F6'
      }
    },
    fontFamily: {
      sans: ['Cinzel', 'serif'],
      serif: ['Krub', 'sans-serif'],
      Krub: ['Krub', 'sans-serif'],
      Cinzel: ['Cinzel', 'serif'],
      admin: ['Public Sans', 'sans-serif']
    }
  },
  corePlugins: {
    preflight: true
  },
  plugins: []
}
