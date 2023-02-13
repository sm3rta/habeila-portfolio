import { Anchor, Box, List, ListItem } from '@hope-ui/solid';
import { JSX } from 'solid-js';
import { BmwFoundationLogo } from './logos/BmwFoundationLogo';
import { CalqulateLogo } from './logos/CalqulateLogo';
import { NetjeekLogo } from './logos/NetjeekLogo';
import { TwentyThirtyLogo } from './logos/TwentyThirtyLogo';

export type Project = {
	name: string;
	id: string;
	description?: string | JSX.Element;
	technologies?: string[];
	tasks?: { description: string | (() => JSX.Element); imageUrl?: string; videoUrl?: string }[];
	website?: string;
	responsibilities?: any[];
	Logo?: (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element;
};

export type Workplace = {
	name: string;
	from?: string;
	to?: string;
	description?: string | JSX.Element;
	title?: string;
	projects: Project[];
	website?: string;
};

export const work: Workplace[] = [
	{
		name: 'Self-employed',
		title: 'Full-stack Web Developer',
		projects: [
			{
				name: 'Portfolio website',
				id: 'portfolio-website',
				website: 'https://habeila-portfolio.netlify.app/',
				description: 'This portfolio website is built with Solid.js and a lot of love.',
				technologies: ['Solid.js', 'Astro', 'Parallax effect', 'TypeScript', 'Sass', 'Styled components'],
				tasks: [
					{
						description: () => (
							<>
								It's fully accessible, keyboard tabbable, responsive and SEO-enabled, scoring{' '}
								<Anchor
									// style={{
									// 	'border-bottom': 'white 1px solid',
									// }}
									href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fhabeila-portfolio.netlify.app"
								>
									100 on PageSpeed Insights
								</Anchor>{' '}
								on both mobile and desktop
							</>
						),

						imageUrl: '/assets/projects/portfolio/portfolio-pageSpeedInsights.webp',
					},
					{
						description: () => (
							<>
								You can interact with the stars by hovering over (or on mobile, touching) them and they will disappear,
								skip forward and re-appear with a different color.'
							</>
						),
					},
					{ description: 'All animations are vanilla' },
				],
			},
		],
	},

	{
		name: 'Calqulate',
		website: 'https://calqulate.io/',
		description: (
			<>
				Led a team of 5 front-end developers in the process of creating and maintaining features while setting design
				system standards for the design team to follow.
				<br />
				Built and maintained different libraries in a monorepo for tables, charts and reusable UI components.
			</>
		),
		from: 'November 2020',
		to: 'January 2023',
		// to: 'Current',
		title: 'Senior Front-end Web Developer',
		projects: [
			{
				name: 'Calqulate',
				id: 'calqulate',
				website: 'https://calqulate.io/',
				Logo: CalqulateLogo,
				description: (
					<>
						A financial tool for modern SaaS organizations that
						<ul>
							<ListItem ml="$6" fontSize="$sm">
								Collects data from multiple sources and automatically generates reports on finances, growth metrics,
								cashflow forecasting, cash management, customer growth and churn, multi-source subscription management
								and more.
							</ListItem>
							<ListItem ml="$6" fontSize="$sm">
								Features complex editable tree tables with fixed columns, sticky headers and advanced styles,
								interactive data rich charts.
							</ListItem>
							<ListItem ml="$6" fontSize="$sm">
								Integrates with most known major accounting and subscription software like Stripe, Procountor,
								QuickBooks and Xero.
							</ListItem>
						</ul>
					</>
				),
				tasks: [
					{
						description: () => (
							<>
								Built a proprietary charts library using D3.js with 10 different types of charts with animations,
								interactive tooltips, legends and placeholders with randomly generated data'
							</>
						),
						videoUrl: '/assets/projects/calqulate/calqulate-charts.webm',
					},
					{ description: 'Created front-end monorepo architecture, including 2 apps and 5 independent libraries' },
					{
						description:
							'Built a library for performant editable tree tables with fixed columns, virtual sticky headers and advanced styles',
						imageUrl: '/assets/projects/calqulate/calqulate-tables.webp',
					},
					{ description: 'Built a responsive app layout with Atlassian-like collapsible drawer and mobile menu' },
					{
						description:
							'Built time selectors and filters that follow a global state design pattern and sync with the URL',
					},
					{ description: 'Built an integration with Stripe for the users to pay for subscriptions' },
					{ description: 'Built a proprietary types SDK to ensure API type safety between front-end and back-end' },
				],
				technologies: [
					'React',
					'TypeScript',
					'Material UI',
					'Sass',
					'Styled components',
					'react-hook-form',
					'Zod',
					'D3.js',
					'Storybook',
					'Hasura',
					'Stripe API',
					'GraphQL',
					'react-query',
					'Auth0',
					'Turborepo',
					'Sentry',
					'Hasura',
					'AWS',
				],
				responsibilities: ['Front-end Web App', 'Back-end API Types SDK'],
			},
		],
	},

	{
		name: 'Coformatique',
		website: 'https://www.linkedin.com/company/coformatique/',
		description: (
			<>
				Worked as a full-stack web developer on varying projects in this warehouse company, using different sets of
				technologies. Gained experience in accessibility, pixel perfect UI, responsive design and SEO.
			</>
		),
		from: 'May 2020',
		to: 'November 2020',
		title: 'Full-stack Web Developer',
		projects: [
			{
				name: 'BMW Foundation',
				id: 'bmw-foundation',
				website: 'https://bmw-foundation.org/',
				Logo: BmwFoundationLogo,
				description: (
					<>
						Built this website from the ground up until it went live, it's an informative website of the BMW
						Foundation's mission, plans and events. The website features advanced accessibility features and
						multi-language routing.
					</>
				),
				technologies: [
					'React',
					'Gatsby.js',
					'TypeScript',
					'Material UI',
					'JSS',
					'Multi-language Routing',
					'Responsive UI',
					'i18next',
					'Axios',
					'Wordpress',
				],
				responsibilities: ['Website (front-end)'],
			},
			{
				name: 'TwentyThirty',
				id: 'twentythirty',
				website: 'https://twentythirty.com/',
				Logo: TwentyThirtyLogo,
				description: (
					<>
						An online magazine managed by the BMW Foundation inspiring a just and sustainable future in alignment with
						the UN 2030 Agenda.
					</>
				),
				technologies: ['React', 'Gatsby.js', 'TypeScript', 'Material UI', 'Responsive UI', 'JSS', 'Axios', 'Wordpress'],
				responsibilities: ['Website (front-end)'],
			},
			{
				name: 'Educational platform',
				id: 'educational-platform',
				description: (
					<>
						An educational platform where professors can upload and schedule lectures to different classes,
						automatically create and share Zoom meeting links after a lecture have been seen by all the students to
						discuss it, create assignments, quizzes and grade students. We built two mobile apps for Android and iOS, an
						admin dashboard where professors can manage lectures, send emails with grades to students' parents.
					</>
				),
				// tasks:[
				// 	{
				// 		description: "Created a Zoom integration that automatically creates a meeting link for each lecture and sends it to the students' emails"
				// 	},
				// 	{
				// 		description: "Built a custom email template for the emails sent to students' parents"
				// 	}
				// ],
				technologies: [
					'Firebase',
					'Express.js',
					'TypeScript ',
					'Sendgrid',
					'React',
					'Material UI',
					'JSS',
					'Formik',
					'Yup',
					'Axios',
				],
				responsibilities: ['Back-end (Firebase)', 'Admin Dashboard (front-end)'],
			},
		],
	},

	{
		name: 'Haya Solutions Inc.',
		website: 'https://hayasolutions.com/',
		description: '',
		from: 'May 2018',
		to: 'May 2020',
		title: 'Full-stack Web Developer',
		projects: [
			// {
			// 	name: 'Asset Tracking System',
			// 	id: 'asset-tracking-system',
			// 	// id: "nacg",
			// 	description: (
			// 		<>
			// 			A web application for an asset tracking system designed to manage, track and generate statistics about
			// 			equipment and their status
			// 		</>
			// 	),
			// 	technologies: ['React', 'JavaScript', 'Material UI', 'Feathers.js', 'MongoDB', 'JWT'],
			// 	tasks: [
			// 		{
			// 			description: 'Optimized API response time by 200% by using MongoDB caching with Redis',
			// 		},
			// 	],
			// 	responsibilities: ['Front-end Web App'],
			// },
			{
				name: 'Netjeek',
				id: 'netjeek',
				Logo: NetjeekLogo,
				description: (
					// Here I worked on my
					// First project I've worked on that's went live, it's an
					<>
						Built an eCommerce trans-shipping system designed to facilitate the purchase and delivery of goods to
						countries where customers can’t place an order to international e-retailers directly.
					</>
				),
				technologies: [
					'React',
					'JavaScript',
					'Material UI',
					'JSS',
					'Express.js',
					'Global State with React hooks ',
					'Stripe API',
					'i18next',
					'Axios',
					'JWT',
					'Google Maps',
					'JSDoc',
					'Enzyme',
					'Python',
				],
				tasks: [
					{
						description: () => (
							<>
								Built an integration with Google maps where the user can pinpoint their delivery location on the map
								with automatic location detection
							</>
						),
					},
					{ description: 'Built an integration with Stripe for the users to pay for shipments' },
					{ description: 'Built the front-end app' },
					{ description: 'Did a system analysis defining APIs with all the possible responses' },
					{
						description:
							'Created a mock API with example responses for each end point, with a configurable front end to change between possible status codes',
					},
				],
				responsibilities: ['eCommerce Website (front end)', 'System Analysis', 'Mock API creation'],
			},
		],
	},
];

export const allProjects = work.flatMap((w) => w.projects.map((p) => ({ ...p, company: w })));
export const projects = [
	'calqulate',
	'bmw-foundation',
	'twentythirty',
	'portfolio-website',
	'educational-platform',
	'netjeek',
].map((id) => allProjects.find((p) => p.id === id)) as typeof allProjects;

export type ProjectWithCompany = typeof projects[number];

// export const introText = (
// 	<>
// 		I am a senior software engineer with 5 years of experience. My work extends from system design and analysis to
// 		complete implementation, but front-end web development is where my passion truly lies working with React, Vue and
// 		Solid.js.
// 	</>
// );

export const telephoneNumber = '16479790872';
export const telephoneNumberStylized = '(647) 979-0872';
