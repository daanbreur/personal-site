"use client";

import React, { useEffect, useState } from "react";

const MY_TZ = "Europe/Amsterdam";

function tzParts(tz: string, d: Date) {
	const f = new Intl.DateTimeFormat("en-US", {
		timeZone: tz,
		hour12: false,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	const o: Record<string, number> = {};
	f.formatToParts(d).forEach((p) => {
		if (p.type !== "literal") o[p.type] = parseInt(p.value, 10);
	});
	return o;
}

// Offset of a timezone from UTC, in minutes, at the given instant.
function tzOffset(tz: string, d: Date) {
	const p = tzParts(tz, d);
	const asUTC = Date.UTC(
		p.year,
		p.month - 1,
		p.day,
		p.hour === 24 ? 0 : p.hour,
		p.minute,
		p.second
	);
	return (asUTC - d.getTime()) / 60000;
}

function hhmm(tz: string, d: Date) {
	const p = tzParts(tz, d);
	const pad = (n: number) => String(n === 24 ? 0 : n).padStart(2, "0");
	return `${pad(p.hour)}:${pad(p.minute)}`;
}

function amount(mins: number) {
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	if (h === 0) return `${m} minute${m !== 1 ? "s" : ""}`;
	if (m === 0) return `${h} hour${h !== 1 ? "s" : ""}`;
	return `${h}h ${m}m`;
}

type State =
	| { kind: "loading" }
	| { kind: "same"; time: string }
	| { kind: "diff"; phrase: string; mine: string; yours: string };

function compute(): State {
	const now = new Date();
	const yourTz = Intl.DateTimeFormat().resolvedOptions().timeZone || MY_TZ;
	// Round to whole minutes — raw offset math carries floating-point noise.
	const delta = Math.round(tzOffset(MY_TZ, now) - tzOffset(yourTz, now));

	if (delta === 0) {
		return { kind: "same", time: hhmm(MY_TZ, now) };
	}

	const phrase =
		delta > 0
			? `${amount(delta)} behind`
			: `${amount(Math.abs(delta))} ahead of`;

	return {
		kind: "diff",
		phrase,
		mine: hhmm(MY_TZ, now),
		yours: hhmm(yourTz, now),
	};
}

export default function LocalTime() {
	const [state, setState] = useState<State>({ kind: "loading" });

	useEffect(() => {
		const tick = () => setState(compute());
		tick();
		const timer = setInterval(tick, 1000);
		return () => clearInterval(timer);
	}, []);

	if (state.kind === "loading") {
		return <p className="font-mono text-sm text-muted">…</p>;
	}

	if (state.kind === "same") {
		return (
			<div>
				<p className="text-xl leading-snug">
					{/* Same timezone as me <span className="text-accent">✓</span> */}
					Same timezone as me
				</p>
				<p className="mt-3 font-mono text-sm text-muted">
					it&apos;s {state.time} for both of us
				</p>
			</div>
		);
	}

	return (
		<div>
			<p className="text-xl leading-snug">
				You&apos;re{" "}
				<span className="font-medium text-accent">{state.phrase}</span> me.
			</p>
			<p className="mt-3 font-mono text-sm text-muted">
				{state.mine} AMS · {state.yours} your time
			</p>
		</div>
	);
}
