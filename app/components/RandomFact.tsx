"use client";

import React, { useState, useEffect } from "react";

const randomFacts = [
	"2 + 2 = fish",
	"Cats are the best. This is not up for debate. 🐈",
	"There are at least 2 spiders within 100 meters of you right now.",
	"Not all trees drop their leaves in fall.",
	"octo means 8, sept means 7 - the calendar has been lying to us.",
	"Keep hacking, keep learning.",
	"PLEASE don't use React. (this site uses React.)",
	"Eating mints and peppers at the same time will not result in peppermint.",
	"Coconuts are, statistically, more dangerous than sharks.",
	"#WEEKDAY#s are underrated.",
	"#MONTH_NAME# is the best month of the year. Obviously.",
	"The #MONTH#th month is usually called #MONTH_NAME#.",
	"Salt in coffee tastes exactly as bad as you'd expect.",
	"Did you know that 1 + 2 = 3?",
	"The Gregorian calendar is messing with all of us.",
	"Let me scan your ports.",
	"I love pwning boxes.",
	"\"Ethical\" Hacker",
	"Script kiddies copy exploits. Hackers understand them.",
	"Click clack classclickers",
	"De constructor CONSTRUEERT.",
	"Splunk. Splunk. Splunk.",
];

const weekdayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const pickTemplate = () =>
	randomFacts[Math.floor(Math.random() * randomFacts.length)];

// Split the template on its placeholders and render each substituted value
// with a dotted underline, so the dynamic bit reads as generated — not broken.
const renderFact = (template: string) => {
	const now = new Date();
	const placeholders: Record<string, string> = {
		"#WEEKDAY#": weekdayNames[now.getDay()],
		"#MONTH_NAME#": monthNames[now.getMonth()],
		"#DAY#": now.getDate().toString(),
		"#MONTH#": (now.getMonth() + 1).toString(),
		"#YEAR#": now.getFullYear().toString(),
	};

	// Capturing group keeps the delimiters in the split result.
	const regex = /(#WEEKDAY#|#MONTH_NAME#|#DAY#|#MONTH#|#YEAR#)/g;

	return template.split(regex).map((part, i) => {
		const value = placeholders[part];
		if (value !== undefined) {
			return (
				<span
					key={i}
					className="border-b border-dotted border-accent text-accent"
				>
					{value}
				</span>
			);
		}
		return <React.Fragment key={i}>{part}</React.Fragment>;
	});
};

export default function RandomFact() {
	const [template, setTemplate] = useState(pickTemplate);

	useEffect(() => {
		const timer = setInterval(() => setTemplate(pickTemplate()), 10000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex items-center gap-3">
			<span className="font-mono text-accent" aria-hidden="true">
				&gt;
			</span>
			<p className="text-xl text-text sm:text-2xl">{renderFact(template)}</p>
		</div>
	);
}
