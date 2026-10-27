import { getCollection } from 'astro:content';

// Finished before in-progress, then featured first, then newest first.
export async function getProjects() {
	const entries = await getCollection('projects', ({ data }) => !data.draft);
	return entries.sort(
		(a, b) =>
			Number(a.data.inProgress) - Number(b.data.inProgress) ||
			Number(b.data.featured) - Number(a.data.featured) ||
			b.data.year - a.data.year
	);
}

// Projects marked `featured`, falling back to the most recent ones.
export async function getFeaturedProjects(limit = 3) {
	const projects = await getProjects();
	const featured = projects.filter((p) => p.data.featured);
	return (featured.length > 0 ? featured : projects).slice(0, limit);
}

export async function getPosts() {
	const entries = await getCollection('writing', ({ data }) => !data.draft);
	return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
