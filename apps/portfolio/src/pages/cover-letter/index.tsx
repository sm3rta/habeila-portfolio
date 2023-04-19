import { Anchor, Box, Button, Flex, HopeProvider, Input, Text } from '@hope-ui/solid';
import { useSearchParams } from '@solidjs/router';
import { For, Show, createEffect, createSignal, onMount } from 'solid-js';
import { website } from '../../data/work';
import { darkTheme as theme } from '../../ui/theme';
import { coverPrintWidth } from '../../utils';
import { TopSkills, createDesktopNotification, parseArray, stringifyArray } from '../resume-raw';

export type Params = {
	skills: string;
	companyName: string;
	roleTitle: string;
	adjective: string;
	pdf: 'true' | 'false';
};

const CoverLetter = () => {
	const [params, setParams] = useSearchParams<Params>();

	const [adjective, setAdjective] = createSignal(params.adjective ?? 'Highly motivated');
	const [skills, setSkills] = createSignal<string[]>(parseArray(params.skills) ?? ['JavaScript', 'React', 'HTML']);
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
					gridTemplateColumns="1fr 1fr"
					maxW="500px"
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
					<Text>Company name</Text>
					<Input value={companyName()} onChange={createOnChangeHandler(setCompanyName)} />
					<Text>Role title</Text>
					<Input value={roleTitle()} onChange={createOnChangeHandler(setRoleTitle)} />
					<Text>Adjective</Text>
					<Input value={adjective()} onChange={createOnChangeHandler(setAdjective)} />
					<Button onClick={printPage} aria-label="Print">
						Print
					</Button>
				</Box>
			</Show>

			<Flex direction="column" p="$20" id="cover">
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
					I am writing to express my interest in the <b>{roleTitle()}</b> role. With 5 years of experience in web
					development, I am confident that I have the skills and qualifications necessary to excel in this position.
				</Text>
				{lineBreak()}
				<Text as="span">
					I have a strong background in <TopSkills skills={skills} />. I also have experience with mobile-first design,
					SEO, accessibility and web development fundamentals.
				</Text>
				<Text as="span">On the back end, I have experience with Express.js, Firebase and AWS.</Text>
				{lineBreak()}
				<Text as="span">
					During my time working as a senior front-end developer for Calqulate, I led a team of four front-end
					developers reviewing PRs and optimizing <b>code performance</b>. I developed front-end monorepo architecture
					with two apps and five independent libraries including a proprietary charts library using D3.js, tables and
					reusable UI components. I also developed a proprietary types SDK for API type safety.
				</Text>
				{lineBreak()}
				<Text as="span">
					I am excited about the opportunity to bring my skills and experience to your company and contribute to the
					continued success of your web development team.
				</Text>
				{lineBreak()}
				<Text as="span">
					{pdf() === 'false' ? (
						`You can find my portfolio at ${website}`
					) : (
						<>
							Here is <Anchor href={website}>my portfolio</Anchor>
						</>
					)}
				</Text>
				{lineBreak()}
				<Text as="span">Sincerely,</Text>
				<Text as="span">Ahmed Habeila</Text>
				<Text as="span">(647) 979-0872</Text>
				<Text as="span">HabeilaAhmed@gmail.com</Text>
			</Flex>
		</HopeProvider>
	);
};

export default CoverLetter;
