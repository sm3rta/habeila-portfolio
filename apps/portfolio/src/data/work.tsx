import { Anchor, ListItem, Text } from '@hope-ui/solid';
import { IconTypes } from 'solid-icons';
import {
	SiAmazonaws,
	SiAstro,
	SiAuth0,
	SiD3dotjs,
	SiDevexpress,
	SiDisqus,
	SiExpress,
	SiFacebook,
	SiFirebase,
	SiGatsby,
	SiGitlab,
	SiGooglemaps,
	SiGoogletagmanager,
	SiGraphql,
	SiHasura,
	SiI18next,
	SiInstagram,
	SiJavascript,
	SiJss,
	SiMongodb,
	SiNextdotjs,
	SiPython,
	SiReact,
	SiReacthookform,
	SiReactquery,
	SiRedux,
	SiSass,
	SiSentry,
	SiSolid,
	SiStorybook,
	SiStripe,
	SiStyledcomponents,
	SiTailwindcss,
	SiTestinglibrary,
	SiTurborepo,
	SiTwitter,
	SiTypescript,
	SiWeb3dotjs,
	SiWordpress,
	SiYoutube,
	SiZoom,
} from 'solid-icons/si';
import { JSX } from 'solid-js';
import { BmwFoundationLogo } from './logos/BmwFoundationLogo';
import { CalqulateLogo } from './logos/CalqulateLogo';
import { NetjeekLogo } from './logos/NetjeekLogo';
import { QuintLogo } from './logos/QuintLogo';
import { TwentyThirtyLogo } from './logos/TwentyThirtyLogo';

const projectIds = [
	'quint-blog',
	'quint-staking',
	'portfolio-website',
	'calqulate',
	'bmw-foundation',
	'twentythirty',
	'bmw-foundation-tt',
	'educational-platform',
	'asset-tracking-system',
	'netjeek',
] as const;

