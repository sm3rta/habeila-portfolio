import { ReactNode } from 'react';

export type Project = {
	name?: string;
	description?: string | ReactNode;
	technologies?: any[];
	website?: string;
	responsibilities?: any[];
};

export type Workplace = {
	name: string;
	from: string;
	to: string;
	description: string;
	title: string;
	projects: Project[];
};

export const work: Workplace[] = [
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
				name: 'Dokanek/Netjeek',
				description:
					"First project I've worked on that's went live, it's trans-shipping system designed to facilitate the purchase and delivery of goods to countries where customers can’t place an order to international e-retailers directly",
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
				responsibilities: ['eCommerce Website (front-end)', 'System Analysis', 'Mock API creation'],
			},
		],
	},
	{
		name: 'Coformatique',
		description:
			"Working as a full-stack web developer in varying projects using different sets of technologies. I've gained the most experience working here, tackling more challenging problems.",
		from: 'May 2020',
		to: 'November 2020',
		title: 'Full-stack Web Developer',
		projects: [
			{
				name: 'BMW Foundation',
				website: 'https://bmw-foundation.org/',
				description:
					"Built this website from the ground up until it went live, it's an informative website of the foundation's mission, plans and events. The website features advanced accessibility features, multilanguage routing and",
				technologies: [
					'React',
					'TypeScript',
					'Material UI',
					'JSS',
					'Multilanguage Routing',
					'Responsive Design',
					'I18Next',
					'Axios',
				],
				responsibilities: ['Website (front-end)'],
			},
			{
				name: 'TwintyThirty',
				website: 'https://twentythirty.com/',
				description:
					"Built this one also from the ground up, it's an online magazine managed by the BMW Foundation inspiring a just and sustainable future in alignment with the UN 2030 Agenda.",
				technologies: ['React', 'TypeScript', 'Material UI', 'Responsive Design', 'JSS', 'Axios'],
				responsibilities: ['Website (front-end)'],
			},
			{
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
		name: 'Calqulate',
		description:
			"Working as a full-stack web developer in varying projects using different sets of technologies. I've gained the most experience working here, tackling more challenging problems.",
		from: 'November 2020',
		to: 'Current',
		title: 'Front-end Web Developer',
		projects: [
			{
				website: 'https://calqulate.io/',
				description:
					'A financial tool for modern SaaS organizations that automatically generates reports on finances, growth metrics, cashflow forecasting, cash management, customer growth and churn, multi-source subscription management and more. Features complex editable tree tables with fixed columns, sticky headers and advanced styles, interactive data rich charts. Collects data from most known major accounting softwares. My biggest responsiblity in this project is to create and maintain different libraries in a monorepo for tables, charts and reusable UI components',
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
					'GraphQL',
					'Auth0',
					'Sentry',
				],
				responsibilities: ['Front-end Web App'],
			},
		],
	},
];

export const projects = work.flatMap((w) => w.projects.map((p) => ({ ...p, company: w })));

export type ProjectWithWork = typeof projects[number];
