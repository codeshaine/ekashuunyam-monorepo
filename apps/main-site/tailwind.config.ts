import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'var(--font-geist-sans)',
					...fontFamily.sans
				],
				sayyeda: ["Sayyeda", "sans-serif"],
				heart: ["Always In My Heart", "cursive"],
				playfair: ["PlayFair", "serif"],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				'c-50': '#DADADA',
				'c-100': '#450a0a',
				'c-150': '#f5898930',
				'c-200': '#F5EDE7',
				'c-250': '#e9dbcf'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