export type Project = {
	name: string;
	id: (typeof projectIds)[number];
	description?: string | JSX.Element;
	technologies?: { name: string; Icon: IconTypes | null }[];
	achievements: { description: string | (() => JSX.Element); imageUrl?: string; videoUrl?: string }[];
	website?: string;
	responsibilities?: string[];
	Logo?: (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element;
	renderTitle?: () => JSX.Element;
	hideOnHomepage?: boolean;
	hideOnResume?: boolean;
};

export type Workplace = {
	name: string;
	from?: string;
	to?: string;
	description?: string | JSX.Element;
	title?: {
		role: 'front' | 'full' | 'se';
		senior: boolean;
	};
	projects: Project[];
	website?: string;
};

export const work: Workplace[] = [
	{
		name: 'Quint',
		title: {
			role: 'front',
			senior: true,
		},
		from: 'January 2023',
		to: 'March 2023',
		website: 'https://quint.io/',
		projects: [
			{
				name: 'Quint Blog',
				id: 'quint-blog',
				// website: 'https://blog.quint.io/',
				Logo: QuintLogo,
				description: 'A web 3 platform for the Quint cryptocurrency',
				technologies: [
					{ name: 'Astro', Icon: SiAstro },
					{ name: 'Solid.js', Icon: SiSolid },
					{ name: 'Typescript', Icon: SiTypescript },
					{ name: 'Tailwind CSS', Icon: SiTailwindcss },
					{ name: 'Next.js', Icon: SiNextdotjs },
					{ name: 'Disqus', Icon: SiDisqus },
					{ name: 'GitLab', Icon: SiGitlab },
					{ name: 'RDFa', Icon: null },
				],
				achievements: [
					{ description: 'Collaborated with a team of 4 to launch blog website in 1 week' },
					{ description: 'Achieved 100% Lighthouse score with optimized SEO and accessibility' },
				],
				responsibilities: ['Website (front-end)'],
			},
			{
				name: 'Quint Staking Web App',
				id: 'quint-staking',
				// website: 'https://stake.quint.io/',
				Logo: QuintLogo,
				description: 'A web 3 staking platform for the Quint cryptocurrency',
				technologies: [
					{ name: 'React', Icon: SiReact },
					{ name: 'Next.js', Icon: SiNextdotjs },
					{ name: 'Typescript', Icon: SiTypescript },
					{ name: 'Radix UI', Icon: null },
					{ name: 'Tailwind CSS', Icon: SiTailwindcss },
					{ name: 'Web 3', Icon: SiWeb3dotjs },
					{ name: 'Storybook', Icon: SiStorybook },
					{ name: 'GitLab', Icon: SiGitlab },
				],
				achievements: [
					{ description: 'Built fully accessible, responsive website with light/dark themes' },
					{ description: 'Created UI component library based on Radix UI design system and documented on Storybook' },
				],
				responsibilities: ['Website (front-end)'],
			},
		],
	},
	{
		name: 'Self-employed',
		title: {
			role: 'full',
			senior: true,
		},
		projects: [
			{
				name: 'Portfolio website',
				id: 'portfolio-website',
				hideOnResume: true,
				website: 'https://habeila-portfolio.netlify.app/',
				description: 'This portfolio website is built with Solid.js and a lot of love',
				technologies: [
					{ name: 'Solid.js', Icon: SiSolid },
					{ name: 'TypeScript', Icon: SiTypescript },
					{ name: 'Sass', Icon: SiSass },
					{ name: 'Styled components', Icon: SiStyledcomponents },
					{ name: 'Parallax effect', Icon: null },
				],
				achievements: [
					{
						description: () => (
							<>
								It's fully accessible, keyboard tabbable, responsive and SEO-enabled, scoring{' '}
								<Anchor
									// style={{
									// 	'border-bottom': 'white 1px solid',
									// }}
									href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fhabeila-portfolio.netlify.app&form_factor=desktop"
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
								skip forward and re-appear with a different color
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
				Led a team of 4 front-end developers in the process of creating and maintaining features while setting clear
				design system standards for the design team to follow
				<br />
				Built and maintained different libraries in a monorepo for tables, charts and reusable UI components
			</>
		),
		from: 'November 2020',
		to: 'January 2023',
		title: {
			role: 'front',
			senior: true,
		},
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
				achievements: [
					{
						description:
							'Led team of 4 front-end developers to create and maintain features and set clear design system standards',
					},
					{ description: 'Developed front-end monorepo architecture with 2 apps and 5 independent libraries' },
					{
						description: () => (
							<>
								Developed a proprietary charts library using D3.js with 10 different types of charts with animations,
								interactive tooltips, legends and placeholders with randomly generated data
							</>
						),
						videoUrl: '/assets/projects/calqulate/calqulate-charts.webm',
					},
					{
						description:
							'Built performant editable tree tables with fixed columns, virtual sticky headers, and advanced styles',
						imageUrl: '/assets/projects/calqulate/calqulate-tables.webp',
					},
					// { description: 'Built a responsive app layout with Atlassian-like collapsible drawer and mobile menu' },
					{
						description:
							'Built time selectors and filters that follow a global state design pattern and sync with the URL',
					},
					{ description: 'Integrated Stripe for subscription payments' },
					{ description: 'Developed proprietary types SDK for API type safety' },
				],
				technologies: [
					{ name: 'React', Icon: SiReact },
					{ name: 'TypeScript', Icon: SiTypescript },
					{ name: 'Material UI', Icon: null },
					{ name: 'Turborepo', Icon: SiTurborepo },
					{ name: 'Sentry', Icon: SiSentry },
					{ name: 'AWS', Icon: SiAmazonaws },
					{ name: 'Sass', Icon: SiSass },
					{ name: 'Styled components', Icon: SiStyledcomponents },
					{ name: 'react-hook-form', Icon: SiReacthookform },
					{ name: 'Zod', Icon: null },
					{ name: 'D3.js', Icon: SiD3dotjs },
					{ name: 'Devexpress', Icon: SiDevexpress },
					{ name: 'Storybook', Icon: SiStorybook },
					{ name: 'Hasura', Icon: SiHasura },
					{ name: 'Stripe API', Icon: SiStripe },
					{ name: 'GraphQL', Icon: SiGraphql },
					{ name: 'react-query', Icon: SiReactquery },
					{ name: 'Auth0', Icon: SiAuth0 },
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
		title: {
			role: 'full',
			senior: false,
		},
		projects: [
			{
				hideOnResume: true,
				name: 'BMW Foundation',
				id: 'bmw-foundation',
				website: 'https://bmw-foundation.org/',
				Logo: BmwFoundationLogo,
				description: (
					<>
						An informative website of the BMW Foundation's mission, plans and events. The website features advanced
						accessibility features and multi-language routing.
					</>
				),
				technologies: [
					{ name: 'React', Icon: SiReact },
					{ name: 'Gatsby.js', Icon: SiGatsby },
					{ name: 'TypeScript', Icon: SiTypescript },
					{ name: 'Material UI', Icon: null },
					{ name: 'JSS', Icon: SiJss },
					{ name: 'Multi-language Routing', Icon: null },
					{ name: 'Responsive UI', Icon: null },
					{ name: 'i18next', Icon: SiI18next },
					{ name: 'Wordpress', Icon: SiWordpress },
					{ name: 'Twitter API', Icon: SiTwitter },
					{ name: 'Instagram API', Icon: SiInstagram },
					{ name: 'Facebook API', Icon: SiFacebook },
					{ name: 'YouTube API', Icon: SiYoutube },
					{ name: 'Google Tag Manager', Icon: SiGoogletagmanager },
				],
				responsibilities: ['Website (front-end)'],
				achievements: [
					{ description: 'Built this website from the ground up until it went live' },
					{ description: 'Fully responsive, supports keyboard navigation and screen readers' },
					{
						description:
							'Created an accessibility menu which features high contrast mode, dyslexia-friendly font and animations toggle',
					},
					{ description: 'Integrated Google Tag Manager along with following the best SEO practices' },
				],
			},
			{
				hideOnResume: true,
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
				technologies: [
					{ name: 'Gatsby.js', Icon: SiGatsby },
					{ name: 'TypeScript', Icon: SiTypescript },
					{ name: 'Material UI', Icon: null },
					{ name: 'JSS', Icon: SiJss },
					{ name: 'Multi-language Routing', Icon: null },
					{ name: 'i18next', Icon: SiI18next },
					{ name: 'Wordpress', Icon: SiWordpress },
					{ name: 'Twitter API', Icon: SiTwitter },
					{ name: 'Instagram API', Icon: SiInstagram },
					{ name: 'Facebook API', Icon: SiFacebook },
					{ name: 'YouTube API', Icon: SiYoutube },
					{ name: 'Google Tag Manager', Icon: SiGoogletagmanager },
				],
				responsibilities: ['Website (front-end)'],
				achievements: [
					{ description: 'Built this website from the ground up until it went live' },
					{ description: 'Fully responsive, supports keyboard navigation and screen readers' },
					{ description: 'Integrated Google Tag Manager along with following the best SEO practices' },
				],
			},
			{
				hideOnHomepage: true,
				name: 'BMW Foundation',
				id: 'bmw-foundation-tt',

				renderTitle: () => (
					<>
						<Anchor href="https://bmw-foundation.org/">
							<Text as="span">BMW Foundation</Text>
						</Anchor>{' '}
						and{' '}
						<Anchor href="https://twentythirty.com/">
							<Text as="span">TwentyThirty</Text>
						</Anchor>
					</>
				),

				description: (
					<>
						An informative website of the BMW Foundation's mission, plans and events. The website features advanced
						accessibility features and multi-language routing.
					</>
				),
				technologies: [
					{ name: 'React', Icon: SiReact },
					{ name: 'Gatsby.js', Icon: SiGatsby },
					{ name: 'TypeScript', Icon: SiTypescript },
					{ name: 'Material UI', Icon: null },
					{ name: 'JSS', Icon: SiJss },
					{ name: 'Multi-language Routing', Icon: null },
					{ name: 'Responsive UI', Icon: null },
					{ name: 'i18next', Icon: SiI18next },
					{ name: 'Wordpress', Icon: SiWordpress },
					{ name: 'Twitter API', Icon: SiTwitter },
					{ name: 'Instagram API', Icon: SiInstagram },
					{ name: 'Facebook API', Icon: SiFacebook },
					{ name: 'YouTube API', Icon: SiYoutube },
					{ name: 'Google Tag Manager', Icon: SiGoogletagmanager },
				],
				responsibilities: ['Website (front-end)'],
				achievements: [
					{ description: 'Launched two responsive websites with keyboard navigation and screen reader support' },
					{
						description:
							'Created accessibility menu with high contrast mode, dyslexia-friendly font, and animations toggle',
					},
					{ description: 'Integrated Google Tag Manager and followed SEO best practices' },
				],
			},
			{
				name: 'Educational platform',
				id: 'educational-platform',
				description: (
					<>
						An educational platform where professors can upload and schedule lectures to different classes,
						automatically create and share Zoom meeting links after a lecture have been seen by all the students to
						discuss it, create assignments, quizzes and grade students. We built two mobile apps for Android and iOS, an
						admin dashboard where professors can manage lectures, send emails with grades to students' parents
					</>
				),
				achievements: [
					{
						description:
							'Built back-end API with Express.js and Firebase for authentication, file uploads, emails, and database queries',
					},
					{ description: 'Integrated Zoom for automatic meeting link creation and email sending to students' },
					{ description: 'Built admin dashboard for lecture management and grade emailing to parents' },
				],
				technologies: [
					{ name: 'Firebase', Icon: SiFirebase },
					{ name: 'Express.js', Icon: SiExpress },
					{ name: 'TypeScript ', Icon: SiTypescript },
					{ name: 'Sendgrid', Icon: null },
					{ name: 'React', Icon: SiReact },
					{ name: 'Material UI', Icon: null },
					{ name: 'JSS', Icon: SiJss },
					{ name: 'Formik', Icon: null },
					{ name: 'Yup', Icon: null },
					{ name: 'Zoom API', Icon: SiZoom },
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
		title: {
			role: 'full',
			senior: false,
		},
		projects: [
			{
				name: 'Asset Tracking System',
				id: 'asset-tracking-system',
				hideOnHomepage: true,
				hideOnResume: true,
				description: (
					<>
						A web application for an asset tracking system designed to manage, track and generate statistics about
						equipment and their status
					</>
				),
				technologies: [
					{ name: 'React', Icon: SiReact },
					{ name: 'JavaScript', Icon: SiJavascript },
					{ name: 'Material UI', Icon: null },
					{ name: 'Feathers.js', Icon: null },
					{ name: 'MongoDB', Icon: SiMongodb },
				],
				achievements: [{ description: 'Optimized API response time by 200% by using MongoDB caching with Redis' }],
				responsibilities: ['Front-end Web App', 'Back-end APIs'],
			},
			{
				name: 'Netjeek',
				id: 'netjeek',
				Logo: NetjeekLogo,
				description: (
					<>
						Designed and implemented an eCommerce trans-shipping system designed to facilitate the purchase and delivery
						of goods to countries where customers can’t place an order to international e-retailers directly
					</>
				),
				technologies: [
					{ name: 'React', Icon: SiReact },
					{ name: 'JavaScript', Icon: SiJavascript },
					{ name: 'Material UI', Icon: null },
					{ name: 'JSS', Icon: SiJss },
					{ name: 'Express.js', Icon: SiExpress },
					{ name: 'Redux ', Icon: SiRedux },
					{ name: 'Stripe API', Icon: SiStripe },
					{ name: 'i18next', Icon: SiI18next },
					{ name: 'Google Maps', Icon: SiGooglemaps },
					{ name: 'JSDoc', Icon: null },
					{ name: 'React Testing Library', Icon: SiTestinglibrary },
					{ name: 'Python', Icon: SiPython },
				],
				achievements: [
					{ description: 'Conducted system analysis to define APIs with possible responses' },
					{ description: 'Designed and implemented eCommerce website for international customers' },
					{ description: 'Integrated Google Maps for delivery location pinpointing and detection' },
					{ description: 'Integrated Stripe for shipment payments' },
					{ description: 'Created mock API with configurable front end for each endpoint status code' },
				],
				responsibilities: ['eCommerce Website (front end)', 'System Analysis', 'Mock API creation'],
			},
		],
	},
];

export const allProjects = work.flatMap((w) => w.projects.map((p) => ({ ...p, company: w })));

export const projectPriority: Record<(typeof projectIds)[number], number> = {
	calqulate: 1,
	'quint-blog': 2,
	'quint-staking': 3,
	'bmw-foundation': 4,
	twentythirty: 5,
	'portfolio-website': 6,
	netjeek: 7,
	'educational-platform': 8,

	'bmw-foundation-tt': 100,
	'asset-tracking-system': 101,
};

// export const introText = (
// 	<>
// 		Highly motivated software engineer with 5 years of professional experience as a web developer mainly in front-end
// 		development using React, with excellent interpersonal skills to work with a team and clients and strong
// 		understanding of Typescript and web development fundamentals.
// 	</>
// );

export const telephoneNumber = '16479790872';
export const telephoneNumberStylized = '(647) 979-0872';
