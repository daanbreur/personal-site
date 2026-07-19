const { execSync } = require("child_process");

// Resolve the current commit hash at build time (works locally and in CI).
let commitHash = "dev";
try {
	commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
	if (process.env.GITHUB_SHA) commitHash = process.env.GITHUB_SHA.slice(0, 7);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	// Static export can't use the Next image optimizer.
	images: { unoptimized: true },
	env: {
		NEXT_PUBLIC_COMMIT_HASH: commitHash,
	},
};

module.exports = nextConfig;
