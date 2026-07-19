"use client";

import React, { useEffect, useState } from "react";

const USER = "daanbreur";
const CACHE_KEY = "gh-activity-v1";
const CACHE_TTL = 10 * 60 * 1000; // 10 min, due to the 60/hr rate limit

type Activity = {
	action: string;
	repo: string;
	repoFull: string;
	detail: string;
	ago: string;
} | null;
type Status = "loading" | "ok" | "unavailable";

function relTime(iso: string) {
	const diff = Date.now() - new Date(iso).getTime();
	const s = Math.floor(diff / 1000);
	const m = Math.floor(s / 60);
	const h = Math.floor(m / 60);
	const d = Math.floor(h / 24);
	const w = Math.floor(d / 7);
	const mo = Math.floor(d / 30);
	const y = Math.floor(d / 365);
	if (y > 0) return `${y}y ago`;
	if (mo > 0) return `${mo}mo ago`;
	if (w > 0) return `${w}w ago`;
	if (d > 0) return `${d}d ago`;
	if (h > 0) return `${h}h ago`;
	if (m > 0) return `${m}m ago`;
	return "just now";
}

// Turn a GitHub event into a short "verb + object" summary.
function describe(e: any): Activity {
	const repoFull = String(e.repo?.name ?? "");
	const repo = repoFull.split("/").pop() ?? repoFull;
	const p = e.payload ?? {};
	let action = "active in";
	let detail = "";

	switch (e.type) {
		case "PushEvent": {
			const commits = p.commits ?? [];
			action = "pushed to";
			detail = commits.length
				? String(commits[commits.length - 1].message).split("\n")[0]
				: "";
			break;
		}
		case "PullRequestEvent":
			action =
				p.action === "closed" && p.pull_request?.merged
					? "merged a PR in"
					: `${p.action} a PR in`;
			detail = p.pull_request?.title ?? "";
			break;
		case "IssuesEvent":
			action = `${p.action} an issue in`;
			detail = p.issue?.title ?? "";
			break;
		case "IssueCommentEvent":
			action = "commented in";
			detail = p.issue?.title ?? "";
			break;
		case "CreateEvent":
			action =
				p.ref_type === "repository" ? "created" : `created a ${p.ref_type} in`;
			break;
		case "ReleaseEvent":
			action = "released in";
			detail = p.release?.tag_name ?? "";
			break;
		case "ForkEvent":
			action = "forked";
			break;
		case "WatchEvent":
			action = "starred";
			break;
	}

	return { action, repo, repoFull, detail, ago: relTime(e.created_at) };
}

export default function GitHubActivity() {
	const [status, setStatus] = useState<Status>("loading");
	const [data, setData] = useState<Activity>(null);

	useEffect(() => {
		let cancelled = false;

		const apply = (activity: Activity) => {
			if (cancelled) return;
			setData(activity);
			setStatus(activity ? "ok" : "unavailable");
		};

		// Serve from a short-lived cache first.
		try {
			const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "null");
			if (cached && Date.now() - cached.ts < CACHE_TTL) {
				apply(cached.data);
				return;
			}
		} catch {}

		const fetchData = async () => {
			try {
				const res = await fetch(
					`https://api.github.com/users/${USER}/events/public?per_page=100`,
					{ headers: { Accept: "application/vnd.github+json" } }
				);
				if (!res.ok) throw new Error(`status ${res.status}`);
				const events = await res.json();
				if (!Array.isArray(events)) throw new Error("bad payload");

				// Skip the automated 0-commit profile-README pushes.
				const meaningful = events.find(
					(e: any) =>
						!(e.type === "PushEvent" && (e.payload?.commits?.length ?? 0) === 0)
				);
				if (!meaningful) throw new Error("no meaningful events");

				const activity = describe(meaningful);
				try {
					localStorage.setItem(
						CACHE_KEY,
						JSON.stringify({ ts: Date.now(), data: activity })
					);
				} catch {}
				apply(activity);
			} catch (e) {
				console.error("Could not fetch GitHub activity:", e);
				if (!cancelled) setStatus("unavailable");
			}
		};

		fetchData();
		return () => {
			cancelled = true;
		};
	}, []);

	if (status === "loading") {
		return <p className="font-mono text-sm text-muted">…</p>;
	}

	if (status !== "ok" || !data) {
		return <p className="font-mono text-sm text-muted">unavailable</p>;
	}

	return (
		<a
			href={`https://github.com/${data.repoFull}`}
			target="_blank"
			rel="noreferrer noopener"
			className="block"
		>
			<p className="text-[15px]">
				{data.action}{" "}
				<span className="font-medium text-accent">{data.repo}</span>
			</p>
			<p className="mt-1 truncate font-mono text-sm text-muted">
				{data.ago}
				{data.detail ? ` · ${data.detail}` : ""}
			</p>
		</a>
	);
}
