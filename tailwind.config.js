// eslint-disable-next-line no-undef
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		colors: {
			orange: "#FEA013",
			"orange-muted": "#69563A",
			hover: "#BA4A0C",
			red: "#D23131",
			heading: "#F8F8F8",
			normal: "#CBCBCB",
			muted: "#999999",
			disabled: "#707070",
			dark: "#222222",
			veryDark: "#111111",
		},
		fontFamily: {
			sans: ["Graphik", "sans-serif"],
			serif: ["Merriweather", "serif"],
		},
		extend: {
			spacing: {
				128: "32rem",
				144: "36rem",
			},
			borderRadius: {
				"4xl": "2rem",
			},
		},
	},
	plugins: [
		// eslint-disable-next-line no-undef
		// require("@tailwindcss/custom-forms"),
	],
};
