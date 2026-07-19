"use client";

import Navbar from "./components/Navbar";
import BentoCard from "./components/BentoCard";
import MiniCard from "./components/MiniCard";
import YourCurrentIp from "./components/YourCurrentIp";
import Links from "./components/Links";
import Pgp from "./components/Pgp";
import GitHubActivity from "./components/GitHubActivity";
import ConsoleBanner from "./components/ConsoleBanner";
import dynamic from "next/dynamic";

const BirthdayCountdown = dynamic(
	() => import("./components/BirthdayCountdown"),
	{ ssr: false }
);
const RandomFact = dynamic(() => import("./components/RandomFact"), {
	ssr: false,
});
const LocalTime = dynamic(() => import("./components/LocalTime"), {
	ssr: false,
});

export default function Home() {
	return (
		<main className="min-h-screen bg-background text-text">
			<ConsoleBanner />
			<Navbar />
			<div className="mx-auto max-w-6xl px-4 pb-10 pt-4 sm:px-6">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-4 lg:[grid-template-rows:repeat(3,minmax(9rem,1fr))]">
					<BentoCard
						className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
						contentClassName="justify-between"
					>
						<span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted">
							~/whoami
						</span>
						<div>
							<h1 className="text-4xl font-bold leading-none tracking-tight sm:text-5xl">
								Daan Breur
							</h1>
							<p className="mt-3 text-lg text-accent-soft">
								Software developer &amp; hacker
							</p>
						</div>
					</BentoCard>

					<BentoCard label="Age">
						<BirthdayCountdown />
					</BentoCard>

					<BentoCard label="Local time">
						<LocalTime />
					</BentoCard>

					<BentoCard label="Your IP">
						<YourCurrentIp />
					</BentoCard>

					<BentoCard label="Elsewhere">
						<Links />
					</BentoCard>

					<BentoCard
						label="random.choice()"
						labelUppercase={false}
						className="sm:col-span-2 lg:col-span-4"
					>
						<RandomFact />
					</BentoCard>
				</div>

				<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<MiniCard label="PGP" className="sm:col-span-2 lg:col-span-2">
						<Pgp />
					</MiniCard>
					<MiniCard label="GitHub" className="sm:col-span-2 lg:col-span-2">
						<GitHubActivity />
					</MiniCard>
				</div>
			</div>
		</main>
	);
}
