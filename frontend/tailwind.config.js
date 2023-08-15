module.exports = {
  daisyui: {
		themes: ["light"] //only light theme
	},
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custOne': ' 0.18rem 0.18rem 1rem rgb(95, 94, 94)',
        'custTwo': ' 2px 2px 2px rgba(0,0,0,0)',
      },
     
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require("daisyui")
  ],
}
