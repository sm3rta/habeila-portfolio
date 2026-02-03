type UpdateType = 'certification' | 'publication' | 'award' | 'article';

export interface Update {
	id: string;
	type: UpdateType;
	title: string;
	subtitle?: string;
	date: Date;
	description: string;
	link?: string;
	linkText?: string;
	image?: string;
	imageAlt?: string;
}

export const updates: Update[] = [
	{
		id: 'meta-certifications',
		type: 'certification',
		title: 'Meta Front-End Developer Specialization',
		subtitle: 'Meta via Coursera',
		date: new Date(2023, 3, 1), // April 1, 2023 (month is 0-indexed)
		description:
			'Completed the Meta Front-End Developer Professional Certificate, covering Programming with JavaScript, Version Control, Advanced React, and Principles of UX/UI Design.',
		link: 'https://coursera.org/verify/professional-cert/GT8AZWL3T9L2',
		linkText: 'View Certificate',
		image: '/meta-certificate.jpeg',
		imageAlt: 'Meta Front-End Developer Specialization Certificate',
	},
	{
		id: 'mfe-article',
		type: 'article',
		title: 'Versioned Web Components and Micro Front-ends',
		subtitle: 'Dev.to',
		date: new Date(2025, 5, 9), // June 9, 2025 (month is 0-indexed)
		description:
			'In this article I take a deep dive into the problem of versioned web components in microfrontend architectures, the scoped custom element registries proposal that aims to solve it, the current state of it, polyfills, and how to fix its problems.',
		link: 'https://dev.to/sm3rta/versioned-web-components-and-micro-front-ends-1m40',
		linkText: 'Read Article',
		image: '/mfe-article-devto.png',
		imageAlt: 'Dev.to article screenshot',
	},
	{
		id: 'zeroheight-award',
		type: 'award',
		title: 'Zeroheight Innovation Award for pAIella',
		subtitle: 'Saffron Design System - Thomson Reuters',
		date: new Date(2025, 11, 10), // December 10, 2025 (month is 0-indexed)
		description:
			'The Saffron Design System won the Zeroheight Innovation Award for pAIella, an AI framework that transforms Figma designs into production-ready fully accessible code with Saffron web components, enabling teams to build 2.7 times as fast.',
		link: 'https://www.linkedin.com/feed/update/urn:li:activity:7421953089332633600/',
		linkText: 'View on LinkedIn',
		image: '/pAIella-award.jpg',
		imageAlt: 'Zeroheight Innovation Award',
	},
].sort((a, b) => b.date.getTime() - a.date.getTime()) as Update[];
