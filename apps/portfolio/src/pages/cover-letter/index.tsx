import { Box, Button, Flex, HopeProvider, Input, List, ListItem } from '@hope-ui/solid';
import { useSearchParams } from '@solidjs/router';
import { For, Show, createEffect, createSignal, onMount } from 'solid-js';
import { website } from '../../data/work';
import { Text } from '../../ui/Text';
import { darkTheme as theme } from '../../ui/theme';
import { coverPrintWidth } from '../../utils';
import { pagePaddings } from '../resume-raw';
import { Header } from '../resume-raw/Header';
import { TopSkills } from '../resume-raw/TopSkills';
import { createDesktopNotification } from '../resume-raw/createDesktopNotification';
import { parseArray, stringifyArray } from '../resume-raw/utils';

export type Params = {
	skills: string;
	companyName: string;
	roleTitle: string;
	pdf: 'true' | 'false';
	bullets: string;
};

const defaultBullets: string[] = [
	'Collaborating with a team of 4 to launch 2 accessible, responsive websites with light/dark themes in 1 week for Quint blog and Quint Staking App. Achieved 100% Lighthouse score with optimized SEO and accessibility.',
	'Creating UI component library based on Radix UI design system and documented on Storybook.',
	'Leading team of 4 front-end developers in developing a front-end monorepo architecture with 2 apps and 5 independent libraries for Calqulate.',
	'Enhancing developer experience by developing a proprietary types SDK for API type safety.',
	'Launching 2 responsive, accessible SEO-focused websites for BMW Foundation and TwentyThirty, increasing the reach to thousands of organic monthly users.',
	'Creating accessibility menu with high contrast mode, dyslexia-friendly font, and animations toggle.',
	'Building back-end API with Express.js and Firebase for authentication, file uploads, emails, and database queries for an educational platform.',
	'Integrating Zoom for automatic meeting link creation and email sending to students.',
	'Building admin dashboard for lecture management and grade emailing to parents.',
];

const CoverLetter = () => {
	const [params, setParams] = useSearchParams<Params>();

	const [skills, setSkills] = createSignal<string[]>(parseArray(params.skills) ?? ['JavaScript', 'React', 'HTML']);
	const [bullets, setBullets] = createSignal<string[]>(params.bullets ? JSON.parse(params.bullets) : defaultBullets);
	const [companyName, setCompanyName] = createSignal(params.companyName ?? 'Discord');
	const [roleTitle, setRoleTitle] = createSignal(params.roleTitle ?? 'Front-end Developer');
	const [pdf, setPdf] = createSignal<Params['pdf']>(params.pdf ?? 'false');

	onMount(() => {
		document.body.addEventListener('keydown', (e) => {
			if (e.key === 'a' && e.ctrlKey) {
				if (document.activeElement?.nodeName === 'INPUT') return;
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
				skills: stringifyArray(skills()),
				companyName: companyName(),
				roleTitle: roleTitle(),
				bullets: JSON.stringify(bullets()),
			},
			{ replace: true }
		);
	});

	const createOnChangeHandler = (setFn: (value: string) => void) => (e: Event) => {
		const { value } = e.target as HTMLInputElement;
		setFn(value);
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

	const lineBreak = () =>
		pdf() === 'false' ? (
			<br />
		) : (
			<>
				<br />
				<br />
			</>
		);

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
					userSelect="none"
				>
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
					<Text>Bullets</Text>
					<Box d="grid" gap="$1">
						<For each={bullets()}>
							{(bullet, index) => (
								<Input
									noOfLines={4}
									value={bullet}
									onChange={(e) => {
										const newBullets = bullets().slice();
										newBullets[index()] = (e.target as HTMLInputElement).value;
										setBullets(newBullets.filter(Boolean));
									}}
								/>
							)}
						</For>

						<Input
							onChange={(e) => {
								const newBullets = bullets().slice();
								newBullets.push((e.target as HTMLInputElement).value);
								setBullets(newBullets.filter(Boolean));
							}}
						/>
					</Box>
					<Text>Company name</Text>
					<Input value={companyName()} onChange={createOnChangeHandler(setCompanyName)} />
					<Text>Role title</Text>
					<Input value={roleTitle()} onChange={createOnChangeHandler(setRoleTitle)} />
					<Button onClick={printPage} aria-label="Print">
						Print
					</Button>
				</Box>
			</Show>

			<Show when={pdf() === 'true'}>
				<Header />
			</Show>

			<Flex direction="column" px={pagePaddings.x} pb="$20" pt={pdf() === 'true' ? 0 : '$20'} id="cover">
				<Show when={pdf() === 'false'}>
					<Text as="span">Ahmed Habeila</Text>
					<Text as="span">HabeilaAhmed@gmail.com</Text>
					<Text as="span">(647) 979-0872</Text>
					{/* <Text as="span">Portfolio: {website}</Text>
					<Text as="span">LinkedIn: {socials.find((s) => s.name === 'LinkedIn')!.href}</Text> */}
					<Text as="span">North York, ON, M3A 2E2</Text>
					<Text as="span">
						{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
					</Text>
					{lineBreak()}
				</Show>
				<Text as="span">
					Dear Hiring Manager
					{companyName() && (
						<>
							{' '}
							at <b>{companyName()}</b>
						</>
					)}
					,
				</Text>
				{lineBreak()}
				<Text as="span">
					I am writing to express my interest in the <b>{roleTitle()}</b> position. I have over 5 years of experience in
					building elegant and performant user interfaces using various technologies such as{' '}
					<TopSkills skills={skills()} />. I also have a background in leading other developers, performing code
					reviews, and communicating effectively with clients.
				</Text>
				{lineBreak()}
				<Text as="span">
					In my previous roles, I have successfully delivered several web-based projects for different clients and
					industries. Some of my notable achievements include:
				</Text>
				{lineBreak()}

				<List styleType="disc" ml="$6">
					<For each={bullets()}>{(bullet) => <ListItem>{bullet}</ListItem>}</For>
				</List>
				{lineBreak()}

				<Text as="span">
					I am interested in working for your company because I believe I can contribute to your vision of creating
					innovative and user-friendly web solutions. I am eager to learn from your talented team and apply my skills
					and knowledge to your projects.
				</Text>
				{lineBreak()}
				<Text as="span">
					Thank you for your consideration of my application. I would love to discuss this opportunity further with you
					and answer any questions you may have.
				</Text>
				{lineBreak()}
				<Show when={pdf() === 'false'}>
					<Text as="span">You can find my portfolio at {website}</Text>
					{lineBreak()}
				</Show>
				<Text as="span">Sincerely,</Text>
				<Text as="span">Ahmed Habeila</Text>
			</Flex>
		</HopeProvider>
	);
};

export default CoverLetter;
