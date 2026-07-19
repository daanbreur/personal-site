import React from "react";

// Half-height version of the BentoCard for the bottom strip of "mini widgets"
export default function MiniCard({
	label,
	className = "",
	children,
}: {
	label?: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<section
			className={`group flex min-h-[5.5rem] flex-col justify-center overflow-hidden rounded-xl border border-border bg-panel px-4 py-3 transition-colors duration-200 hover:border-accent ${className}`}
		>
			{label && (
				<span className="mb-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted">
					{label}
				</span>
			)}
			{children}
		</section>
	);
}
