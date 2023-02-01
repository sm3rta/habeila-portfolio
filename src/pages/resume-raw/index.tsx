import {
	AsProp,
	Badge,
	Box,
	Divider,
	Flex,
	Grid,
	GridItem,
	HopeProvider,
	Progress,
	ProgressIndicator,
	Text,
} from '@hope-ui/solid';
import { AiOutlineGithub } from 'solid-icons/ai';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine, RiDocumentBookMarkFill } from 'solid-icons/ri';
import { FaSolidLocationDot } from 'solid-icons/fa';
import { ComponentProps, For } from 'solid-js';
import { styled } from 'solid-styled-components';
import { telephoneNumber, telephoneNumberStylized, work } from '../../data/work';
import { darkTheme as theme } from '../../ui/theme';
import { socials } from '../home/Contact';
import { CompanyProjects } from '../resume/CompanyProjects';
import { Timeline } from '../resume/Timeline';
const ICON_SIZE = 20;

const secondaryTextAndIconColor = 'var(--hope-colors-neutral8)';

const StyledDivider = styled((props: any) => <Divider {...props} />)({
	marginBlock: '1rem',
	backgroundColor: 'var(--hope-colors-info12)',
	height: '2px',
});

const StyledFlexLink = (props: ComponentProps<typeof Flex> & AsProp<'a'>) => (
	<Flex alignItems="center" as="a" target="_blank" {...props} />
);

