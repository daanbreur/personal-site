import React from "react";

export default function BentoCard({
	label,
	className = "",
	contentClassName = "",
	labelUppercase = true,
	children,
}: {
	label?: string;
	className?: string;
	contentClassName?: string;
	labelUppercase?: boolean;
	children: React.ReactNode;
}) {
	return (
		<section
			className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-panel p-5 transition-colors duration-200 hover:border-accent ${className}`}
		>
			{label && (
				<span
					className={`mb-3 font-mono text-[0.7rem] font-medium tracking-[0.18em] text-muted ${
						labelUppercase ? "uppercase" : ""
					}`}
				>
					{label}
				</span>
			)}
			<div className={`flex flex-1 flex-col justify-center ${contentClassName}`}>
				{children}
			</div>
		</section>
	);
}
