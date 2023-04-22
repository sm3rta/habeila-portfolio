import { List, ListItem } from '@hope-ui/solid';
import { For } from 'solid-js';
import { Text } from '../../ui/Text';

export const _resumeSkills = [
	'Adobe Illustrator',
	'Adobe Photoshop',
	'agile',
	'AngularJS',
	'application development',
	'architecture',
	'Astro',
	'AWS',
	'AWS Amplify',
	'BackEnd',
	'Back End',
	'Back-End',
	'Back-end development',
	'Bootstrap.js',
	'Cascading Style Sheets',
	'cloud',
	'Collaborative',
	'Collaboration',
	'Communication Skills',
	'Computer Science',
	'CSS',
	'CSS3',
	'D3',
	'D3.js',
	'Database',
	'design',
	'detail-oriented',
	'Devexpress',
	'Disqus',
	'Django',
	'documentation',
	'e-commerce',
	'eCommerce',
	'Express',
	'Express.js',
	'Facebook API',
	'fast-paced',
	'Firebase',
	'flexible',
	'Front End Design',
	'FrontEnd',
	'Front End',
	'Front-End',
	'Front-end development',
	'Gatsby.js',
	'Git',
	'GitLab',
	'Google Maps',
	'Google Tag Manager',
	'Graphic Design',
	'GraphQL',
	'growth',
	'Hasura',
	'HTML',
	'HTML5',
	'i18next',
	'Innovation',
	'Instagram API',
	'JavaScript',
	'jQuery',
	'JSON',
	'JSS',
	'maintenance',
	'management',
	'Material UI',
	'MongoDB',
	'MS Office',
	'Multi-language Routing',
	'Netlify',
	'Next',
	'Next.js',
	'Node',
	'Node.js',
	'planning',
	'prioritization',
	'Python',
	'RDFa',
	'React',
	'React Native',
	'React.js',
	'React Testing Library',
	'Redux',
	'Responsive UI',
	'Saas',
	'Scheduling',
	'Search Engine Optimization',
	'SEO',
	'Sendgrid',
	'Sentry',
	'Software development',
	'Software Engineering',
	'Solid.js',
	'Storybook',
	'Stripe API',
	'Styled components',
	'Tailwind CSS',
	'Technical',
	'test',
	'testing',
	'time management',
	'Troubleshooting',
	'Turborepo',
	'Twitter API',
	'TypeScript',
	'User Experience',
	'User Interface',
	'User Interface Design',
	'Web 3',
	'Web Design',
	'Web Development',
	'Wordpress',
	'YouTube API',
	'Zoom API',
	'Webpack',
	'debugging',
	'workflows',
	'performance testing',
	'mocha',
	'coding',
	'frameworks',
	'web applications',
	'information technology',
	'concepts',
	'codebase',
	'Project Management',
	'technology',
	'Arabic',
	'scrum',
	'security',
	'automation',
	'Front End Coding',
	'Quality Assurance',
	'Efficiency',
	'Production',
	'Collaborate',
	'problem solving',
	'data structures',
	'algorithms',
	'agile development',
	'leadership',
	'leading',
	'monitoring',
	'mentoring',
	'supervising',
	'code review',
	'reviewing',
	'pull requests',
	'interact',
	'recommend',
	'UI/UX',
	'optimization',
	'innovation',
	'support',
	'organize',
	'analyze',
	'Fast-paced environment',
	'Work under pressure',
	'Tight deadlines',
	'Repetitive tasks',
	'Manual dexterity',
	'Attention to detail',
	'Ability',
	'distinguish between colours',
	'Sitting',
	'Accurate',
	'Client focus',
	'Efficient',
	'interpersonal skills',
	'oral communication',
	'Excellent',
	'written communication',
	'Initiative',
	'Judgement',
	'Organized',
	'Team player',
	'Dependability',
	'analysis',
	'Client focus',
	'OpenGL',
	'Unity',
	'Web 3',
	'Wagmi',
	'Curious',
	'unit tests',
	'integration tests',
	'Jest',
	'Cypress',
];

const resumeSkills = [...new Set(_resumeSkills)];

export const Keywords = () => (
	<List color="white" styleType="none" mt="$8">
		<Text fontSize={1}>Skills:</Text>
		<For each={resumeSkills}>{(skill) => <ListItem fontSize={1}>{skill}</ListItem>}</For>
	</List>
);
