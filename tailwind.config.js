/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
	darkMode: "class",
	theme: {
		fontSize: {
			sm: "0.750rem",
			base: "1rem",
			lg: "1.125rem",
			xl: "1.333rem",
			"2xl": "1.777rem",
			"3xl": "2.369rem",
			"4xl": "3.158rem",
			"5xl": "4.210rem",
		},
		fontFamily: {
			sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
			heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
			body: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
			mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
		},
		fontWeight: {
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700",
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			text: "var(--text)",
			background: "var(--bg)",
			panel: "var(--panel)",
			"panel-2": "var(--panel-2)",
			border: "var(--border)",
			muted: "var(--muted)",
			primary: "var(--accent)",
			accent: "var(--accent)",
			"accent-soft": "var(--accent-soft)",
		},
		extend: {},
	},
	plugins: [],
};
