import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		year: z.number(),
		summary: z.string(),
		// Longer blurb for the /projects list; falls back to `summary`.
		description: z.string().optional(),
		link: z.url().optional(),
		// Paths under public/, e.g. /projects/my-project.mp4
		video: z.string().optional(),
		poster: z.string().optional(),
		// Still thumbnail under public/, used when there's no video.
		image: z.string().optional(),
		featured: z.boolean().default(false),
		// Shown with an "in progress" label and listed after finished projects.
		inProgress: z.boolean().default(false),
		draft: z.boolean().default(false),
	}),
});

const writing = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		summary: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { projects, writing };
