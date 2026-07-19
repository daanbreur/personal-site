export type Theme = "light" | "dark" | "phosphor";

export const THEME_EVENT = "themechange";

export function applyTheme(theme: Theme) {
	const classes = document.documentElement.classList;
	classes.remove("dark", "phosphor");
	if (theme === "dark") classes.add("dark");
	if (theme === "phosphor") classes.add("phosphor");
}

export function getStoredTheme(): Theme {
	if (typeof window === "undefined") return "dark";
	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark" || stored === "phosphor") {
		return stored;
	}
	return window.matchMedia("(prefers-color-scheme: light)").matches
		? "light"
		: "dark";
}

export function setTheme(theme: Theme) {
	window.localStorage.setItem("theme", theme);
	applyTheme(theme);
	window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}
