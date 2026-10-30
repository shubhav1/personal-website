// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	// Hide Astro's dev-only toolbar on localhost; it never ships to production anyway.
	devToolbar: { enabled: false },
	output: 'server',
	adapter: vercel({
		webAnalytics: { enabled: true },
	}),
});
