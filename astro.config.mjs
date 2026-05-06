import node from "@astrojs/node";
import react from "@astrojs/react";
import { auditLogPlugin } from "@emdash-cms/plugin-audit-log";
import { defineConfig } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";
import { formsPlugin } from "@emdash-cms/plugin-forms";

export default defineConfig({
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	security: {
		allowedDomains: [
			{ hostname: "cnet-interior-vernon-every.trycloudflare.com", protocol: "https" },
		],
	},
	vite: {
		server: {
			allowedHosts: ["cnet-interior-vernon-every.trycloudflare.com"],
		},
	},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: sqlite({ url: "file:./data.db" }),
			storage: local({
				directory: "./uploads",
				baseUrl: "/_emdash/api/media/file",
			}),
			plugins: [formsPlugin(), auditLogPlugin()],
			mcp: true,
			siteUrl: "https://cnet-interior-vernon-every.trycloudflare.com",
		}),
	],
	devToolbar: { enabled: false },
});