const ResumeRaw = ({ type = 'specialist' }: { type?: 'generalist' | 'specialist' }) => (
	<HopeProvider
		config={{
			lightTheme: {
				colors: { primary5: '#00254d' },
				fontSizes: theme.darkTheme.fontSizes,
			},
			components: {
				Anchor: {
					baseStyle: {
						textDecoration: 'underline',
						_hover: {
							color: 'var(--hope-colors-primary11)',
							'& *': { color: 'var(--hope-colors-primary11)' },
						},
					},
				},
				Badge: { baseStyle: { textTransform: 'none' } },
			},
		}}
	>
		<Flex background="$info12" direction="column" p="$8">
			<Text color="white" fontSize="$3xl" fontWeight="$extrabold">
				Ahmed Habeila
			</Text>
			<Text color="white" fontSize="$2xl">
				{type === 'generalist' ? 'Full-stack Web Developer' : 'Front-end Web Developer'}
			</Text>

			<Flex direction="column" rowGap="$4" mt="$4">
				<StyledFlexLink href="mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!">
					<HiOutlineMail size={ICON_SIZE} color={secondaryTextAndIconColor} />
					<Text ml="$2" color={secondaryTextAndIconColor} fontSize="$md">
						HabeilaAhmed@gmail.com
					</Text>
				</StyledFlexLink>
				<StyledFlexLink href={`tel:+${telephoneNumber}`}>
					<RiDeviceSmartphoneLine size={ICON_SIZE} color={secondaryTextAndIconColor} />
					<Text ml="$2" color={secondaryTextAndIconColor} fontSize="$md">
						{telephoneNumberStylized}
					</Text>
				</StyledFlexLink>
				<Flex alignItems="center">
					<FaSolidLocationDot size={ICON_SIZE} color={secondaryTextAndIconColor} />
					<Text ml="$2" color={secondaryTextAndIconColor} fontSize="$md">
						North York, ON, Canada
					</Text>
				</Flex>
			</Flex>

			<Flex gap="$8" mt="$4">
				<For
					each={[
						...socials.filter((s) => s.name),
						{
							name: 'Portfolio',
							href: 'https://habeila-portfolio.netlify.app/',
							Icon: RiDocumentBookMarkFill,
						},
					]}
				>
					{({ href, Icon, name }) => (
						<StyledFlexLink gap="$2" href={href}>
							<Icon size={ICON_SIZE} color={secondaryTextAndIconColor} />
							<Text color={secondaryTextAndIconColor}>{name}</Text>
						</StyledFlexLink>
					)}
				</For>
			</Flex>
		</Flex>

		<Flex direction="column" p="$8">
			<Text fontSize="$lg" fontWeight="$bold">
				ABOUT
			</Text>
			<StyledDivider />
			<Text>
				I am a software engineer with strong analytical and problem-solving skills. I have 4 years of professional
				experience, mainly in front-end development using <b>React</b>.
			</Text>
			<Text mt="$2">
				I worked on various projects and dived into a lot of concepts of front-end development, from content-driven
				websites focused on accessibility and SEO to data-driven web apps with complex forms, data-rich charts and
				tables, reusable UI components and design systems.
			</Text>
			<Text mt="$2"></Text>
		</Flex>

		<Grid templateColumns={{ '@lg': '3fr 1fr' }} p="$8" gap="$8">
			<GridItem flexDirection="column">
				<Text fontSize="$lg" fontWeight="$bold">
					WORK EXPERIENCE
				</Text>
				<StyledDivider />
				<Box css={{ '&>div': { p: 0 } }}>
					<Timeline>
						{work
							.filter((w) => w.name !== 'Self-employed')
							.map((company) => (
								<CompanyProjects company={company} />
							))}
					</Timeline>
				</Box>
			</GridItem>
			<GridItem flexDirection="column">
				<Text fontSize="$lg" fontWeight="$bold">
					SKILLS & TOOLS
				</Text>
				<StyledDivider />

				<Flex direction="column" gap="$2">
					<For
						each={[
							{ name: 'React', value: 96 },
							{ name: 'TypeScript', value: 94 },
							{ name: 'CSS', value: 90 },
							{ name: 'Node.js', value: 89 },
							{ name: 'Git', value: 87 },
						]}
					>
						{({ name, value }) => (
							<Flex direction="column" gap="$0_5">
								<Text>{name}</Text>
								<Progress size="xs" value={value}>
									<ProgressIndicator bgColor="$primary5 !important" />
								</Progress>
							</Flex>
						)}
					</For>
				</Flex>

				<Flex gap="$4" direction="column" mt="$8">
					<Flex gap="$2" wrap="wrap">
						{/* web dev */}
						<For each={['HTML', 'Javascript', 'Express.js', 'Responsive Design', 'GraphQL']}>
							{(item) => <Badge>{item}</Badge>}
						</For>
					</Flex>
					{/* soft skills, other web dev */}
					<Flex gap="$2" wrap="wrap">
						<For
							each={[
								'Jira',
								'Next.js',
								'JSS/Styled components',
								'Data fetching',
								'Localization',
								'Forms & validation',
								'Global State Design',
								'Code documentation',
							]}
						>
							{(item) => <Badge>{item}</Badge>}
						</For>
					</Flex>
					{/* others */}
					<Flex gap="$2" wrap="wrap">
						<For each={['Firebase', 'MongoDB', 'Postgres', 'Unit Testing']}>{(item) => <Badge>{item}</Badge>}</For>
					</Flex>
					{/* others */}
					<Flex gap="$2" wrap="wrap">
						<For each={['Solid JS', 'Vue', 'Python', 'C++']}>{(item) => <Badge>{item}</Badge>}</For>
					</Flex>
				</Flex>

				<Flex direction="column" mt="$8">
					<Text fontSize="$lg" fontWeight="$bold">
						LANGUAGES
					</Text>
					<StyledDivider />
					<Flex direction="column">
						<Flex>
							<Text d="contents">English</Text>
							<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
								{' '}
								(Fluent)
							</Text>
						</Flex>
					</Flex>
					<Flex>
						<Text d="contents">Arabic</Text>
						<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
							{' '}
							(Native)
						</Text>
					</Flex>
				</Flex>

				<Flex direction="column" mt="$8">
					<Text fontSize="$lg" fontWeight="$bold">
						SELF-TAUGHT COURSES
					</Text>
					<StyledDivider />
					<Flex direction="column">
						<Flex>
							<Text d="contents">Mastering React</Text>
							<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
								{' '}
								(by Mosh Hamedani)
							</Text>
						</Flex>
						<Flex>
							<Text d="contents">Node.js - The Complete Guide to Build RESTful APIs</Text>
							<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
								{' '}
								(by Mosh Hamedani)
							</Text>
						</Flex>
						<Flex>
							<Text d="contents">Vue - The Complete Guide (w/ Router, Vuex, Composition API)</Text>
							<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
								{' '}
								(by Maximilian Schwarzmüller)
							</Text>
						</Flex>
						<Flex>
							<Text d="contents">CSS - The Complete Guide</Text>
							<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
								{' '}
								(by Maximilian Schwarzmüller)
							</Text>
						</Flex>

						<Flex>
							<Text d="contents">Master C++ and OOP</Text>
							<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
								{' '}
								(Learncpp.com)
							</Text>
						</Flex>

						<Flex>
							<Text d="contents">Introduction to Game Development Specialization</Text>
							<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
								{' '}
								(Coursera)
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Flex direction="column" mt="$8">
					<Text fontSize="$lg" fontWeight="$bold">
						EDUCATION
					</Text>
					<StyledDivider />

					<Text fontWeight="$bold">Bachelor's Degree of Computer Science and Automatic Control</Text>
					<Text>Faculty of Engineering - Tanta University</Text>
					<Text fontSize="$sm">2014 - 2019</Text>
				</Flex>

				<Flex direction="column" mt="$8">
					<Text fontSize="$lg" fontWeight="$bold">
						GRADUATION PROJECT{' '}
					</Text>
					<StyledDivider />
					<StyledFlexLink href="https://github.com/darwishdd/cpp_webapi_framework" d="block !important">
						<Text mr="$2" fontWeight="$bold" d="contents" as="span">
							An Express-like C++ web application framework
						</Text>
						<AiOutlineGithub
							size={ICON_SIZE}
							color="$primary5"
							style={{ display: 'inline', 'margin-left': '8px', 'vertical-align': 'baseline' }}
						/>
					</StyledFlexLink>
					<Text>
						A simple-to-use web development framework with an easy syntax inspired by Express.js that lets developers
						build full-fledged back-end multi-threaded api servers and connect it to the desired database in C++ that
						also supports middleware.
					</Text>
					<Flex gap="$2" wrap="wrap" mt="$4">
						<For each={['C++17', 'CGI', 'Apache', 'Multithreading', 'Linux']}>{(item) => <Badge>{item}</Badge>}</For>
					</Flex>
				</Flex>
			</GridItem>
		</Grid>
	</HopeProvider>
);

export default ResumeRaw;
