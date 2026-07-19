"use client";

import React, { useEffect, useRef, useState } from "react";

const BORN_YEAR = 2005;
const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;
const DAY = 86400000;
const TZ = "Europe/Amsterdam";
const COUNTDOWN_WINDOW = 48 * 3600000; // 48h

function tzParts(ts: number) {
	const f = new Intl.DateTimeFormat("en-US", {
		timeZone: TZ,
		hour12: false,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	const o: Record<string, number> = {};
	f.formatToParts(new Date(ts)).forEach((p) => {
		if (p.type !== "literal") o[p.type] = parseInt(p.value, 10);
	});
	return o;
}

function tzOffsetMin(ts: number) {
	const p = tzParts(ts);
	const asUTC = Date.UTC(
		p.year,
		p.month - 1,
		p.day,
		p.hour === 24 ? 0 : p.hour,
		p.minute,
		p.second
	);
	return (asUTC - ts) / 60000;
}

// Midnight (00:00) of the given Amsterdam calendar date, as a UTC timestamp.
function amsMidnight(year: number, month1: number, day: number) {
	const guess = Date.UTC(year, month1 - 1, day, 0, 0, 0);
	return guess - tzOffsetMin(guess) * 60000;
}

const BIRTH = amsMidnight(BORN_YEAR, 10, 3);

const pad = (n: number) => String(n).padStart(2, "0");

function fmtCountdown(diff: number) {
	if (diff < 0) diff = 0;
	const d = Math.floor(diff / DAY);
	diff -= d * DAY;
	const h = Math.floor(diff / 3600000);
	diff -= h * 3600000;
	const m = Math.floor(diff / 60000);
	diff -= m * 60000;
	const s = Math.floor(diff / 1000);
	return (d > 0 ? d + "d " : "") + pad(h) + ":" + pad(m) + ":" + pad(s);
}

export default function BirthdayCountdown() {
	const [now, setNow] = useState<number | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const tick = () => setNow(Date.now());
		tick();
		const timer = setInterval(tick, 100);
		return () => clearInterval(timer);
	}, []);

	let isBirthday = false;
	let content: React.ReactNode;

	if (now === null) {
		content = <p className="font-mono text-sm text-muted">Loading…</p>;
	} else {
		const ap = tzParts(now);
		isBirthday = ap.month === 10 && ap.day === 3;
		const thisTarget = amsMidnight(ap.year, 10, 3);
		const target = now < thisTarget ? thisTarget : amsMidnight(ap.year + 1, 10, 3);
		const turning = (now < thisTarget ? ap.year : ap.year + 1) - BORN_YEAR;
		const diff = target - now;

		if (isBirthday) {
			content = (
				<div>
					<p className="text-3xl font-bold leading-none">
						<span className="text-accent">{ap.year - BORN_YEAR}</span> today 🎂
					</p>
					<p className="mt-2 text-accent-soft">happy birthday, me</p>
				</div>
			);
		} else if (diff <= COUNTDOWN_WINDOW) {
			content = (
				<div>
					<p className="text-muted">
						Turning <span className="text-accent">{turning}</span> in
					</p>
					<p className="mt-1 font-mono text-2xl font-medium text-accent">
						{fmtCountdown(diff)}
					</p>
				</div>
			);
		} else {
			const [whole, dec] = ((now - BIRTH) / YEAR_MS).toFixed(9).split(".");
			content = (
				<div>
					<p className="font-mono leading-none">
						<span className="text-3xl font-medium text-accent">{whole}</span>
						<span className="text-xl text-accent">.</span>
						<span className="text-lg text-muted">{dec}</span>
					</p>
					<p className="mt-2 text-sm text-muted">years old, give or take</p>
				</div>
			);
		}
	}

	// Confetti on the day. Draws into a canvas that fills the whole card
	// (the parent BentoCard is already `relative` + `overflow-hidden`).
	useEffect(() => {
		if (!isBirthday) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const COLORS = ["#cf6fd0", "#e6c3e8", "#e0b64f", "#63d2a6", "#f6eef7"];
		let bits: any[] = [];
		let raf = 0;
		let running = true;

		const resize = () => {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
		};
		resize();

		const frame = () => {
			if (!running) return;
			while (bits.length < 26) {
				bits.push({
					x: Math.random() * canvas.width,
					y: -8 - Math.random() * canvas.height,
					vx: (Math.random() - 0.5) * 0.6,
					vy: 1 + Math.random() * 2,
					size: 3 + Math.random() * 4,
					rot: Math.random() * 6,
					vr: (Math.random() - 0.5) * 0.25,
					color: COLORS[(Math.random() * COLORS.length) | 0],
					rect: Math.random() < 0.55,
				});
			}
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (const p of bits) {
				p.x += p.vx;
				p.y += p.vy;
				p.rot += p.vr;
				if (p.y > canvas.height + 10) {
					p.y = -8;
					p.x = Math.random() * canvas.width;
				}
				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rot);
				ctx.fillStyle = p.color;
				if (p.rect) ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
				else {
					ctx.beginPath();
					ctx.arc(0, 0, p.size / 2, 0, 7);
					ctx.fill();
				}
				ctx.restore();
			}
			raf = requestAnimationFrame(frame);
		};
		raf = requestAnimationFrame(frame);
		window.addEventListener("resize", resize);

		return () => {
			running = false;
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
		};
	}, [isBirthday]);

	return (
		<>
			{isBirthday && (
				<>
					<canvas
						ref={canvasRef}
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 z-0 h-full w-full"
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 z-0 rounded-xl"
						style={{
							boxShadow:
								"inset 0 0 0 1px var(--accent), inset 0 0 30px -8px var(--accent)",
						}}
					/>
				</>
			)}
			<div className="relative z-10">{content}</div>
		</>
	);
}
