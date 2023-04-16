import {
	Anchor,
	Box,
	Divider,
	Flex,
	Grid,
	HopeProvider,
	IconButton,
	Input,
	ListItem,
	NotificationsProvider,
	PropsOf,
	Radio,
	RadioGroup,
	notificationService,
} from '@hope-ui/solid';
import { useSearchParams } from '@solidjs/router';
import { BsChatLeftTextFill, BsPrinter } from 'solid-icons/bs';
import { FaSolidLocationDot } from 'solid-icons/fa';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine, RiDocumentBookMarkFill } from 'solid-icons/ri';
import { SiApache, SiCplusplus, SiGithub, SiLinux } from 'solid-icons/si';
import { TbStackPop } from 'solid-icons/tb';
import { ComponentProps, For, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { telephoneNumber, telephoneNumberStylized, website, work } from '../../data/work';
import { Text } from '../../ui/Text';
import { colors, darkTheme as theme } from '../../ui/theme';
import { printWidth } from '../../utils';
import { socials } from '../home/Contact';
import { SkillBadge } from '../home/SkillBadge';
import { Timeline } from '../resume/Timeline';
import { CompanyProjects } from './CompanyProjects';

const ICON_SIZE = 20;

const secondaryTextColor = 'var(--hope-colors-neutral9)';

const StyledDivider = styled((props: PropsOf<typeof Divider>) => <Divider {...props} />)({
	marginBlock: '0.5rem',
	backgroundColor: 'gray',
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

	const [skill1, setSkill1] = createSignal(params.skill1 ?? 'React');
	const [skill2, setSkill2] = createSignal(params.skill2 ?? 'Typescript');
	const [skill3, setSkill3] = createSignal(params.skill3 ?? 'Node.js');
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
		_hover: { background: colors.primary6, color: 'black !important', '&>svg': { opacity: 1 } },
	};

	const skills = () => [skill1(), skill2(), skill3()].filter(Boolean);
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
					fontSizes: theme.darkTheme.fontSizes,
				},
				components: {
					Anchor: {
						baseStyle: {
							textDecoration: 'underline',
							_hover: {
								color: 'var(--hope-colors-primary11)',
								'&>*': { color: 'var(--hope-colors-primary11)' },
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
					<IconButton
						{...iconButtonProps}
						as={Anchor}
						href="/cover"
						aria-label="Go to cover letter"
						icon={<BsChatLeftTextFill />}
					/>
					<IconButton
						{...iconButtonProps}
						onClick={() => setShowControls(!showControls())}
						aria-label="Up"
						icon={<TbStackPop />}
					/>

					<IconButton {...iconButtonProps} onClick={printPage} aria-label="Print" icon={<BsPrinter />} />
				</Box>

				<Box as="main" p="$8">
					<Flex direction="column">
						<Text variant="h1" as="span" lineHeight="normal">
							Ahmed Habeila
						</Text>

						<StyledDivider />

						<Flex gap="$8" mt="$2">
							<Flex alignItems="center">
								<FaSolidLocationDot size={ICON_SIZE} />
								<Text ml="$2">North York, ON, M3A 2E2</Text>
							</Flex>

							<StyledFlexLink href={`tel:+${telephoneNumber}`} textDecoration="none">
								<RiDeviceSmartphoneLine size={ICON_SIZE} />
								<Text ml="$2">{telephoneNumberStylized}</Text>
							</StyledFlexLink>

							<StyledFlexLink
								href="mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!"
								textDecoration="none"
							>
								<HiOutlineMail size={ICON_SIZE} />
								<Text ml="$2">HabeilaAhmed@gmail.com</Text>
							</StyledFlexLink>
						</Flex>

						<Flex gap="$8" mt="$2">
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

					<Show when={skill1()}>
						<Flex direction="column" mt="$8">
							<Text variant="title">Summary of Qualifications</Text>
							<StyledDivider />
							<Flex mt="$2" direction="column" as="ul">
								<For
									each={[
										<>
											5 years of professional experience as a{' '}
											<b>
												{jobType() === 'full-stack'
													? 'full-stack developer'
													: jobType() === 'softwareEngineer'
													? 'software engineer'
													: 'front-end developer'}
											</b>
										</>,
										<>
											Strong background in{' '}
											{
												<For each={skills()}>
													{(skill) => (
														<>
															<b>{skill}</b>,
														</>
													)}
												</For>
											}{' '}
											and web development fundamentals
										</>,
										'Demonstrated ability to lead other developers, performing code reviews and enforcing certain patterns',
										'Professional communication skills, including the ability to communicate with clients to develop and document requirements',
										'High flexibility to work with any stack',
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
						<Box css={{ '&>div': { p: 0 } }}>
							<Timeline
								children={work.map((company) => (
									<CompanyProjects forceRole={forceRole} company={company} forceNonSenior={forceNonSenior} />
								))}
							/>
						</Box>
					</Grid>

					<Flex direction="column" mt="$8">
						<Text variant="title">Education</Text>
						<StyledDivider />
						<Text>Bachelor's Degree of Computer Science and Automatic Control</Text>
						<Text>Tanta University of Engineering</Text>
						<Text>2014 - 2019</Text>
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
							<Flex>
								<Text d="contents">Mastering React</Text>
								<Text d="contents" color={secondaryTextColor}>
									{' '}
									(by Mosh Hamedani)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">Node.js - The Complete Guide to Build RESTful APIs</Text>
								<Text d="contents" color={secondaryTextColor}>
									{' '}
									(by Mosh Hamedani)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">Vue - The Complete Guide (w/ Router, Vuex, Composition API)</Text>
								<Text d="contents" color={secondaryTextColor}>
									{' '}
									(by Maximilian Schwarzmüller)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">CSS - The Complete Guide</Text>
								<Text d="contents" color={secondaryTextColor}>
									{' '}
									(by Maximilian Schwarzmüller)
								</Text>
							</Flex>

							<Flex>
								<Text d="contents">Master C++ and OOP</Text>
								<Text d="contents" color={secondaryTextColor}>
									{' '}
									(Learncpp.com)
								</Text>
							</Flex>

							<Flex>
								<Text d="contents">Introduction to Game Development Specialization</Text>
								<Text d="contents" color={secondaryTextColor}>
									{' '}
									(Coursera)
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Box>
			</NotificationsProvider>
		</HopeProvider>
	);
};

export default ResumeRaw;
