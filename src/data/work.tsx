import { JSX } from 'solid-js';

export type Project = {
	name: string;
	id: string;
	description?: string | JSX.Element;
	technologies?: string[];
	tasks?: { description: string; imageUrl?: string; videoUrl?: string }[];
	website?: string;
	responsibilities?: any[];
};

export type Workplace = {
	name: string;
	from?: string;
	to?: string;
	description?: string;
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
				description: (
					<>
						This portfolio website is built with Solid.js and a lot of love.
						<br />
						All animations are vanilla!
					</>
				),
				technologies: ['Solid.js', 'Astro', 'Parallax effect', 'TypeScript', 'Sass', 'Styled components'],
				tasks: [
					{
						description: "It's scored 100 on Google Lighthouse on both mobile and desktop.",
						imageUrl: '/assets/projects/portfolio/portfolio-lighthouse.webp',
					},
					{
						description:
							'You can interact with the stars by hovering over (or on mobile, touching) them and they will disappear,\
							 skip forward and re-appear with a different color.',
					},
					{
						description: "It's fully accessible and keyboard tabbable!",
					},
				],
			},
		],
	},

	{
		name: 'Calqulate',
		website: 'https://calqulate.io/',
		description:
			"Working as a full-stack web developer in varying projects using different sets of technologies. I've gained the most experience working here, tackling more challenging problems.",
		from: 'November 2020',
		to: 'January 2023',
		title: 'Front-end Web Developer',
		projects: [
			{
				name: 'Calqulate',
				id: 'calqulate',
				website: 'https://calqulate.io/',
				description:
					'A financial tool for modern SaaS organizations that automatically generates reports on finances,\
					 growth metrics, cashflow forecasting, cash management, customer growth and churn, \
					 multi-source subscription management and more.\
					  Features complex editable tree tables with fixed columns, sticky headers and advanced styles,\
						 interactive data rich charts.\
						  Collects data from most known major accounting softwares.\
							 My biggest responsibility in this project is to create and maintain different libraries in a monorepo for\
							  tables, charts and reusable UI components',

				tasks: [
					{
						description: 'Created an app layout with Atlassian-like collapsible drawer',
					},
					{
						description:
							'Created time selectors and filters that follow a global state design pattern and sync with the URL',
					},
					{
						description:
							'Created a library for editable tree tables with fixed columns, sticky headers and advanced styles',
					},
					{
						description:
							'Created a proprietary charts library using D3 with 10 different types of charts animations,\
							interactive tooltips, legends, placeholders with randomly generated data',
						videoUrl: '/assets/projects/calqulate/calq-charts.webm',
					},
					{
						description: 'Created an integration with Stripe for the users to pay for subscriptions',
					},
					{
						description:
							'Created a proprietary types SDK used by the back-end, published on NPM and used on the front-end, to ensure API type safety between front-end and back-end',
					},
				],
				technologies: [
					'React',
					'TypeScript',
					'Material UI',
					'Sass',
					'Styled components',
					'react-hook-form',
					'Zod',
					'D3',
					'Hasura',
					'Stripe Payment Gateway',
					'GraphQL',
					'Auth0',
					'Turborepo',
					'Sentry',
				],
				responsibilities: ['Front-end Web App'],
			},
		],
	},

	{
		name: 'Coformatique',
		website: 'https://www.linkedin.com/company/coformatique/',
		description:
			"Working as a full-stack web developer in varying projects using different sets of technologies. I've gained the most experience working here, tackling more challenging problems.",
		from: 'May 2020',
		to: 'November 2020',
		title: 'Full-stack Web Developer',
		projects: [
			{
				name: 'TwentyThirty',
				id: 'twentythirty',
				website: 'https://twentythirty.com/',
				description:
					"Built this one also from the ground up, it's an online magazine managed by the BMW Foundation inspiring a just and sustainable future in alignment with the UN 2030 Agenda.",
				technologies: ['React', 'Gatsby', 'TypeScript', 'Material UI', 'Responsive Design', 'JSS', 'Axios'],
				responsibilities: ['Website (front-end)'],
			},
			{
				name: 'BMW Foundation',
				id: 'bmw-foundation',
				website: 'https://bmw-foundation.org/',
				description:
					"Built this website from the ground up until it went live, it's an informative website of the foundation's mission, plans and events. The website features advanced accessibility features and multi-language routing",
				technologies: [
					'React',
					'Gatsby',
					'TypeScript',
					'Material UI',
					'JSS',
					'Multi-language Routing',
					'Responsive Design',
					'I18Next',
					'Axios',
				],
				responsibilities: ['Website (front-end)'],
			},
			{
				name: 'Educational platform',
				id: 'educational-platform',
				description:
					"An educational platform where professors can upload and schedule lectures to different classes, create assignments, quizzes and grade students. We built two mobile apps for Android and iOS, an admin dashboard where professors can manage lectures, send emails with grades to students' parents.",
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
		description: '',
		from: 'May 2019',
		to: 'May 2020',
		title: 'Full-stack Web Developer',
		projects: [
			// {
			//   description:
			//     "A web application for an asset tracking system designed to manage, track and generate statistics about equipment and their status",
			//   technologies: [
			//     "React",
			//     "Javascript",
			//     "Material UI",
			//     "Feathers.js",
			//     "MongoDB",
			//     "JSON Web Token",
			//   ],
			// },
			{
				name: 'Netjeek',
				id: 'netjeek',
				description:
					"First project I've worked on that's went live,\
					 it's trans-shipping system designed to facilitate the purchase and delivery of goods\
					  to countries where customers can’t place an order to international e-retailers directly",
				technologies: [
					'React',
					'Javascript',
					'Material UI',
					'JSS',
					'Express.js',
					'Global State with React hooks ',
					'Stripe Payment Gateway',
					'I18Next',
					'Axios',
					'JSON Web Token',
					'Google Maps',
					'JSDoc',
					'Jest Enzyme',
				],
				tasks: [
					{
						description:
							'Created an integration with Google maps where the user can pinpoint their\
							delivery location on the map with automatic location detection',
					},
					{
						description: 'Created an integration with Stripe for the users to pay for shipments',
					},
				],
				responsibilities: ['eCommerce Website (front-end)', 'System Analysis', 'Mock API creation'],
			},
		],
	},
];

export const projects = work.flatMap((w) => w.projects.map((p) => ({ ...p, company: w })));

export type ProjectWithCompany = typeof projects[number];

export const introText =
	'I am a senior software engineer with 4 years of experience. \
My work extends from system design and analysis to complete implementation, \
but front-end web development is where my passion truly lies working with React, Vue and Solid.js.';

export const telephoneNumber = '+201015178686';
export const telephoneNumberStylized = '+20 (101) 517-8686';
