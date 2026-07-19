import React from "react";

const FINGERPRINT_TOP = "BF37 5AAB F538 ABCA 6EE5";
const FINGERPRINT_BOTTOM = "040B 6A0D DAB4 48DB 05A8";
const KEY_URL =
	"https://dnbr.cloud/BF375AABF538ABCA6EE5040B6A0DDAB448DB05A8.asc";

export default function Pgp() {
	return (
		<div className="flex flex-1 flex-col">
			<p className="font-mono text-[13px] leading-relaxed tracking-wide text-accent">
				{FINGERPRINT_TOP}
				<br />
				{FINGERPRINT_BOTTOM}
			</p>
			<a
				href={KEY_URL}
				target="_blank"
				rel="noreferrer noopener"
				className="mt-auto flex items-center gap-1.5 self-end font-mono text-sm text-muted transition-colors hover:text-accent"
			>
				full key
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-3.5 w-3.5"
					aria-hidden="true"
				>
					<path d="M7 17 17 7M8 7h9v9" />
				</svg>
			</a>
		</div>
	);
}
