/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./node_modules/flowbite/**/*.js",
	],
	prefix: "",
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["montserrat", "serif"],
				poppins: ["pop"],
				roboto: ["Roboto"],
				overpass: ["Overpass"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				fadeSlideDown: {
					"0%": { opacity: "0", transform: "translateY(-4rem)" },
					"100%": { opacity: "1", transform: "none" },
				},
				rotateUp: {
					"100%": { transform: "rotateZ(-4deg)" },
				},
				popIn: {
					"0%": { opacity: "0", transform: "translateY(-4rem) scale(0.8)" },
					"100%": { opacity: "1", transform: "none" },
				},
				flipText: {
					"0%": { transform: "rotateX(0deg)" },
					"50%": { transform: "rotateX(180deg)" },
					"100%": { transform: "rotateX(0deg)" },
				},
				downArrow: {
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				pulse: {
					"0%, 100%": { opacity: "1", transform: "scale(1)" },
					"50%": { opacity: "0.8", transform: "scale(0.8)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				fadeSlideDown:
					"fadeSlideDown 2s 0.5s cubic-bezier(0, 0.5, 0, 1) forwards",
				rotateUp: "rotateUp 0.5s 0.5s cubic-bezier(0, 0.5, 0, 1) forwards",
				popIn: "popIn 0.6s cubic-bezier(0, 0.9, 0.3, 1.2) forwards",
				flipText: "flipText 1s ease-in-out forwards 5s",
				downArrow:
					"downArrow 2s 2s cubic-bezier(0.075, 0.82, 0.165, 1) forwards, pulse 1.5s ease-in-out 3s infinite",
			},
		},
	},
};
