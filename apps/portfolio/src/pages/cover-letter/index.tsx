import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HopeProvider,
	IconButton,
	Input,
	List,
	ListItem,
	Radio,
	RadioGroup,
	Textarea,
	createDisclosure,
} from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import { useSearchParams } from '@solidjs/router';
import { BsPrinter } from 'solid-icons/bs';
import { IoDocument } from 'solid-icons/io';
import { TbMenu2 } from 'solid-icons/tb';
import { For, Match, Show, Switch, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { emailAddress, locationAddress, telephoneNumberStylized, website } from '../../data/work';
import { SortableVerticalList } from '../../ui/components/SortableList';
import { Text } from '../../ui/components/Text';
import { darkTheme as theme } from '../../ui/theme';
import { coverPrintWidth } from '../../../../common/printWidth';
import { controlsSectionWidth, iconButtonProps, pagePaddings } from '../resume-raw';
import { Header } from '../resume-raw/Header';
import { TopSkills } from '../resume-raw/TopSkills';
import { createDesktopNotification } from '../resume-raw/createDesktopNotification';
import { paramsDefaultValues, parseArray, stringifyArray } from '../../../../common/params';

export const TextSpan: typeof Text = (props) => <Text as="span" {...props} />;

export type Params = {
	skills: string;
	companyName: string;
	roleTitle: string;
	pdf: 'true' | 'false';
	experienceBullets: string;
	perfectFitBullets: string;
	interested: string;
	jobBoard: string;
};

const defaultExperienceBullets: string[] = [
	'Collaborating with a team of 4 to launch 2 accessible, responsive websites with light/dark themes in 1 week, achieving a 100% Lighthouse score with optimized SEO and accessibility.',
	'Creating UI component library following a design system and documenting it on Storybook.',
	'Communicated with clients to develop and document website requirements in an agile environment.',
	'Leading a team of 4 front-end developers in developing a front-end monorepo architecture with 2 apps and 5 independent libraries for Calqulate.',
	'Enhancing developer experience by developing a proprietary types SDK for API type safety in TypeScript.',
	'Launching 2 responsive, accessible SEO-focused websites for BMW Foundation and TwentyThirty, increasing the reach to thousands of organic monthly users.',
	// 'Creating accessibility focused websites with high contrast mode, dyslexia-friendly font, and animations toggle.',
	'Building back-end API with Express.js and Firebase for authentication, file uploads, and emails for an educational platform.',
	'Conducting system analysis, designing and implementing eCommerce website.',
];

const defaultPerfectFitBullets: string[] = [
	'During my time at Calqulate, I mentored a team of 4 front-end developers, performing PR reviews for code quality and enforcing best practices.',
	'I have extensive experience with multiple React state management tools including Redux, Redux-toolkit, and MobX.',
	'I also have experience writing unit tests with Jest and React testing library.',
	'I worked for fintech companies Calqulate (financial tool) and Quint (crypto currency).',
	"I'm skilled in Next.js and other SSR technologies such as Gatsby.js and Astro.",
	"I'm familiar with agile environments, JIRA and daily scrum meetings.",
	'I have experience with monorepos: Lerna, Yarn workspaces and Turborepo.',
	'I know Material UI by heart, with 4 years of experience working solely with this UI framework on multiple projects.',
];

const defaultInterested =
	'I am interested in working for your company because I believe I can contribute to your vision\
 of creating innovative and user-friendly web solutions. I value collaboration, growth and innovation,\
 and I am eager to learn from your talented team and apply my skills and knowledge to your projects.';

const CoverLetter = () => {
	const { isOpen: showControls, onOpen: onOpenControls, onClose: onCloseControls } = createDisclosure();
	const [params, setParams] = useSearchParams<Params>();
	const initializeFromParams = Object.keys(params).length > 1;

	const [skills, setSkills] = createSignal<string[]>(
		parseArray(params.skills) ?? (paramsDefaultValues.skills as unknown as string[])
	);
	const [interested, setInterested] = createSignal<string>(
		initializeFromParams ? params.interested : defaultInterested
	);
	const [jobBoard, setJobBoard] = createSignal<string>(params.jobBoard ?? '');
	const [experienceBullets, setExperienceBullets] = createSignal<string[]>(
		params.experienceBullets ? JSON.parse(params.experienceBullets) : defaultExperienceBullets
	);
	const [perfectFitBullets, setPerfectFitBullets] = createSignal<string[]>(
		params.perfectFitBullets ? JSON.parse(params.perfectFitBullets) : defaultPerfectFitBullets
	);
	const [companyName, setCompanyName] = createSignal(params.companyName ?? '');
	const [roleTitle, setRoleTitle] = createSignal(initializeFromParams ? params.roleTitle : 'Front-end Developer');
	const [pdf, setPdf] = createSignal<boolean>(params.pdf ? params.pdf === 'true' : false);

	createEffect(() => {
		console.log(`🚀 ~ CoverLetter ~ companyName:`, companyName);
		console.log(companyName());
	});

	const [newSkillInput, setNewSkillInput] = createSignal<string>();
	const [newExperienceBulletInput, setNewExperienceBulletInput] = createSignal<string>();
	const [newPerfectFitBulletInput, setNewPerfectFitBulletInput] = createSignal<string>();

	const [coverRef, setCoverRef] = createSignal<HTMLDivElement>();

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'a' && e.ctrlKey) {
			if (document.activeElement?.nodeName === 'INPUT') return;
			if (document.activeElement?.nodeName === 'TEXTAREA') return;
			const cover = coverRef();
			if (!cover) return;
			setTimeout(() => {
				const range = document.createRange();
				range.selectNode(cover);
				window.getSelection()?.removeAllRanges();
				window.getSelection()?.addRange(range);
			}, 0);
		}
	};

	onMount(() => {
		if (!pdf()) onOpenControls();
		document.body.addEventListener('keydown', handleKeyDown);
	});
	onCleanup(() => {
		document.body.removeEventListener('keydown', handleKeyDown);
	});

	createEffect(() => {
		setParams(
			{
				...params,
				skills: stringifyArray(skills()),
				companyName: companyName(),
				roleTitle: roleTitle(),
				experienceBullets: JSON.stringify(experienceBullets()),
				perfectFitBullets: JSON.stringify(perfectFitBullets()),
				interested: interested(),
				jobBoard: jobBoard(),
				pdf: pdf() ? 'true' : 'false',
			},
			{
				// replace: true,
			}
		);
	});

	const createOnChangeHandler = (setFn: (value: string) => void) => (e: Event) => {
		const { value } = e.target as HTMLInputElement;
		console.log(`🚀 ~ createOnChangeHandler ~ value:`, value);
		setFn(value);
	};

	const resetBullets = () => {
		console.log('old values', {
			experienceBullets: experienceBullets(),
			perfectFitBullets: perfectFitBullets(),
			interested: interested(),
		});
		setExperienceBullets(defaultExperienceBullets);
		setPerfectFitBullets(defaultPerfectFitBullets);
		setInterested(defaultInterested);
	};

	const printPage = () => {
		const root = coverRef();
		if (!root) return;

		setPdf(true);
		const height = root.scrollHeight;
		setPdf(false);

		const body = {
			url: window.location.href,
			height,
		};

		fetch('http://localhost:3001/cover', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'post',
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (res.status === 200) {
					createDesktopNotification({
						message: 'Cover letter printed successfully',
						title: 'Success',
						status: 'success',
					});
					return res.blob();
				} else {
					createDesktopNotification({
						message: 'Cover letter print failed',
						title: 'Failed',
						status: 'fail',
					});
				}
			})
			.catch(() => {
				createDesktopNotification({
					message: 'Cover letter print failed',
					title: 'Failed',
					status: 'fail',
				});
			});
	};

	const lineBreak = () => (!pdf() ? <br /> : <Box h={30} />);

	return (
		<HopeProvider
			config={{
				lightTheme: {
					fontSizes: theme.darkTheme.fontSizes,
					sizes: {
						'4xl': '76rem',
					},
				},

				components: {
					Anchor: {
						baseStyle: {
							textDecoration: 'underline 1px',
							_hover: {
								color: 'var(--hope-colors-primary11)',
								'& *': { color: 'var(--hope-colors-primary11)' },
							},
						},
					},
					Text: {
						baseStyle: {
							fontSize: 18,
						},
					},
				},
			}}
		>
			<MetaProvider>
				<Title>Ahmed Habeila's Portfolio - Cover Letter</Title>
			</MetaProvider>
			{/* controls */}
			<Drawer opened={showControls()} placement="right" onClose={onCloseControls} size="xl">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader />
					<DrawerBody>
						<Box
							display="grid"
							id="controls"
							position="relative"
							gridTemplateColumns={`${controlsSectionWidth}px 1fr`}
							p="$4"
							rowGap="$8"
							columnGap="$4"
						>
							{/* Skills */}
							<TextSpan>Skills</TextSpan>
							<Box d="grid" gap="$1">
								<SortableVerticalList
									items={skills()}
									setItems={setSkills}
									getId={(item) => item}
									renderItem={(skill, index) => (
										<Box d="grid" gap="$4" gridTemplateColumns={`1fr ${controlsSectionWidth}px`} flex={1}>
											<Input
												value={skill}
												onChange={(e) => {
													const newSkills = skills().slice();
													newSkills[index()] = (e.target as HTMLInputElement).value;
													setSkills(newSkills.filter(Boolean).map((s) => s.trim()));
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

							{/* Experience Bullets */}
							<TextSpan>Experience Bullets</TextSpan>
							<Box d="grid" gap="$1">
								<SortableVerticalList
									items={experienceBullets()}
									setItems={setExperienceBullets}
									getId={(item) => item}
									renderItem={(bullet, index) => (
										<Box d="grid" gap="$4" gridTemplateColumns={`1fr ${controlsSectionWidth}px`} flex={1}>
											<Textarea
												resize="vertical"
												rows={Math.ceil(bullet.length / 80)}
												value={bullet}
												onChange={(e) => {
													const newBullets = experienceBullets().slice();
													newBullets[index()] = (e.target as HTMLTextAreaElement).value;
													setExperienceBullets(newBullets.filter(Boolean));
												}}
											/>
											<Button
												colorScheme="danger"
												onClick={() => {
													const newBullets = experienceBullets().slice();
													newBullets.splice(index(), 1);
													setExperienceBullets(newBullets);
												}}
											>
												Remove
											</Button>
										</Box>
									)}
								/>

								<Textarea
									resize="vertical"
									rows="1"
									value={newExperienceBulletInput()}
									onKeyDown={(e) => {
										if (e.key === 'Enter' && e.ctrlKey) {
											e.preventDefault();
											if (!(e.target as HTMLTextAreaElement).value) return;
											setNewExperienceBulletInput((e.target as HTMLTextAreaElement).value);
											setExperienceBullets(Array.from(new Set([...experienceBullets(), newExperienceBulletInput()!])));
											setNewExperienceBulletInput('');
										}
									}}
									onChange={(e) => {
										if (!e.target.value) return;
										setNewExperienceBulletInput(e.target.value);
										setExperienceBullets(Array.from(new Set([...experienceBullets(), newExperienceBulletInput()!])));
										setNewExperienceBulletInput('');
									}}
								/>
							</Box>

							{/* Perfect Fit Bullets */}
							<TextSpan>Perfect Fit Bullets</TextSpan>
							<Box d="grid" gap="$1">
								<SortableVerticalList
									items={perfectFitBullets()}
									setItems={setPerfectFitBullets}
									getId={(item) => item}
									renderItem={(bullet, index) => (
										<Box d="grid" gap="$4" gridTemplateColumns={`1fr ${controlsSectionWidth}px`} flex={1}>
											<Textarea
												resize="vertical"
												rows={Math.ceil(bullet.length / 80)}
												value={bullet}
												onChange={(e) => {
													const newBullets = perfectFitBullets().slice();
													newBullets[index()] = (e.target as HTMLTextAreaElement).value;
													setPerfectFitBullets(newBullets.filter(Boolean));
												}}
											/>
											<Button
												colorScheme="danger"
												onClick={() => {
													const newBullets = perfectFitBullets().slice();
													newBullets.splice(index(), 1);
													setPerfectFitBullets(newBullets);
												}}
											>
												Remove
											</Button>
										</Box>
									)}
								/>
								<Textarea
									resize="vertical"
									rows="1"
									value={newPerfectFitBulletInput()}
									onKeyDown={(e) => {
										if (e.key === 'Enter' && e.ctrlKey) {
											e.preventDefault();
											if (!(e.target as HTMLTextAreaElement).value) return;
											setNewPerfectFitBulletInput((e.target as HTMLTextAreaElement).value);
											setPerfectFitBullets(Array.from(new Set([...perfectFitBullets(), newPerfectFitBulletInput()!])));
											setNewPerfectFitBulletInput('');
										}
									}}
									onChange={(e) => {
										if (!e.target.value) return;
										setNewPerfectFitBulletInput(e.target.value);
										setPerfectFitBullets(Array.from(new Set([...perfectFitBullets(), newPerfectFitBulletInput()!])));
										setNewPerfectFitBulletInput('');
									}}
								/>
							</Box>

							{/* Interested */}
							<TextSpan>Interested</TextSpan>
							<Textarea
								rows="2"
								resize="vertical"
								value={interested()}
								onChange={createOnChangeHandler(setInterested)}
							/>
							{/* Company name */}
							<TextSpan>Company name</TextSpan>
							<Input value={companyName()} onChange={createOnChangeHandler(setCompanyName)} />
							{/* Role title */}
							<TextSpan>Role title</TextSpan>
							<Input value={roleTitle()} onChange={createOnChangeHandler(setRoleTitle)} />
							{/* Job board */}
							<TextSpan>Job board</TextSpan>
							<Input value={jobBoard()} onChange={createOnChangeHandler(setJobBoard)} />
							{/* pdf */}
							<Text>PDF</Text>
							<RadioGroup value={pdf().toString()}>
								<Flex direction="column" gap="$4">
									<Radio value="true" onChange={() => setPdf(true)}>
										True
									</Radio>
									<Radio value="false" onChange={() => setPdf(false)}>
										False
									</Radio>
								</Flex>
							</RadioGroup>
						</Box>
					</DrawerBody>
					<DrawerFooter gap="$4" display="grid" gridAutoFlow="column" justifyContent="unset">
						{/* Buttons */}
						<Button onClick={printPage} aria-label="Print">
							Print
						</Button>
						<Button variant="dashed" onClick={onCloseControls}>
							Close
						</Button>
						<Button
							variant="dashed"
							as="a"
							href={`/resume-raw?skills=${stringifyArray(skills())}`}
							aria-label="Go to resume"
						>
							Go to resume
						</Button>
						<Button colorScheme="danger" onClick={resetBullets} aria-label="Reset">
							Reset bullets
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			{/* top invisible bar */}
			<Box pos="fixed" top="0" right="0">
				<IconButton
					{...iconButtonProps}
					size="lg"
					as="a"
					href={`/resume-raw?skills=${stringifyArray(skills())}`}
					aria-label="Go to resume raw"
					icon={<IoDocument />}
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

			{/* main */}
			<Box ref={setCoverRef} width={pdf() ? `${coverPrintWidth}px` : 'unset'}>
				<Show when={pdf()}>
					<Header />
				</Show>

				<Flex direction="column" px={pagePaddings.x} pb="$20" pt={pdf() ? 0 : '$20'} id="coverMain">
					<Show when={!pdf()}>
						<TextSpan>Ahmed Habeila</TextSpan>
						<TextSpan>{emailAddress}</TextSpan>
						<TextSpan>{telephoneNumberStylized}</TextSpan>
						{/* <TextSpan>Portfolio: {website}</TextSpan>
					<TextSpan>LinkedIn: {socials.find((s) => s.name === 'LinkedIn')!.href}</TextSpan> */}
						<TextSpan>{locationAddress}</TextSpan>
					</Show>

					<TextSpan>
						{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
					</TextSpan>
					{lineBreak()}

					<TextSpan>
						Dear Hiring Manager
						<Show when={companyName()}>
							{' '}
							at <b>{companyName().trim()}</b>
						</Show>
						,
					</TextSpan>
					{lineBreak()}

					<Box>
						<TextSpan>
							I am writing to express my interest in the <b>{roleTitle().trim()}</b> position
						</TextSpan>
						<Show when={jobBoard()}>
							<TextSpan> advertised on {jobBoard().trim()}</TextSpan>
						</Show>
						<TextSpan>
							. I have over 7 years of experience in building performant and accessible user interfaces using various
							technologies such as <TopSkills skills={skills()} />. I'm experienced in working collaboratively with
							others, performing code reviews and effective communication with clients.
						</TextSpan>
					</Box>
					{lineBreak()}

					<Show when={perfectFitBullets().length}>
						<TextSpan>Here's why I think I'm the perfect fit for this job</TextSpan>
						<List styleType="disc" ml="$6">
							<For each={perfectFitBullets()}>
								{(bullet) => (
									<Switch>
										<Match when={pdf()}>
											<ListItem>
												<TextSpan>{bullet}</TextSpan>
											</ListItem>
										</Match>
										<Match when={!pdf()}>
											<Box>
												<TextSpan>- {bullet}</TextSpan>
											</Box>
										</Match>
									</Switch>
								)}
							</For>
						</List>
						{lineBreak()}
					</Show>

					<Show when={experienceBullets().length}>
						<TextSpan>
							In my previous roles, I have successfully delivered several web-based projects for different clients and
							industries. Some of my notable achievements include:
						</TextSpan>
						<List styleType="disc" ml="$6">
							<For each={experienceBullets()}>
								{(bullet) => (
									<>
										<Switch>
											<Match when={pdf()}>
												<ListItem>
													<TextSpan>{bullet}</TextSpan>
												</ListItem>
											</Match>
											<Match when={!pdf()}>
												<Box>
													<TextSpan>- {bullet}</TextSpan>
												</Box>
											</Match>
										</Switch>
									</>
								)}
							</For>
						</List>
						{lineBreak()}
					</Show>

					{/* <GameDevelopmentBackground /> */}
					{/* {lineBreak()} */}

					<TextSpan>{interested()}</TextSpan>
					{lineBreak()}

					<TextSpan>
						Thank you for considering my application. I would love to discuss this opportunity further with you and
						answer any questions you may have.
					</TextSpan>
					{lineBreak()}

					<Show when={!pdf()}>
						<TextSpan>You can find my portfolio at {website}</TextSpan>
						{lineBreak()}
					</Show>

					<TextSpan>Sincerely,</TextSpan>
					<TextSpan>Ahmed Habeila</TextSpan>
				</Flex>
			</Box>
		</HopeProvider>
	);
};

export default CoverLetter;
