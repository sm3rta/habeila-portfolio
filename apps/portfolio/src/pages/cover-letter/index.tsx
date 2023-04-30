import { Box, Button, Flex, HopeProvider, Input, List, ListItem, Textarea } from '@hope-ui/solid';
import { Link, useSearchParams } from '@solidjs/router';
import { For, Show, createEffect, createSignal, onMount } from 'solid-js';
import { emailAddress, locationAddress, telephoneNumberStylized, website } from '../../data/work';
import { Text } from '../../ui/Text';
import { darkTheme as theme } from '../../ui/theme';
import { coverPrintWidth } from '../../utils';
import { pagePaddings } from '../resume-raw';
import { Header } from '../resume-raw/Header';
import { TopSkills } from '../resume-raw/TopSkills';
import { createDesktopNotification } from '../resume-raw/createDesktopNotification';
import { paramsDefaultValues, parseArray, stringifyArray } from '../resume-raw/utils';

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
	'Collaborating with a team of 4 to launch 2 accessible, responsive websites with light/dark themes in 1 week, achieving 100% Lighthouse score with optimized SEO and accessibility.',
	'Creating UI component library following a design system and documented on Storybook.',
	'Communicated with clients to develop and document website requirements in an agile environment.',
	'Leading team of 4 front-end developers in developing a front-end monorepo architecture with 2 apps and 5 independent libraries for Calqulate.',
	'Enhancing developer experience by developing a proprietary types SDK for API type safety.',
	'Launching 2 responsive, accessible SEO-focused websites for BMW Foundation and TwentyThirty, increasing the reach to thousands of organic monthly users.',
	// 'Creating accessibility focused websites with high contrast mode, dyslexia-friendly font, and animations toggle.',
	// 'Building back-end API with Express.js and Firebase for authentication, file uploads, and emails for an educational platform.',
	'Conducting system analysis, designing and implementing eCommerce website.',
];

const defaultPerfectFitBullets: string[] = [
	'During my time at calqulate, I mentored a team of 4 front-end developers, performing PR reviews for code quality and enforcing best practices.',
	'I have extensive experience with multiple React state management tools including Redux, Redux-toolkit, and MobX.',
	'I also have experience writing unit tests with Jest and React testing library.',
];

const defaultInterested =
	'I am interested in working for your company because I believe I can contribute to your vision\
 of creating innovative and user-friendly web solutions. I am eager to learn from your talented team\
 and apply my skills and knowledge to your projects.';

