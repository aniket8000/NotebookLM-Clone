module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#22d3ee'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(2,6,23,0.08)'
      }
    }
  },
  plugins: []
}
