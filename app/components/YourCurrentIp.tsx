"use client";

import React, { useEffect, useState } from "react";

async function fetchIp(url: string): Promise<string | null> {
	try {
		const ctrl = new AbortController();
		const timeout = setTimeout(() => ctrl.abort(), 6000);
		const res = await fetch(url, { signal: ctrl.signal });
		clearTimeout(timeout);
		if (!res.ok) return null;
		const text = (await res.text()).trim();
		return text || null;
	} catch (e) {
		return null;
	}
}

export default function YourCurrentIp() {
	const [v4, setV4] = useState<string | null>(null);
	const [v6, setV6] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		Promise.all([
			fetchIp("https://ipv4.ident.me/"),
			fetchIp("https://ipv6.ident.me/"),
		]).then(([ip4, ip6]) => {
			if (cancelled) return;
			setV4(ip4);
			setV6(ip6);
			setLoading(false);
		});

		return () => {
			cancelled = true;
		};
	}, []);

	const rows = [
		{ label: "IPv4", value: v4 },
		{ label: "IPv6", value: v6 },
	].filter((row): row is { label: string; value: string } => Boolean(row.value));

	return (
		<div>
			{loading ? (
				<p className="font-mono text-lg text-muted">resolving…</p>
			) : rows.length === 0 ? (
				<p className="font-mono text-lg text-muted">unavailable</p>
			) : rows.length === 1 ? (
				<p
					className={`break-all font-mono font-medium text-accent ${
						rows[0].value.includes(":") ? "text-xl" : "text-2xl"
					}`}
				>
					{rows[0].value}
				</p>
			) : (
				<div className="space-y-3">
					{rows.map((row) => (
						<div key={row.label}>
							<span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.15em] text-muted">
								{row.label}
							</span>
							<p className="break-all font-mono text-base font-medium text-accent">
								{row.value}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