const CoverLetter = () => {
	const [params, setParams] = useSearchParams<Params>();

	const [skills, setSkills] = createSignal<string[]>(
		parseArray(params.skills) ?? (paramsDefaultValues.skills as unknown as string[])
	);
	const [interested, setInterested] = createSignal<string>(params.interested ?? defaultInterested);
	const [jobBoard, setJobBoard] = createSignal<string>(params.jobBoard ?? '');
	const [experienceBullets, setExperienceBullets] = createSignal<string[]>(
		params.experienceBullets ? JSON.parse(params.experienceBullets) : defaultExperienceBullets
	);
	const [perfectFitBullets, setPerfectFitBullets] = createSignal<string[]>(
		params.perfectFitBullets ? JSON.parse(params.perfectFitBullets) : defaultPerfectFitBullets
	);
	const [companyName, setCompanyName] = createSignal(params.companyName ?? 'Discord');
	const [roleTitle, setRoleTitle] = createSignal(params.roleTitle ?? 'Front-end Developer');
	const [pdf, setPdf] = createSignal<Params['pdf']>(params.pdf ?? 'false');

	const [newSkillInput, setNewSkillInput] = createSignal<string>();
	const [newExperienceBulletInput, setNewExperienceBulletInput] = createSignal<string>();
	const [newPerfectFitBulletInput, setNewPerfectFitBulletInput] = createSignal<string>();

	onMount(() => {
		document.body.addEventListener('keydown', (e) => {
			if (e.key === 'a' && e.ctrlKey) {
				if (document.activeElement?.nodeName === 'INPUT') return;
				if (document.activeElement?.nodeName === 'TEXTAREA') return;
				const cover = document.getElementById('cover');
				if (!cover) return;
				setTimeout(() => {
					const range = document.createRange();
					range.selectNode(cover);
					window.getSelection()?.removeAllRanges();
					window.getSelection()?.addRange(range);
				}, 0);
			}
		});
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
			},
			{
				// replace: true,
			}
		);
	});

	const createOnChangeHandler = (setFn: (value: string) => void) => (e: Event) => {
		const { value } = e.target as HTMLInputElement;
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

	const printPage = async () => {
		const root = document.getElementById('root');
		if (!root) return;

		root.style.width = `${coverPrintWidth}px`;
		setPdf('true');

		const height = root.scrollHeight;
		root.style.width = '';
		setTimeout(() => {
			setPdf('false');
		}, 0);

		const body = {
			url: window.location.href,
			height,
		};

		await fetch('http://localhost:3001/cover', {
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

	const lineBreak = () => (pdf() === 'false' ? <br /> : <Box h={30} />);

	return (
		<HopeProvider
			config={{
				lightTheme: {
					fontSizes: theme.darkTheme.fontSizes,
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
			<Show when={pdf() === 'false'}>
				<Box
					display="grid"
					id="controls"
					gridTemplateColumns="200px 1fr"
					// maxW="500px"
					p="$4"
					rowGap="$8"
					columnGap="$4"
					userSelect="none"
				>
					{/* Skills */}
					<TextSpan>Skills</TextSpan>
					<Box d="grid" gap="$1">
						<For each={skills()}>
							{(skill, index) => (
								<Box d="grid" gap="$4" gridTemplateColumns="1fr 150px 0">
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
						</For>
						<Box d="grid" gap="$4" gridTemplateColumns="1fr 150px 0">
							<Input value={newSkillInput()} onChange={createOnChangeHandler(setNewSkillInput)} />
							<Button
								onClick={() => {
									if (!newSkillInput()) return;
									setSkills(Array.from(new Set([...skills(), newSkillInput()!])));
									setNewSkillInput('');
								}}
							>
								Add
							</Button>
						</Box>
					</Box>

					{/* Experience Bullets */}
					<TextSpan>Experience Bullets</TextSpan>
					<Box d="grid" gap="$1">
						<For each={experienceBullets()}>
							{(bullet, index) => (
								<Box d="grid" gap="$4" gridTemplateColumns="1fr 150px 0">
									<Textarea
										resize="vertical"
										rows={bullet.length > 100 ? 2 : 1}
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
						</For>
						<Box d="grid" gap="$4" gridTemplateColumns="1fr 150px 0">
							<Textarea
								resize="vertical"
								rows="1"
								value={newExperienceBulletInput()}
								onChange={createOnChangeHandler(setNewExperienceBulletInput)}
							/>
							<Button
								onClick={() => {
									if (!newExperienceBulletInput()) return;
									setExperienceBullets(Array.from(new Set([...experienceBullets(), newExperienceBulletInput()!])));
									setNewExperienceBulletInput('');
								}}
							>
								Add
							</Button>
						</Box>
					</Box>

					{/* Perfect Fit Bullets */}
					<TextSpan>Perfect Fit Bullets</TextSpan>
					<Box d="grid" gap="$1">
						<For each={perfectFitBullets()}>
							{(bullet, index) => (
								<Box d="grid" gap="$4" gridTemplateColumns="1fr 150px 0">
									<Textarea
										resize="vertical"
										rows={bullet.length > 100 ? 2 : 1}
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
						</For>
						<Box d="grid" gap="$4" gridTemplateColumns="1fr 150px 0">
							<Textarea
								resize="vertical"
								rows="1"
								value={newPerfectFitBulletInput()}
								onChange={createOnChangeHandler(setNewPerfectFitBulletInput)}
							/>
							<Button
								onClick={() => {
									if (!newPerfectFitBulletInput()) return;
									setPerfectFitBullets(Array.from(new Set([...perfectFitBullets(), newPerfectFitBulletInput()!])));
									setNewPerfectFitBulletInput('');
								}}
							>
								Add
							</Button>
						</Box>
					</Box>

					{/* Interested */}
					<TextSpan>Interested</TextSpan>
					<Textarea rows="2" resize="vertical" value={interested()} onChange={createOnChangeHandler(setInterested)} />
					{/* Company name */}
					<TextSpan>Company name</TextSpan>
					<Input value={companyName()} onChange={createOnChangeHandler(setCompanyName)} />
					{/* Role title */}
					<TextSpan>Role title</TextSpan>
					<Input value={roleTitle()} onChange={createOnChangeHandler(setRoleTitle)} />
					{/* Job board */}
					<TextSpan>Job board</TextSpan>
					<Input value={jobBoard()} onChange={createOnChangeHandler(setJobBoard)} />
					{/* Buttons */}
					<Button onClick={printPage} aria-label="Print">
						Print
					</Button>
					<Flex gap="$4">
						<Button variant="dashed" w="200px" onClick={resetBullets} aria-label="Reset">
							Reset bullets
						</Button>
						<Button
							variant="dashed"
							w="200px"
							as={Link}
							href={`/resume-raw?skills=${stringifyArray(skills())}`}
							aria-label="Go to resume"
						>
							Go to resume
						</Button>
					</Flex>
				</Box>
			</Show>

			<Show when={pdf() === 'true'}>
				<Header />
			</Show>

			<Flex direction="column" px={pagePaddings.x} pb="$20" pt={pdf() === 'true' ? 0 : '$20'} id="cover">
				<Show when={pdf() === 'false'}>
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
						. I have over 5 years of experience in building elegant and performant user interfaces using various
						technologies such as <TopSkills skills={skills()} />. I also have a background in leading other developers,
						performing code reviews, and communicating effectively with clients.
					</TextSpan>
				</Box>
				{lineBreak()}

				<Show when={perfectFitBullets().length}>
					<TextSpan>Here's why I think I'm the perfect fit for this job</TextSpan>
					<List styleType="disc" ml="$6">
						<For each={perfectFitBullets()}>
							{(bullet) => (
								<ListItem>
									<TextSpan>{bullet}</TextSpan>
								</ListItem>
							)}
						</For>
					</List>
					{lineBreak()}
				</Show>

				<TextSpan>
					In my previous roles, I have successfully delivered several web-based projects for different clients and
					industries. Some of my notable achievements include:
				</TextSpan>
				<List styleType="disc" ml="$6">
					<For each={experienceBullets()}>
						{(bullet) => (
							<ListItem>
								<TextSpan>{bullet}</TextSpan>
							</ListItem>
						)}
					</For>
				</List>
				{lineBreak()}

				{/* <GameDevelopmentBackground />
				{lineBreak()} */}

				<TextSpan>{interested()}</TextSpan>
				{lineBreak()}

				<TextSpan>
					Thank you for your consideration of my application. I would love to discuss this opportunity further with you
					and answer any questions you may have.
				</TextSpan>
				{lineBreak()}

				<Show when={pdf() === 'false'}>
					<TextSpan>You can find my portfolio at {website}</TextSpan>
					{lineBreak()}
				</Show>

				<TextSpan>Sincerely,</TextSpan>
				<TextSpan>Ahmed Habeila</TextSpan>
			</Flex>
		</HopeProvider>
	);
};

export default CoverLetter;
