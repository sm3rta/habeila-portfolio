import {
	Anchor,
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	HopeProvider,
	IconButton,
	Input,
	ListItem,
	PropsOf,
	Radio,
	RadioGroup,
} from '@hope-ui/solid';
import { Link, useSearchParams } from '@solidjs/router';
import { BsChatLeftTextFill, BsPrinter } from 'solid-icons/bs';
import { FaSolidLocationDot } from 'solid-icons/fa';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine, RiDocumentBookMarkFill } from 'solid-icons/ri';
import { SiApache, SiCplusplus, SiGithub, SiLinux } from 'solid-icons/si';
import { TbStackPop } from 'solid-icons/tb';
import { ComponentProps, For, JSX, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { telephoneNumber, telephoneNumberStylized, website, work } from '../../data/work';
import { Text } from '../../ui/Text';
import { colors } from '../../ui/theme';
import { printWidth } from '../../utils';
import { socials } from '../home/Contact';
import { SkillBadge } from '../home/SkillBadge';
import { CompanyProjects } from './CompanyProjects';
import { Timeline } from './Timeline';

const secondaryTextColor = 'var(--hope-colors-neutral10)';

export const TopSkills = (props: { skills: string[] }) => {
	const [node, setNode] = createSignal<JSX.Element | null>();

	createEffect(() => {
		setNode(() => (
			<For each={props.skills}>
				{(skill, index) =>
					index() === props.skills.length - 1 ? (
						<>
							and <b>{skill}</b>
						</>
					) : (
						<>
							<b>{skill}</b>,{' '}
						</>
					)
				}
			</For>
		));
	});
	return node as unknown as JSX.Element;
};

export const createDesktopNotification = async ({
	status,
	message,
	title,
}: {
	title: string;
	status: 'success' | 'fail';
	message: string;
}) => {
	if (!window.Notification) {
		console.log('Browser does not support notifications.');
		return;
	}

	const permission = await Notification.requestPermission();

	if (permission !== 'granted') {
		console.log('User blocked notifications.');
		return;
	}

	new Notification(title, {
		body: message,
		icon: status === 'success' ? '/check.png' : '/cross.png',
	});
};

export const pagePaddings = {
	x: '$24',
	y: '$12',
};

export const ICON_SIZE = 20;

export const StyledDivider = styled((props: PropsOf<typeof Divider> & { noMargin?: boolean }) => (
	<Divider {...props} />
))(({ noMargin }) => ({
	marginBlock: noMargin ? 0 : '0.5rem',
	backgroundColor: 'gray',
	// height: '2px',
}));

export const StyledFlexLink = (props: ComponentProps<typeof Flex>) => (
	<Anchor d="flex" target="_blank" alignItems="center" w="fit-content" {...props} />
);

export type Params = {
	skills: string;
	senior: string;
	jobType: 'full-stack' | 'front-end' | 'softwareEngineer';
	adjective: string;
};

const SPLIT_CHARACTER = '-';
export const parseArray = (str: string | undefined) => {
	if (!str) return undefined;
	return str.split(SPLIT_CHARACTER);
};
export const stringifyArray = (arr: string[]) => arr.join(SPLIT_CHARACTER);

const paramsDefaultValues = {
	skills: ['React', 'JavaScript', 'HTML/CSS'],
	senior: true,
	jobType: 'front-end',
	adjective: 'Highly motivated',
} as const;

const ResumeRaw = () => {
	const [showControls, setShowControls] = createSignal(false);

	const [params, setParams] = useSearchParams<Params>();

	const [adjective, setAdjective] = createSignal(params.adjective ?? paramsDefaultValues.adjective);
	const [skills, setSkills] = createSignal<string[]>(parseArray(params.skills) ?? paramsDefaultValues.skills.slice());
	const [senior, setSenior] = createSignal(params.senior ? params.senior === 'true' : paramsDefaultValues.senior);
	const [jobType, setJobType] = createSignal<'full-stack' | 'front-end' | 'softwareEngineer'>(
		params.jobType ?? paramsDefaultValues.jobType
	);

	createEffect(() => {
		setParams(
			{
				skills: stringifyArray(skills()),
				senior: senior().toString(),
				jobType: jobType(),
				adjective: adjective(),
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

	const [printing, setPrinting] = createSignal(false);

	const printPage = async () => {
		const main = document.getElementById('main');
		const page2 = document.getElementById('page2');
		if (!main || !page2) return;

		main.style.width = `${printWidth}px`;
		page2.style.display = 'none';

		setPrinting(true);
		const height = main.scrollHeight;
		main.style.width = '';
		page2.style.display = 'block';

		setTimeout(() => {
			setPrinting(false);
		}, 0);

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
					createDesktopNotification({
						message: 'Printed successfully',
						title: 'Success',
						status: 'success',
					});
					return res.blob();
				} else {
					createDesktopNotification({
						message: 'Print failed',
						title: 'Failed',
						status: 'fail',
					});
				}
			})
			.catch(() => {
				createDesktopNotification({
					message: 'Print failed',
					title: 'Failed',
					status: 'fail',
				});
			});
	};

	const iconButtonProps = {
		background: 'none',
		borderRadius: 0,
		css: { '&>svg': { opacity: 0, transition: 'opacity 0.3s ease' } },
		_hover: { background: colors.primary6, color: 'black !important', '&>svg': { opacity: 1 } },
	};

	const forceRole = () => (jobType() === 'full-stack' ? 'full' : jobType() === 'softwareEngineer' ? 'se' : undefined);
	const forceNonSenior = () => (senior() ? undefined : true);

	return (
		<HopeProvider
			config={{
				lightTheme: {
					colors: {
						primary5: 'black',
						primary6: '#00254d',
					},
					fontSizes: {
						'3xl': '3rem',
						lg: '1.5rem',
						md: '1.25rem',
					},
					shadows: { outline: 'inset 0 0 0 3px var(--hope-colors-focusRing)' },
				},
				components: {
					Anchor: {
						baseStyle: {
							textDecoration: 'underline 1px',
							position: 'unset',
							_hover: {
								color: 'var(--hope-colors-primary11)',
								'&>*': { color: 'var(--hope-colors-primary11)' },
							},
						},
					},
					Badge: { baseStyle: { textTransform: 'none', height: 24, fontSize: 14, position: 'relative' } },
				},
			}}
		>
			{/* controls */}
			<Show when={showControls()}>
				<Box display="grid" gridTemplateColumns="1fr 1fr" maxW="500px" p="$4" rowGap="$8">
					<Text>Skills</Text>
					<Box d="grid" gap="$1">
						<For each={skills()}>
							{(skill, index) => (
								<Input
									value={skill}
									onChange={(e) => {
										const newSkills = skills().slice();
										newSkills[index()] = (e.target as HTMLInputElement).value;
										setSkills(newSkills.filter(Boolean));
									}}
								/>
							)}
						</For>

						<Input
							onChange={(e) => {
								const newSkills = skills().slice();
								newSkills.push((e.target as HTMLInputElement).value);
								setSkills(newSkills.filter(Boolean));
							}}
						/>
					</Box>

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
					<Text>Adjective</Text>
					<Input value={adjective()} onChange={createOnChangeHandler(setAdjective)} />
					<Button
						onClick={() => {
							setSkills(paramsDefaultValues.skills.slice());
							setJobType(paramsDefaultValues.jobType);
							setSenior(paramsDefaultValues.senior);
							setAdjective(paramsDefaultValues.adjective);
						}}
					>
						Reset
					</Button>
				</Box>
			</Show>
			{/* top invisible bar */}
			<Box pos="fixed" top="0" right="0">
				<IconButton
					{...iconButtonProps}
					size="lg"
					as={Link}
					href={`/cover?skills=${stringifyArray(skills())}&adjective=${adjective()}`}
					aria-label="Go to cover letter"
					icon={<BsChatLeftTextFill />}
				/>
				<IconButton
					{...iconButtonProps}
					size="lg"
					onClick={() => setShowControls(!showControls())}
					aria-label="Up"
					icon={<TbStackPop />}
				/>
				<IconButton {...iconButtonProps} size="lg" onClick={printPage} aria-label="Print" icon={<BsPrinter />} />
			</Box>
			{/* main */}
			<Flex as="main" direction="column" id="main" w={printing() ? printWidth : 'auto'}>
				{/* header */}
				<Flex
					direction="column"
					px={pagePaddings.x}
					pt={pagePaddings.y}
					pb={pagePaddings.y}
					// bgColor="var(--hope-colors-info12)"
					// color="white"
					gap="$4"
					alignItems="center"
				>
					<Text variant="h1">Ahmed Habeila</Text>
					<Text variant="title" textTransform="unset" fontWeight="normal">
						{adjective()}{' '}
						{
							{
								'full-stack': 'full-stack developer',
								softwareEngineer: 'software engineer',
								'front-end': 'front-end developer',
							}[jobType()]
						}
					</Text>
					<StyledDivider noMargin />

					<Flex gap="$8">
						<Flex alignItems="center">
							<FaSolidLocationDot size={ICON_SIZE} />
							<Text ml="$2">North York, ON, M3A 2E2</Text>
						</Flex>

						<StyledFlexLink href={`tel:+${telephoneNumber}`} textDecoration="none">
							<RiDeviceSmartphoneLine size={ICON_SIZE} />
							<Text ml="$2">{telephoneNumberStylized}</Text>
						</StyledFlexLink>

						<StyledFlexLink href="mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!" textDecoration="none">
							<HiOutlineMail size={ICON_SIZE} />
							<Text ml="$2">HabeilaAhmed@gmail.com</Text>
						</StyledFlexLink>
					</Flex>

					<Flex gap="$8">
						<For
							each={[
								{ name: 'Portfolio', href: website, Icon: RiDocumentBookMarkFill },
								socials.find((s) => s.name === 'LinkedIn')!,
								socials.find((s) => s.name === 'Github')!,
							]}
						>
							{({ href, Icon, name }) => (
								<StyledFlexLink gap="$2" href={href} as={Anchor}>
									<Icon size={ICON_SIZE} />
									<Text>{name}</Text>
								</StyledFlexLink>
							)}
						</For>
					</Flex>
				</Flex>
				{/* page 1 */}

				<Box px={pagePaddings.x} pb={pagePaddings.y}>
					<Show when={skills().length}>
						<Flex direction="column">
							<Text variant="title">Professional summary</Text>
							<StyledDivider />
							<Flex mt="$2" direction="column" as="ul">
								<For
									each={[
										<>5+ years of experience building elegant and performant user experiences</>,
										// helping companies create and maintain a better code base for reusability
										<>
											Strong background in <TopSkills skills={skills()} /> with high flexibility to work with any stack
											{/* and web development fundamentals */}
										</>,
										'Demonstrated ability to lead other developers, performing code reviews and enforcing certain patterns',
										'Proficient in communication, capable of effectively interacting with clients to establish and record their needs',
									]}
								>
									{(item) => (
										<ListItem ml="$6">
											<Text>{item}</Text>
										</ListItem>
									)}
								</For>
							</Flex>
						</Flex>
					</Show>

					<Grid mt="$8">
						<Text variant="title">Work Experience</Text>
						<StyledDivider />
						<Timeline
							children={work.map((company) => (
								<CompanyProjects forceRole={forceRole} company={company} forceNonSenior={forceNonSenior} />
							))}
						/>
					</Grid>
				</Box>

				{/* page 2 */}
				<Box px={pagePaddings.x} py={pagePaddings.y} id="page2" d={printing() ? 'none' : 'block'}>
					<Flex direction="column">
						<Text variant="title">Education</Text>
						<StyledDivider />
						<Text>Bachelor's Degree of Computer Science and Automatic Control</Text>
						<Text>Tanta University of Engineering &ndash; (2014 - 2019)</Text>
						<Box d="inline" alignItems="center">
							<Text as="span" variant="subtitle">
								Graduation Project:{' '}
							</Text>
							<StyledFlexLink href="https://github.com/darwishdd/cpp_webapi_framework" d="inline-flex">
								<Text mr="$2" d="contents" as="span">
									An Express-like C++ web application framework
								</Text>
								<SiGithub
									size={ICON_SIZE}
									style={{ display: 'inline', 'margin-left': '8px', 'vertical-align': 'baseline' }}
								/>
							</StyledFlexLink>
						</Box>
						<Text>
							A simple-to-use web development framework with an easy syntax inspired by Express.js that lets developers
							build full-fledged back-end multi-threaded API servers with middleware support and connect it to the
							desired database in C++
						</Text>
						<Flex gap="$2" wrap="wrap" mt="$2">
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
						<Text variant="title">Self-taught Courses</Text>
						<StyledDivider />
						<Flex direction="column">
							<For
								each={[
									{ course: 'Mastering React', subtitle: '(by Mosh Hamedani)' },
									{ course: 'Node.js - The Complete Guide to Build RESTful APIs', subtitle: '(by Mosh Hamedani)' },
									{ course: 'CSS - The Complete Guide', subtitle: '(by Maximilian Schwarzmüller)' },
									{
										course: 'Vue - The Complete Guide (w/ Router, Vuex, Composition API)',
										subtitle: '(by Maximilian Schwarzmüller)',
									},
									{ course: 'Master C++ and OOP', subtitle: '(Learncpp.com)' },
									{ course: 'Introduction to Game Development Specialization', subtitle: '(Coursera)' },
								]}
							>
								{({ course, subtitle }) => (
									<Flex>
										<Text d="contents">{course}</Text>
										<Text d="contents" color={secondaryTextColor}>
											{' '}
											{subtitle}
										</Text>
									</Flex>
								)}
							</For>
						</Flex>
					</Flex>
				</Box>
			</Flex>
		</HopeProvider>
	);
};

export default ResumeRaw;
