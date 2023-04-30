import {
	Anchor,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Grid,
	HopeProvider,
	IconButton,
	Input,
	Radio,
	RadioGroup,
	createDisclosure,
} from '@hope-ui/solid';
import { Link, useSearchParams } from '@solidjs/router';
import { BsChatLeftTextFill, BsPrinter } from 'solid-icons/bs';
import { TbMenu2 } from 'solid-icons/tb';
import { ComponentProps, For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { work } from '../../data/work';
import { Text } from '../../ui/Text';
import { colors } from '../../ui/theme';
import { printWidth } from '../../utils';
import { Certifications } from './Certifications';
import { CompanyProjects } from './CompanyProjects';
import { StyledDivider } from './Divider';
import { Education } from './Education';
import { Header } from './Header';
import { Keywords } from './Keywords';
import { SelfTaught } from './SelfTaught';
import { SummaryOfQualifications } from './SummaryOfQualifications';
import { Timeline } from './Timeline';
import { createDesktopNotification } from './createDesktopNotification';
import { Params, paramsDefaultValues, parseArray, stringifyArray } from './utils';

export const pagePaddings = {
	x: '$24',
	y: '$12',
};

export const ICON_SIZE = 20;

export const StyledFlexLink = (props: ComponentProps<typeof Flex>) => (
	<Anchor d="flex" target="_blank" alignItems="center" w="fit-content" {...props} />
);

const ResumeRaw = () => {
	const { isOpen: showControls, onOpen: onOpenControls, onClose: onCloseControls } = createDisclosure();

	const [params, setParams] = useSearchParams<Params>();

	const [includeLocation, setIncludeLocation] = createSignal(
		params.includeLocation ? params.includeLocation === 'true' : paramsDefaultValues.includeLocation
	);
	const [adjective, setAdjective] = createSignal(params.adjective ?? paramsDefaultValues.adjective);
	const [skills, setSkills] = createSignal<string[]>(parseArray(params.skills) ?? paramsDefaultValues.skills.slice());
	const [newSkillInput, setNewSkillInput] = createSignal<string>();
	const [senior, setSenior] = createSignal(params.senior ? params.senior === 'true' : paramsDefaultValues.senior);
	const [jobType, setJobType] = createSignal<Params['jobType']>(params.jobType ?? paramsDefaultValues.jobType);

	createEffect(() => {
		setParams(
			{
				...params,
				skills: stringifyArray(skills()),
				senior: senior().toString(),
				jobType: jobType(),
				adjective: adjective(),
				includeLocation: includeLocation().toString(),
			},
			{
				// replace: true
			}
		);
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'NumpadEnter') onOpenControls();
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
		const page1 = document.getElementById('page1');
		if (!page1) return;

		setPrinting(true);
		const height = page1.scrollHeight;
		// console.log(`🚀 ~ printPage ~ height:`, height);
		setPrinting(false);

		const body = {
			url: window.location.href,
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
					Badge: { baseStyle: { textTransform: 'none', height: 24, fontSize: 14 } },
				},
			}}
		>
			{/* controls */}
			<Drawer opened={showControls()} placement="right" onClose={onCloseControls} size="xl">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />

					<DrawerBody>
						<Box display="grid" gridTemplateColumns="200px 1fr" maxW="800px" p="$4" rowGap="$8">
							<Text>Skills</Text>
							<Box d="grid" gap="$1">
								<For each={skills()}>
									{(skill, index) => (
										<Box d="grid" gap="$4" gridTemplateColumns="1fr 150px">
											<Input
												value={skill}
												onChange={(e) => {
													const newSkills = skills().slice();
													newSkills[index()] = (e.target as HTMLInputElement).value;
													setSkills(newSkills.filter(Boolean));
												}}
											/>
											<Button
												colorScheme="danger"
												onClick={() => {
													const newSkills = skills().slice();
													newSkills.splice(index(), 1);
													setSkills(newSkills);
												}}
											>
												Remove
											</Button>
										</Box>
									)}
								</For>

								<Box d="grid" gap="$4" gridTemplateColumns="1fr 150px">
									<Input value={newSkillInput()} onChange={createOnChangeHandler(setNewSkillInput)} />
									<Button
										onClick={() => {
											if (!newSkillInput()) return;
											setSkills([...skills(), newSkillInput()!]);
											setNewSkillInput('');
										}}
									>
										Add
									</Button>
								</Box>
							</Box>

							<Text>Type</Text>
							<RadioGroup value={jobType()}>
								<Flex direction="column" gap="$4">
									<Radio value="react" onChange={() => setJobType('react')}>
										React.js
									</Radio>
									<Radio value="front-end" onChange={() => setJobType('front-end')}>
										Front-end
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
							<RadioGroup value={senior().toString()}>
								<Flex direction="column" gap="$4">
									<Radio value="true" onChange={() => setSenior(true)}>
										Senior
									</Radio>
									<Radio value="false" onChange={() => setSenior(false)}>
										Junior
									</Radio>
								</Flex>
							</RadioGroup>
							<Text>Include location</Text>
							<RadioGroup value={includeLocation().toString()}>
								<Flex direction="column" gap="$4">
									<Radio value="true" onChange={() => setIncludeLocation(true)}>
										Yes
									</Radio>
									<Radio value="false" onChange={() => setIncludeLocation(false)}>
										No
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
									setIncludeLocation(paramsDefaultValues.includeLocation);
								}}
							>
								Reset
							</Button>
						</Box>
					</DrawerBody>
				</DrawerContent>
			</Drawer>

			{/* top invisible bar */}
			<Box pos="fixed" top="0" right="0">
				<IconButton
					{...iconButtonProps}
					size="lg"
					as={Link}
					href={`/cover?skills=${stringifyArray(skills())}`}
					aria-label="Go to cover letter"
					icon={<BsChatLeftTextFill />}
				/>
				<IconButton
					{...iconButtonProps}
					size="lg"
					onClick={onOpenControls}
					aria-label="Open drawer"
					icon={<TbMenu2 />}
				/>
				<IconButton {...iconButtonProps} size="lg" onClick={printPage} aria-label="Print" icon={<BsPrinter />} />
			</Box>
			{/* main */}
			<Flex as="main" direction="column" id="main">
				<Grid id="page1" w={printing() ? printWidth : 'auto'}>
					{/* header */}
					<Header adjective={adjective()} jobType={jobType()} includeLocation={includeLocation()} />
					{/* page 1 */}

					<Box px={pagePaddings.x} pb={pagePaddings.y}>
						<SummaryOfQualifications skills={skills()} />

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
				</Grid>
				{/* page 2 */}
				<Box px={pagePaddings.x} py={pagePaddings.y} id="page2" d={printing() ? 'none' : 'block'}>
					{/* header */}
					{/* <Header adjective={adjective()} jobType={jobType()} includeLocation={includeLocation()} /> */}
					{/* education */}
					<Education />

					{/* certifications + self taught courses */}
					<Certifications />
					<SelfTaught jobType={jobType()} />

					{/* references */}
					{/* <References /> */}
					{/* damn keywords */}
					<Keywords />
				</Box>
			</Flex>
		</HopeProvider>
	);
};

export default ResumeRaw;
