import {
	Anchor,
	Box,
	Divider,
	Flex,
	Grid,
	HopeProvider,
	IconButton,
	Input,
	NotificationsProvider,
	PropsOf,
	Radio,
	RadioGroup,
	Text,
	notificationService,
} from '@hope-ui/solid';
import { useSearchParams } from '@solidjs/router';
import { BsPrinter } from 'solid-icons/bs';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine, RiDocumentBookMarkFill } from 'solid-icons/ri';
import {
	SiApache,
	SiApollographql,
	SiAuth0,
	SiBitbucket,
	SiCplusplus,
	SiD3dotjs,
	SiDevexpress,
	SiExpress,
	SiFirebase,
	SiGithub,
	SiGitlab,
	SiGraphql,
	SiI18next,
	SiJest,
	SiJira,
	SiJss,
	SiLinux,
	SiMongodb,
	SiNextdotjs,
	SiPostgresql,
	SiPython,
	SiReactquery,
	SiRedux,
	SiSass,
	SiSolid,
	SiStyledcomponents,
	SiTailwindcss,
	SiVuedotjs,
	SiWebpack,
} from 'solid-icons/si';
import { TbStackPop } from 'solid-icons/tb';
import { ComponentProps, For, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { telephoneNumber, telephoneNumberStylized, website, work } from '../../data/work';
import { colors, darkTheme as theme } from '../../ui/theme';
import { printWidth } from '../../utils';
import { socials } from '../home/Contact';
import { SkillBadge } from '../home/SkillBadge';
import { CompanyProjects } from '../resume/CompanyProjects';
import { Timeline } from '../resume/Timeline';

const ICON_SIZE = 20;

const secondaryTextAndIconColorHeader = 'var(--hope-colors-neutral8)';
const secondaryTextColor = 'var(--hope-colors-neutral9)';

const StyledDivider = styled((props: PropsOf<typeof Divider>) => <Divider {...props} />)({
	marginBlock: '1rem',
	backgroundColor: 'var(--hope-colors-info12)',
	height: '2px',
});

const StyledFlexLink = (props: ComponentProps<typeof Flex>) => (
	<Anchor d="flex" target="_blank" alignItems="center" w="fit-content" {...props} />
);

export type Params = {
	skill1: string;
	skill2: string;
	skill3: string;
	senior: string;
	jobType: 'full-stack' | 'front-end' | 'softwareEngineer';
};

const ResumeRaw = () => {
	const [showControls, setShowControls] = createSignal(false);

	const [params, setParams] = useSearchParams<Params>();

	const [skill1, setSkill1] = createSignal(params.skill1 ?? undefined);
	const [skill2, setSkill2] = createSignal(params.skill2 ?? undefined);
	const [skill3, setSkill3] = createSignal(params.skill3 ?? undefined);
	const [senior, setSenior] = createSignal(params.senior ? params.senior === 'true' : false);
	const [jobType, setJobType] = createSignal<'full-stack' | 'front-end' | 'softwareEngineer'>(
		params.jobType ?? 'front-end'
	);

	createEffect(() => {
		setParams(
			{
				skill1: skill1(),
				skill2: skill2(),
				skill3: skill3(),
				senior: senior().toString(),
				jobType: jobType(),
			},
			{ replace: true }
		);
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'NumpadEnter') setShowControls(!showControls());
	};

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);
	});
	onCleanup(() => {
		document.removeEventListener('keydown', handleKeyDown);
	});

	const createOnChangeHandler = (setFn: (value: string) => void) => (e: Event) => {
		const { value } = e.target as HTMLInputElement;
		setFn(value);
	};

	const printPage = async () => {
		const root = document.getElementById('root');
		if (!root) return;

		root.style.width = `${printWidth}px`;
		const height = root.scrollHeight;
		root.style.width = '';

		const body = {
			url: window.location.href,
			baseUrl: window.location.origin + window.location.pathname,
			height,
		};

		await fetch('http://localhost:3001/', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'post',
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (res.status === 200) {
					notificationService.show({
						title: 'Printed successfully',
						status: 'success',
					});
					return res.blob();
				} else {
					notificationService.show({
						title: 'Print failed',
						status: 'danger',
					});
				}
			})
			// to download file
			// .then((blob) => {
			// 	if (blob) {
			// 		var file = window.URL.createObjectURL(blob);
			// 		window.location.assign(file);
			// 	}
			// })
			.catch(() => {
				notificationService.show({
					title: 'Print failed',
					status: 'danger',
				});
			});
	};

	const iconButtonProps = {
		background: 'none',
		borderRadius: 0,
		height: 40,
		width: 40,
		css: { '&>svg': { opacity: 0, transition: 'opacity 0.3s ease' } },
		_hover: { background: colors.primary5, '&>svg': { opacity: 1 } },
	};

	const skills = () => [skill1(), skill2(), skill3()].filter(Boolean);
	const forceRole = () => (jobType() === 'full-stack' ? 'full' : jobType() === 'softwareEngineer' ? 'se' : undefined);
	const forceNonSenior = () => (senior() ? undefined : true);

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
			<NotificationsProvider>
				<Show when={showControls()}>
					<Box display="grid" gridTemplateColumns="1fr 1fr" maxW="500px" p="$4" rowGap="$8">
						<Text>Skill 1</Text>
						<Input value={skill1()} onChange={createOnChangeHandler(setSkill1)} />
						<Text>Skill 2</Text>
						<Input value={skill2()} onChange={createOnChangeHandler(setSkill2)} />
						<Text>Skill 3</Text>
						<Input value={skill3()} onChange={createOnChangeHandler(setSkill3)} />
						<Text>Type</Text>
						<RadioGroup defaultValue={jobType()}>
							<Flex direction="column" gap="$4">
								<Radio value="front-end" onChange={() => setJobType('front-end')}>
									Specialist/Front-end
								</Radio>
								<Radio value="full-stack" onChange={() => setJobType('full-stack')}>
									Generalist/Full-stack
								</Radio>
								<Radio value="softwareEngineer" onChange={() => setJobType('softwareEngineer')}>
									Software Engineer
								</Radio>
							</Flex>
						</RadioGroup>
						{/* <Text>Organization type</Text>
						<RadioGroup defaultValue={orgType()}>
							<Flex direction="column" gap="$4">
								<Radio value="organization" onChange={() => setOrgType('organization')}>
									Big organization
								</Radio>
								<Radio value="startup" onChange={() => setOrgType('startup')}>
									Startup
								</Radio>
							</Flex>
						</RadioGroup> */}
						<Text>Seniority</Text>
						<RadioGroup defaultValue={senior().toString()}>
							<Flex direction="column" gap="$4">
								<Radio value="true" onChange={() => setSenior(true)}>
									Senior
								</Radio>
								<Radio value="false" onChange={() => setSenior(false)}>
									Junior
								</Radio>
							</Flex>
						</RadioGroup>
					</Box>
				</Show>
				<Box pos="fixed" top="0" right="0">
					{/* <IconButton {...iconButtonProps} onClick={() => setPage('work')} aria-label="Left" icon={<BsChevronLeft />} /> */}
					<IconButton
						{...iconButtonProps}
						onClick={() => setShowControls(!showControls())}
						aria-label="Up"
						icon={<TbStackPop />}
					/>
					{/* <IconButton
					{...iconButtonProps}
					onClick={() => setPage('skills')}
					aria-label="Right"
					icon={<BsChevronRight />}
				/> */}
					<IconButton {...iconButtonProps} onClick={printPage} aria-label="Print" icon={<BsPrinter />} />
				</Box>

				<Flex background="$info12" direction="column" p="$8">
					<Box>
						<Text color="white" fontSize="$3xl" lineHeight="normal" fontWeight="$extrabold" as="span">
							Ahmed Habeila
						</Text>
						{/* <Text color={secondaryTextAndIconColorHeader} as="span">
							{' (He/Him)'}
						</Text> */}
					</Box>
					<Text color="white" fontSize="$2xl">
						{jobType() === 'full-stack'
							? 'Full-stack Web Developer'
							: jobType() === 'softwareEngineer'
							? 'Software Engineer'
							: 'Front-end Web Developer'}
					</Text>

					<Flex direction="column" rowGap="$4" mt="$4">
						<StyledFlexLink href="mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!" textDecoration="none">
							<HiOutlineMail size={ICON_SIZE} color={secondaryTextAndIconColorHeader} />
							<Text ml="$2" color={secondaryTextAndIconColorHeader}>
								HabeilaAhmed@gmail.com
							</Text>
						</StyledFlexLink>
						<StyledFlexLink href={`tel:+${telephoneNumber}`} textDecoration="none">
							<RiDeviceSmartphoneLine size={ICON_SIZE} color={secondaryTextAndIconColorHeader} />
							<Text ml="$2" color={secondaryTextAndIconColorHeader}>
								{telephoneNumberStylized}
							</Text>
						</StyledFlexLink>
						{/* <Flex alignItems="center">
							<FaSolidLocationDot size={ICON_SIZE} color={secondaryTextAndIconColorHeader} />
							<Text ml="$2" color={secondaryTextAndIconColorHeader}>
								North York, ON, Canada
							</Text>
						</Flex> */}
					</Flex>

					<Flex gap="$8" mt="$4">
						<For
							each={[
								{
									name: 'Portfolio',
									href: website,
									Icon: RiDocumentBookMarkFill,
								},
								socials.find((s) => s.name === 'LinkedIn')!,
								socials.find((s) => s.name === 'Github')!,
							]}
						>
							{({ href, Icon, name }) => (
								<StyledFlexLink
									gap="$2"
									href={href}
									as={Anchor}
									css={{
										textDecorationColor: `${secondaryTextAndIconColorHeader} !important`,
									}}
								>
									<Icon size={ICON_SIZE} color={secondaryTextAndIconColorHeader} />
									<Text color={secondaryTextAndIconColorHeader}>{name}</Text>
								</StyledFlexLink>
							)}
						</For>
					</Flex>
				</Flex>

				<Show when={skill1()}>
					<Flex direction="column" m="$8">
						<Text fontSize="$lg" fontWeight="$bold">
							SUMMARY
						</Text>
						<StyledDivider />
						<Text>
							Highly motivated software engineer with 5 years of professional experience as a{' '}
							{jobType() === 'front-end'
								? 'front-end web developer.'
								: 'web developer with flexibility to work on any stack.'}{' '}
							Strong understanding of{' '}
							<For each={skills()}>
								{(skill, i) => (
									<>
										<b>{skill}</b>
										{i() < skills().length - 1 && ', '}
									</>
								)}
							</For>{' '}
							and web development fundamentals.
							{/* Excellent interpersonal skills to work with a team and clients. Looking to
						secure a position in a{' '}
						{orgType() === 'organization' ? 'reputable progressive organization' : 'progressive startup'} to expand my
					learnings, knowledge, and skills in web development. */}
						</Text>

						{/* <Text mt="$2">
						Worked on various projects and dived into a lot of concepts of{' '}
						{jobType() === 'front-end' ? 'front-end' : 'web'} development, from content-driven websites focused on
						accessibility, keyboard navigation and SEO to data-driven web apps with complex forms, data-rich charts and
						tables, reusable UI components and design systems.
					</Text> */}
					</Flex>
				</Show>

				<Grid m="$8">
					<Text fontSize="$lg" fontWeight="$bold">
						WORK EXPERIENCE
					</Text>
					<StyledDivider />
					<Box css={{ '&>div': { p: 0 } }}>
						<Timeline
							children={work.map((company) => (
								<CompanyProjects forceRole={forceRole} company={company} forceNonSenior={forceNonSenior} />
							))}
						/>
					</Box>
				</Grid>

				<Grid m="$8" pb="$4">
					{/* <Text fontSize="$lg" fontWeight="$bold">
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
					</Flex> */}

					<Flex gap="$4" direction="column" mt="$8" d="none !important">
						<Flex gap="$2" wrap="wrap">
							{/* front end theming */}
							<For
								each={[
									{ name: 'SCSS/Sass', Icon: SiSass },
									{ name: 'Styled components', Icon: SiStyledcomponents },
									{ name: 'JSS', Icon: SiJss },
									{ name: 'Material UI', Icon: null },
									{ name: 'Tailwind CSS', Icon: SiTailwindcss },
									{ name: 'Responsive UI', Icon: null },
								]}
							>
								{(skill) => <SkillBadge skill={skill} />}
							</For>
						</Flex>
						{/* front end tools and frameworks */}
						<Flex gap="$2" wrap="wrap">
							<For
								each={[
									{ name: 'Webpack', Icon: SiWebpack },
									{ name: 'D3.js', Icon: SiD3dotjs },
									{ name: 'DevExpress', Icon: SiDevexpress },
									{ name: 'i18next', Icon: SiI18next },
									{ name: 'JSDoc', Icon: null },

									// Forms & validation,
									// 'Formik',
									// 'Yup',
									// 'react-hook-form',
									// 'zod',
									//  Global State Design,
									{ name: 'Redux', Icon: SiRedux },
									{ name: 'Redux-Toolkit', Icon: SiRedux },
									{ name: 'Zustand', Icon: null },
									{ name: 'react-query', Icon: SiReactquery },

									// Authentication
									{ name: 'Auth0', Icon: SiAuth0 },
								]}
							>
								{(skill) => <SkillBadge skill={skill} />}
							</For>
						</Flex>
						{/* backend */}
						<Flex gap="$2" wrap="wrap">
							<For
								each={[
									{ name: 'PostgreSQL', Icon: SiPostgresql },
									{ name: 'GraphQL', Icon: SiGraphql },
									{ name: 'Apollo', Icon: SiApollographql },
									{ name: 'Express.js', Icon: SiExpress },
									{ name: 'MongoDB', Icon: SiMongodb },
									{ name: 'Firebase', Icon: SiFirebase },
									{ name: 'Unit Testing', Icon: SiJest },
								]}
							>
								{(skill) => <SkillBadge skill={skill} />}
							</For>
						</Flex>
						{/* version control */}
						<Flex gap="$2" wrap="wrap">
							<For
								each={[
									{ name: 'GitHub', Icon: SiGithub },
									{ name: 'GitLab', Icon: SiGitlab },
									{ name: 'BitBucket', Icon: SiBitbucket },
									{ name: 'Agile', Icon: null },
									{ name: 'Jira', Icon: SiJira },
									{ name: 'CI/CD ', Icon: null },
								]}
							>
								{(skill) => <SkillBadge skill={skill} />}
							</For>
						</Flex>
						{/* other */}
						<Flex gap="$2" wrap="wrap">
							<For
								each={[
									{ name: 'Python', Icon: SiPython },
									{ name: 'Solid JS', Icon: SiSolid },
									{ name: 'C++', Icon: SiCplusplus },
									{ name: 'Vue.js', Icon: SiVuedotjs },
									{ name: 'Next.js', Icon: SiNextdotjs },
								]}
							>
								{(skill) => <SkillBadge skill={skill} />}
							</For>
						</Flex>
					</Flex>

					{/* <Flex direction="column" mt="$8">
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
					</Flex> */}

					<Flex direction="column">
						<Text fontSize="$lg" fontWeight="$bold">
							EDUCATION
						</Text>
						<StyledDivider />
						<Text fontWeight="$bold">Bachelor's Degree of Computer Science and Automatic Control</Text>
						<Text>Tanta University of Engineering</Text>
						<Text fontSize="$sm">2014 - 2019</Text>
					</Flex>

					<Flex direction="column" mt="$8">
						<Text fontSize="$lg" fontWeight="$bold">
							GRADUATION PROJECT{' '}
						</Text>
						<StyledDivider />
						<StyledFlexLink href="https://github.com/darwishdd/cpp_webapi_framework" alignItems="baseline">
							<Text mr="$2" fontWeight="$bold" d="contents" as="span">
								An Express-like C++ web application framework
							</Text>
							<SiGithub
								size={ICON_SIZE}
								color="$primary5"
								style={{ display: 'inline', 'margin-left': '8px', 'vertical-align': 'baseline' }}
							/>
						</StyledFlexLink>
						<Text>
							A simple-to-use web development framework with an easy syntax inspired by Express.js that lets developers
							build full-fledged back-end multi-threaded API servers with middleware support and connect it to the
							desired database in C++
						</Text>
						<Flex gap="$2" wrap="wrap" mt="$4">
							<For
								each={[
									{ name: 'C++17', Icon: SiCplusplus },
									{ name: 'CGI', Icon: null },
									{ name: 'Apache', Icon: SiApache },
									{ name: 'Multithreading', Icon: null },
									{ name: 'Linux', Icon: SiLinux },
								]}
							>
								{(skill) => <SkillBadge skill={skill} />}
							</For>
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
				</Grid>
			</NotificationsProvider>
		</HopeProvider>
	);
};

export default ResumeRaw;
