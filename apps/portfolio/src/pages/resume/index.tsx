import {
	Anchor,
	Box,
	Button,
	createDisclosure,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Grid,
	HopeProvider,
	IconButton,
	Input,
	Radio,
	RadioGroup,
} from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import { A, useSearchParams } from '@solidjs/router';
import { BiRegularLeftArrowAlt } from 'solid-icons/bi';
import { BsChatLeftTextFill, BsPrinter } from 'solid-icons/bs';
import { TbMenu2 } from 'solid-icons/tb';
import { ComponentProps, createEffect, createSignal, onCleanup, onMount, Show } from 'solid-js';
import { Params, paramsDefaultValues, parseArray, stringifyArray } from '../../../../common/params';
import { printWidth } from '../../../../common/printWidth';
import { SortableVerticalList } from '../../ui/components/SortableList';
import { Text } from '../../ui/components/Text';
import { Certifications } from './Certifications';
import { ResumeDivider } from './Divider';
import { Education } from './Education';
import { Header } from './Header';
import { Publications } from './Publications';
import { SummaryOfQualifications } from './SummaryOfQualifications';
import { Timeline } from './Timeline';
import { createDesktopNotification } from './createDesktopNotification';

export const pagePaddings = {
	x: '$24',
	y: '$12',
};

export const ICON_SIZE = 20;

export const controlsSectionWidth = 150;

export const iconButtonProps = {
	background: 'none',
	borderRadius: 0,
	css: { '&>svg': { opacity: 0, transition: 'opacity 0.3s ease' } },
	_hover: { background: '$primary3', color: 'black !important', '&>svg': { opacity: 1 } },
};

export const StyledFlexLink = (props: ComponentProps<typeof Flex>) => (
	<Anchor d="flex" target="_blank" alignItems="center" w="fit-content" {...props} />
);

