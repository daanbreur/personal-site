import React from "react";

// Handle is a optional field, without it will only show the label and icon.
const links = [
	{
		label: "GitHub",
		handle: "@daanbreur",
		href: "https://github.com/daanbreur",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
				<path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.575.106.785-.25.785-.556 0-.274-.01-1-.015-1.965-3.196.695-3.87-1.54-3.87-1.54-.523-1.33-1.278-1.685-1.278-1.685-1.044-.714.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.027 1.76 2.695 1.252 3.35.957.104-.744.402-1.252.73-1.54-2.552-.29-5.236-1.276-5.236-5.68 0-1.255.448-2.28 1.184-3.084-.119-.29-.513-1.46.112-3.045 0 0 .966-.31 3.165 1.178a10.98 10.98 0 0 1 2.88-.388c.977.004 1.962.132 2.882.388 2.197-1.489 3.162-1.178 3.162-1.178.626 1.585.232 2.755.114 3.045.738.804 1.183 1.829 1.183 3.084 0 4.415-2.688 5.386-5.248 5.67.413.356.78 1.056.78 2.13 0 1.538-.014 2.778-.014 3.157 0 .308.207.667.79.554A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
			</svg>
		),
	},
	{
		label: "Hack The Box",
		handle: "@Daantje",
		href: "https://profile.hackthebox.com/profile/019c62c5-0abf-7331-967e-c71eab179d43",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
				className="h-4 w-4"
			>
				<path d="M12 2 3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2Z" />
				<path d="M12 12 3.5 6.9M12 12v9.8M12 12l8.5-5.1" />
			</svg>
		),
	},
	// CTFtime hidden for now since the profiles there dont show much anyways
	// {
	// 	label: "CTFtime",
	// 	handle: "",
	// 	href: "https://ctftime.org/user/52971",
	// 	icon: (
	// 		<svg
	// 			viewBox="0 0 24 24"
	// 			fill="none"
	// 			stroke="currentColor"
	// 			strokeWidth="1.8"
	// 			strokeLinecap="round"
	// 			strokeLinejoin="round"
	// 			className="h-4 w-4"
	// 		>
	// 			<path d="M4 22V3" />
	// 			<path d="M4 4c3-2 6 2 9 0s5-1 7 0v9c-2-1-4-2-7 0s-6-2-9 0" />
	// 		</svg>
	// 	),
	// },
	{
		label: "LinkedIn",
		handle: "daanbreur",
		href: "https://www.linkedin.com/in/daanbreur/",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
			</svg>
		),
	},
	{
		label: "Email",
		handle: "daan@daanbreur.systems",
		href: "mailto:daan@daanbreur.systems",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-4 w-4"
			>
				<rect x="3" y="5" width="18" height="14" rx="2" />
				<path d="m3 7 9 6 9-6" />
			</svg>
		),
	},
];

export default function Links() {
	return (
		<div className="flex h-full flex-col justify-center">
			{links.map((link) => (
				<a
					key={link.label}
					href={link.href}
					target={link.href.startsWith("mailto:") ? undefined : "_blank"}
					rel="noreferrer noopener"
					className="group/link -mx-2 flex min-w-0 items-center gap-3 rounded-lg px-2 py-1 text-text transition-colors hover:bg-panel-2"
				>
					<span className="shrink-0 text-muted transition-colors group-hover/link:text-accent">
						{link.icon}
					</span>
					<span className="shrink-0 font-medium">{link.label}</span>
					{link.handle && (
						<span className="ml-auto truncate font-mono text-sm text-muted">
							{link.handle}
						</span>
					)}
				</a>
			))}
		</div>
	);
}
