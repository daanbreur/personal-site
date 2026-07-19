"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getStoredTheme, setTheme } from "./theme";

const DynamicThemeSwitcher = dynamic(() => import("./ThemeSwitcher"), {
	ssr: false,
});

const UNLOCK_CLICKS = 5;

function Navbar() {
	const clicks = useRef(0);
	const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [toast, setToast] = useState<string | null>(null);

	const showToast = (msg: string) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2600);
	};

	const onLogoClick = () => {
		clicks.current += 1;
		if (resetTimer.current) clearTimeout(resetTimer.current);
		resetTimer.current = setTimeout(() => {
			clicks.current = 0;
		}, 1200);

		if (clicks.current >= UNLOCK_CLICKS) {
			clicks.current = 0;
			const current = getStoredTheme();
			if (current === "phosphor") {
				setTheme("dark");
				showToast("phosphor mode off");
			} else {
				setTheme("phosphor");
				showToast("phosphor mode unlocked ▚");
			}
		}
	};

	return (
		<nav className="w-full px-4 py-4 sm:px-6">
			<div className="mx-auto flex max-w-6xl items-center">
				<button
					type="button"
					onClick={onLogoClick}
					title="dnbr"
					aria-label="Home"
					className="mr-auto font-mono text-xl font-bold tracking-tight text-text transition-colors hover:text-accent"
				>
					dnbr<span className="text-accent">.</span>
				</button>
				<DynamicThemeSwitcher />
			</div>

			{toast && (
				<div
					role="status"
					className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-border bg-panel px-4 py-2 font-mono text-sm text-accent shadow-lg"
				>
					{toast}
				</div>
			)}
		</nav>
	);
}
export default Navbar;