const Resume = () => {
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
				replace: true,
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
	const [page1Ref, setPage1Ref] = createSignal<HTMLDivElement>();

	const printPage = () => {
		const page1 = page1Ref();
		if (!page1) return;

		setPrinting(true);
		const height = page1.scrollHeight;
		setPrinting(false);

		const body = {
			url: window.location.href,
			height,
		};

		fetch('http://localhost:3001/', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'post',
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (res.status === 200) {
					createDesktopNotification({
						message: 'Resume printed successfully',
						title: 'Success',
						status: 'success',
					});
					return res.blob();
				} else {
					createDesktopNotification({
						message: 'Resume print failed',
						title: 'Failed',
						status: 'fail',
					});
				}
			})
			.catch(() => {
				createDesktopNotification({
					message: 'Resume print failed',
					title: 'Failed',
					status: 'fail',
				});
			});
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
			<MetaProvider>
				<Title>Ahmed Habeila's Portfolio - Resume</Title>
			</MetaProvider>
			{/* Show drawer and invisible top bar only when running locally in dev mode */}
			<Show when={import.meta.env.DEV}>
				{/* controls */}
				<Drawer opened={showControls()} placement="right" onClose={onCloseControls} size="lg">
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader />
						<DrawerBody
							display="grid"
							gridTemplateColumns={`${controlsSectionWidth}px 1fr`}
							alignContent="start"
							p="$4"
							rowGap="$8"
						>
							<Text fontSize="1rem" data-id="index-text-1-c4e67d">
								Skills
							</Text>
							<Box d="grid" gap="$1" data-id="index-box-1-b086ac">
								<SortableVerticalList
									items={skills()}
									setItems={setSkills}
									getId={(item) => item}
									renderItem={(skill, index) => (
										<Box
											d="grid"
											gap="$4"
											flex={1}
											gridTemplateColumns={`1fr ${controlsSectionWidth}px`}
											data-id="index-box-2-d4b776"
										>
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
								/>

								<Input
									value={newSkillInput()}
									onChange={(e) => {
										if (!e.target.value) return;
										setNewSkillInput(e.target.value);
										setSkills(Array.from(new Set([...skills(), newSkillInput()!])));
										setNewSkillInput('');
									}}
								/>
							</Box>

							<Text fontSize="1rem" data-id="index-text-2-b98148">
								Type
							</Text>
							<RadioGroup value={jobType()}>
								<Flex direction="column" gap="$4" data-id="index-flex-1-bd11ab">
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
									<Radio value="architect" onChange={() => setJobType('architect')}>
										Frontend Architect
									</Radio>
								</Flex>
							</RadioGroup>
							<Text fontSize="1rem" data-id="index-text-3-d9034b">
								Seniority
							</Text>
							<RadioGroup value={senior().toString()}>
								<Flex direction="column" gap="$4" data-id="index-flex-2-c4712e">
									<Radio value="true" onChange={() => setSenior(true)}>
										Senior
									</Radio>
									<Radio value="false" onChange={() => setSenior(false)}>
										Junior
									</Radio>
								</Flex>
							</RadioGroup>
							<Text fontSize="1rem" data-id="index-text-4-c85b6f">
								Include location
							</Text>
							<RadioGroup value={includeLocation().toString()}>
								<Flex direction="column" gap="$4" data-id="index-flex-3-5ae1f8">
									<Radio value="true" onChange={() => setIncludeLocation(true)}>
										Yes
									</Radio>
									<Radio value="false" onChange={() => setIncludeLocation(false)}>
										No
									</Radio>
								</Flex>
							</RadioGroup>
							<Text fontSize="1rem" data-id="index-text-5-2e783c">
								Adjective
							</Text>
							<Input value={adjective()} onChange={createOnChangeHandler(setAdjective)} />
						</DrawerBody>
						<DrawerFooter gap="$4" display="grid" gridAutoFlow="column" justifyContent="unset">
							<Button onClick={printPage}>Print</Button>
							<Button variant="dashed" onClick={onCloseControls}>
								Close
							</Button>
							<Button
								variant="dashed"
								as="a"
								role="link"
								href={`/cover?skills=${stringifyArray(skills())}`}
								aria-label="Go to cover letter"
							>
								Go to cover letter
							</Button>
							<Button
								onClick={() => {
									setSkills(paramsDefaultValues.skills.slice());
									setJobType(paramsDefaultValues.jobType);
									setSenior(paramsDefaultValues.senior);
									setAdjective(paramsDefaultValues.adjective);
									setIncludeLocation(paramsDefaultValues.includeLocation);
								}}
								colorScheme="danger"
							>
								Reset
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>

				{/* top invisible bar */}
				<Box pos="fixed" top="0" right="0" data-id="index-box-3-b262ed">
					<IconButton
						{...iconButtonProps}
						size="lg"
						as="a"
						href={`/cover?skills=${stringifyArray(skills())}`}
						aria-label="Go to cover letter"
						icon={<BsChatLeftTextFill />}
					/>
					<IconButton {...iconButtonProps} size="lg" onClick={printPage} aria-label="Print" icon={<BsPrinter />} />
					<IconButton
						{...iconButtonProps}
						size="lg"
						onClick={onOpenControls}
						aria-label="Open drawer"
						icon={<TbMenu2 />}
					/>
				</Box>
			</Show>

			{/* Show back to portfolio button only on production */}
			<Show when={!import.meta.env.DEV}>
				<Box ps="$3" pt="$3" data-id="index-box-4-2e4496">
					<Button as={A} href="/experience" variant="outline" leftIcon={<BiRegularLeftArrowAlt size={ICON_SIZE} />}>
						Back to Portfolio
					</Button>
				</Box>
			</Show>

			{/* main */}
			<Flex as="main" direction="column" id="main" data-id="index-flex-4-2552d3">
				<Grid id="page1" w={printing() ? printWidth : 'auto'} ref={setPage1Ref} data-id="index-grid-1-15121b">
					{/* header */}
					<Header adjective={adjective()} jobType={jobType()} includeLocation={includeLocation()} />
					{/* page 1 */}

					<Grid rowGap="$8" px={pagePaddings.x} pb={pagePaddings.y} data-id="index-grid-2-cf9c61">
						<SummaryOfQualifications skills={skills()} />

						<Grid data-id="index-grid-3-d2ec2c">
							<Text variant="title" data-id="index-text-6-9711a6">
								Work Experience
							</Text>
							<ResumeDivider />
							<Timeline forceRole={forceRole()} forceNonSenior={forceNonSenior()} />
							<Text mt="$8" data-id="index-text-7-66d767">
								Full work experience since <b>May 2019 </b> is available on{' '}
								<Anchor href="https://www.habeila.dev/experience">my portfolio</Anchor>.
							</Text>
						</Grid>

						{/* header */}
						{/* <Header adjective={adjective()} jobType={jobType()} includeLocation={includeLocation()} /> */}
						<Publications />
						<Certifications />
						<Education />
						{/* <SelfTaught jobType={jobType()} /> */}
						{/* <References /> */}
						{/* <Keywords /> */}
					</Grid>
				</Grid>
				{/* page 2 */}
				{/* <Box
					id="page2"
					d={printing() ? 'none' : 'flex'}
					flexDirection="column"
					rowGap="$8"
					px={pagePaddings.x}
					py={pagePaddings.y}
				 data-id="index-box-5-305655"></Box> */}
			</Flex>
		</HopeProvider>
	);
};

export default Resume;
