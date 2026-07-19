"use client";

import { useEffect } from "react";

// Prints once per page load (guards against React StrictMode's double-invoke).
let printed = false;

// Easter egg: a styled banner for anyone who opens the dev console.
export default function ConsoleBanner() {
	useEffect(() => {
		if (printed) return;
		printed = true;

		const accent = "color:#cf6fd0";
		const accentBold = "color:#cf6fd0;font-weight:700";
		const green = "color:#63d2a6;font-weight:700";
		const soft = "color:#e6c3e8";
		const muted = "color:#a98fab";
		const text = "color:#f6eef7";
		const hash = process.env.NEXT_PUBLIC_COMMIT_HASH;

		console.log(
			"%cdaan@systems%c:%c~%c$ whoami",
			green,
			muted,
			accent,
			text
		);
		console.log(
			"%c› %cDaan Breur %c— software developer & hacker",
			accent,
			text + ";font-weight:700",
			muted
		);
		console.log(
			"%c› you found the console. nice. %creach me → daan@daanbreur.systems",
			muted,
			soft
		);
		console.log("%c› build %c#" + hash, muted, accentBold);
	}, []);

	return null;
}
