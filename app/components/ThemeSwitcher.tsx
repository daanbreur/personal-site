"use client";

import React, { useEffect, useState } from "react";
import { getStoredTheme, setTheme, THEME_EVENT, Theme } from "./theme";

function ThemeSwitcher() {
	// This component is client-only (loaded via dynamic ssr:false), so it's
	// safe to read the stored theme directly in the initializer.
	const [theme, setThemeState] = useState<Theme>(getStoredTheme);

	useEffect(() => {
		const onChange = (e: Event) => {
			setThemeState((e as CustomEvent<Theme>).detail);
		};
		window.addEventListener(THEME_EVENT, onChange);
		return () => window.removeEventListener(THEME_EVENT, onChange);
	}, []);

	const toggle = () => {
		// Toggle between light and dark. Phosphor is easter-egg only, so
		// touching the switch drops back to a normal theme.
		const next: Theme = theme === "light" ? "dark" : "light";
		setTheme(next);
		setThemeState(next);
	};

	const isLight = theme === "light";

	return (
		<button
			type="button"
			onClick={toggle}
			title={isLight ? "Switch to dark" : "Switch to light"}
			aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
			className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
		>
			{isLight ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
					className="h-[18px] w-[18px]"
				>
					<path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 256 256"
					className="h-[18px] w-[18px]"
				>
					<path d="M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z" />
				</svg>
			)}
		</button>
	);
}
export default ThemeSwitcher;
