import {
	AsProp,
	Badge,
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	GridItem,
	HopeProvider,
	Input,
	Progress,
	ProgressIndicator,
	Radio,
	RadioGroup,
	Text,
} from '@hope-ui/solid';
import { AiOutlineGithub } from 'solid-icons/ai';
import { FaSolidLocationDot } from 'solid-icons/fa';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine, RiDocumentBookMarkFill } from 'solid-icons/ri';
import { ComponentProps, For, Show, createSignal, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { telephoneNumber, telephoneNumberStylized, work } from '../../data/work';
import { colors, darkTheme as theme } from '../../ui/theme';
import { socials } from '../home/Contact';
import { CompanyProjects } from '../resume/CompanyProjects';
import { Timeline } from '../resume/Timeline';

const ICON_SIZE = 20;

const secondaryTextAndIconColorHeader = 'var(--hope-colors-neutral8)';
const secondaryTextColor = 'var(--hope-colors-neutral9)';

const StyledDivider = styled((props: any) => <Divider {...props} />)({
	marginBlock: '1rem',
	backgroundColor: 'var(--hope-colors-info12)',
	height: '2px',
});

const StyledFlexLink = (props: ComponentProps<typeof Flex> & AsProp<'a'>) => (
	<Flex alignItems="center" as="a" target="_blank" {...props} />
);

const ResumeRaw = () => {
	const [showControls, setShowControls] = createSignal(false);
	const [skill1, setSkill1] = createSignal('React');
	const [skill2, setSkill2] = createSignal('Typescript');
	const [skill3, setSkill3] = createSignal('HTML/CSS');
	// TODO: software engineer option
	const [jobType, setJobType] = createSignal<'full-stack' | 'front-end' | 'softwareEngineer'>('front-end');
	const [orgType, setOrgType] = createSignal<'startup' | 'organization'>('organization');

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === '/' || e.code === 'NumpadEnter') setShowControls(!showControls());
	};

	onMount(() => {
		document.body.onkeydown = handleKeyDown;
	});
	onCleanup(() => {
		document.body.onkeydown = null;
	});

	const createOnChangeHandler = (setFn: (value: string) => void) => (e: Event) => {
		const { value } = e.target as HTMLInputElement;
		setFn(value);
	};

	return (
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
			<Show when={showControls()}>
				<Box display="grid" gridTemplateColumns="1fr 1fr" maxW="500px" p="$4" rowGap="$4">
					<Text>Skill 1</Text>
					<Input value={skill1()} onChange={createOnChangeHandler(setSkill1)}></Input>
					<Text>Skill 2</Text>
					<Input value={skill2()} onChange={createOnChangeHandler(setSkill2)}></Input>
					<Text>Skill 3</Text>
					<Input value={skill3()} onChange={createOnChangeHandler(setSkill3)}></Input>
					<Text>Type</Text>
					<RadioGroup defaultValue="front-end">
						<Flex direction="column" gap="$4">
							<Radio value="front-end" onChange={() => setJobType('front-end')}>
								Specialist/Front-end
							</Radio>
							<Radio value="full-stack" onChange={() => setJobType('full-stack')}>
								Generalist/Full-stack
							</Radio>
						</Flex>
					</RadioGroup>
					<Text>Organization type</Text>
					<RadioGroup defaultValue="front-end">
						<Flex direction="column" gap="$4">
							<Radio value="front-end" onChange={() => setOrgType('organization')}>
								Big organization
							</Radio>
							<Radio value="full-stack" onChange={() => setOrgType('startup')}>
								Startup
							</Radio>
						</Flex>
					</RadioGroup>
				</Box>
			</Show>
			<Button
				background="none"
				pos="fixed"
				borderRadius={0}
				_hover={{ background: colors.primary5 }}
				top="0"
				right="0"
				height={40}
				width={40}
				onClick={() => setShowControls(!showControls())}
			/>
			<Flex background="$info12" direction="column" p="$8">
				<Box>
					<Text color="white" fontSize="$3xl" fontWeight="$extrabold" as="span">
						Ahmed Habeila
					</Text>
					<Text color={secondaryTextAndIconColorHeader} fontSize="$md" as="span">
						{' (He/Him)'}
					</Text>
				</Box>
				<Text color="white" fontSize="$2xl">
					{jobType() === 'full-stack' ? 'Full-stack Web Developer' : 'Front-end Web Developer'}
				</Text>

				<Flex direction="column" rowGap="$4" mt="$4">
					<StyledFlexLink href="mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!">
						<HiOutlineMail size={ICON_SIZE} color={secondaryTextAndIconColorHeader} />
						<Text ml="$2" color={secondaryTextAndIconColorHeader} fontSize="$md">
							HabeilaAhmed@gmail.com
						</Text>
					</StyledFlexLink>
					<StyledFlexLink href={`tel:+${telephoneNumber}`}>
						<RiDeviceSmartphoneLine size={ICON_SIZE} color={secondaryTextAndIconColorHeader} />
						<Text ml="$2" color={secondaryTextAndIconColorHeader} fontSize="$md">
							{telephoneNumberStylized}
						</Text>
					</StyledFlexLink>
					<Flex alignItems="center">
						<FaSolidLocationDot size={ICON_SIZE} color={secondaryTextAndIconColorHeader} />
						<Text ml="$2" color={secondaryTextAndIconColorHeader} fontSize="$md">
							North York, ON, Canada
						</Text>
					</Flex>
				</Flex>

				<Flex gap="$8" mt="$4">
					<For
						each={[
							{
								name: 'Portfolio',
								href: 'https://habeila-portfolio.netlify.app/',
								Icon: RiDocumentBookMarkFill,
							},
							socials.find((s) => s.name === 'LinkedIn')!,
							socials.find((s) => s.name === 'Github')!,
							// ...socials.filter((s) => s.name).reverse(),
						]}
					>
						{({ href, Icon, name }) => (
							<StyledFlexLink gap="$2" href={href}>
								<Icon size={ICON_SIZE} color={secondaryTextAndIconColorHeader} />
								<Text color={secondaryTextAndIconColorHeader}>{name}</Text>
							</StyledFlexLink>
						)}
					</For>
				</Flex>
			</Flex>

			<Flex direction="column" m="$8">
				<Text fontSize="$lg" fontWeight="$bold">
					CAREER OBJECTIVE
				</Text>
				<StyledDivider />
				<Text>
					Highly motivated software engineer with 5 years of professional experience as a web developer and flexibility
					to work on any stack. Strong understanding of <b>{skill1()}</b>, <b>{skill2()}</b>
					{skill3() && (
						<>
							, <b>{skill3()}</b>{' '}
						</>
					)}
					and web development fundamentals. Excellent interpersonal skills to work with a team and clients. Looking to
					secure a position in a{' '}
					{orgType() === 'organization' ? 'reputable progressive organization' : 'progressive startup'} to expand my
					learnings, knowledge, and skills in web development
					{jobType() === 'front-end' ? ', mainly in front-end development using React.' : '.'}
				</Text>

				<Text mt="$2">
					Worked on various projects and dived into a lot of concepts of{' '}
					{jobType() === 'front-end' ? 'front-end' : 'web'} development, from content-driven websites focused on
					accessibility, keyboard navigation and SEO to data-driven web apps with complex forms, data-rich charts and
					tables, reusable UI components and design systems.
				</Text>
			</Flex>

			<Grid m="$8" gap="$8">
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
									<CompanyProjects forceGeneralist={() => jobType() === 'full-stack'} company={company} />
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
								{ name: 'React', value: 95 },
								{ name: 'JavaScript', value: 95 },
								{ name: 'TypeScript', value: 94 },
								{ name: 'HTML', value: 93 },
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
							{/* front end theming */}
							<For
								each={[
									'SCSS/Sass',
									'Styled components',
									'JSS',
									'Material UI',
									'Ant Design',
									'Tailwind CSS',
									'Responsive UI',
								]}
							>
								{(item) => <Badge>{item}</Badge>}
							</For>
						</Flex>
						{/* front end tools and frameworks */}
						<Flex gap="$2" wrap="wrap">
							<For
								each={[
									'Webpack',
									'D3.js',
									'DevExpress',
									'i18next',
									'JSDoc',

									// Forms & validation,
									// 'Formik',
									// 'Yup',
									// 'react-hook-form',
									// 'zod',
									//  Global State Design,
									'Redux',
									'Redux-Toolkit',
									'Zustand',
									'react-query',

									// Authentication
									'Auth0',
								]}
							>
								{(item) => <Badge>{item}</Badge>}
							</For>
						</Flex>
						{/* backend */}
						<Flex gap="$2" wrap="wrap">
							<For each={['PostgreSQL', 'GraphQL/Apollo', 'Express.js', 'MongoDB', 'Firebase', 'Unit Testing']}>
								{(item) => <Badge>{item}</Badge>}
							</For>
						</Flex>
						{/* version control */}
						<Flex gap="$2" wrap="wrap">
							<For each={['GitHub', 'BitBucket', 'Agile', 'Jira', 'CI/CD ']}>{(item) => <Badge>{item}</Badge>}</For>
						</Flex>
						{/* other */}
						<Flex gap="$2" wrap="wrap">
							<For each={['Python', 'Solid JS', 'C++', 'Vue.js', 'Next.js']}>{(item) => <Badge>{item}</Badge>}</For>
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
								<Text d="contents" fontSize="$sm" color={secondaryTextColor}>
									{' '}
									(Fluent)
								</Text>
							</Flex>
						</Flex>
						<Flex>
							<Text d="contents">Arabic</Text>
							<Text d="contents" fontSize="$sm" color={secondaryTextColor}>
								{' '}
								(Native)
							</Text>
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
							build full-fledged back-end multi-threaded API servers and connect it to the desired database in C++ that
							also supports middleware.
						</Text>
						<Flex gap="$2" wrap="wrap" mt="$4">
							<For each={['C++17', 'CGI', 'Apache', 'Multithreading', 'Linux']}>{(item) => <Badge>{item}</Badge>}</For>
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
								<Text d="contents" fontSize="$sm" color={secondaryTextColor}>
									{' '}
									(by Mosh Hamedani)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">Node.js - The Complete Guide to Build RESTful APIs</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextColor}>
									{' '}
									(by Mosh Hamedani)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">Vue - The Complete Guide (w/ Router, Vuex, Composition API)</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextColor}>
									{' '}
									(by Maximilian Schwarzmüller)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">CSS - The Complete Guide</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextColor}>
									{' '}
									(by Maximilian Schwarzmüller)
								</Text>
							</Flex>

							<Flex>
								<Text d="contents">Master C++ and OOP</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextColor}>
									{' '}
									(Learncpp.com)
								</Text>
							</Flex>

							<Flex>
								<Text d="contents">Introduction to Game Development Specialization</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextColor}>
									{' '}
									(Coursera)
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</GridItem>
			</Grid>
		</HopeProvider>
	);
};

export default ResumeRaw;
