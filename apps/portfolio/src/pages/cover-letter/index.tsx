import {
	Anchor,
	Box,
	Button,
	Flex,
	HopeProvider,
	Input,
	NotificationsProvider,
	Text,
	notificationService,
} from '@hope-ui/solid';
import { useSearchParams } from '@solidjs/router';
import { Show, createEffect, createSignal } from 'solid-js';
import { website } from '../../data/work';
import { darkTheme as theme } from '../../ui/theme';
import { coverPrintWidth } from '../../utils';

export type Params = {
	skill1: string;
	skill2: string;
	skill3: string;
	companyName: string;
	roleTitle: string;
	pdf: 'true' | 'false';
};

const CoverLetter = () => {
	const [params, setParams] = useSearchParams<Params>();

	const [skill1, setSkill1] = createSignal(params.skill1 ?? 'React');
	const [skill2, setSkill2] = createSignal(params.skill2 ?? 'Typescript');
	const [skill3, setSkill3] = createSignal(params.skill3 ?? 'Node.js');
	const [companyName, setCompanyName] = createSignal(params.companyName ?? 'Discord');
	const [roleTitle, setRoleTitle] = createSignal(params.roleTitle ?? 'Front-end Web Developer');
	const [pdf, setPdf] = createSignal<Params['pdf']>(params.pdf ?? 'false');

	createEffect(() => {
		setParams({
			skill1: skill1(),
			skill2: skill2(),
			skill3: skill3(),
			companyName: companyName(),
			roleTitle: roleTitle(),
		});
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
		setPdf('false');

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

			.catch((e) => {
				notificationService.show({
					title: 'Print failed',
					status: 'danger',
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
							textDecoration: 'underline',
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
			<NotificationsProvider>
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
						<Text>Skill 1</Text>
						<Input value={skill1()} onChange={createOnChangeHandler(setSkill1)}></Input>
						<Text>Skill 2</Text>
						<Input value={skill2()} onChange={createOnChangeHandler(setSkill2)}></Input>
						<Text>Skill 3</Text>
						<Input value={skill3()} onChange={createOnChangeHandler(setSkill3)}></Input>
						<Text>Company name</Text>
						<Input value={companyName()} onChange={createOnChangeHandler(setCompanyName)}></Input>
						<Text>Role title</Text>
						<Input value={roleTitle()} onChange={createOnChangeHandler(setRoleTitle)}></Input>

						<Button onClick={printPage} aria-label="Print">
							Print
						</Button>
					</Box>
				</Show>

				<Flex direction="column" p="$20">
					<Text as="span">
						Dear Hiring Manager at <b>{companyName()}</b>,
					</Text>
					{lineBreak()}
					<Text as="span">
						I am writing to express my interest in the <b>{roleTitle()}</b> role. With 5 years of experience in web
						development, I am confident that I have the skills and qualifications necessary to excel in this position.
					</Text>
					{lineBreak()}
					<Text as="span">
						I have a strong background in <b>{skill1()}</b>, <b>{skill2()}</b> and <b>{skill3()}</b>. I also have
						experience with mobile-first design, SEO, accessibility and web development fundamentals.
					</Text>
					<Text as="span">On the back end, I have experience with Express.js, Firebase and AWS.</Text>
					{lineBreak()}
					<Text as="span">
						During my time working as a senior front-end web developer for Calqulate, I led a team of four front-end
						developers reviewing PRs and optimizing <b>code performance</b>. I developed front-end monorepo architecture
						with two apps and five independent libraries including a proprietary charts library using D3.js, tables and
						reusable UI components. I also developed a proprietary types SDK for API type safety.
					</Text>
					{lineBreak()}
					<Text as="span">
						I am excited about the opportunity to bring my skills and experience to your company and contribute to the
						continued success of your web development team. Thank you so much for considering my application.
					</Text>
					{lineBreak()}
					<Text as="span">
						Please also consider taking a look at{' '}
						{pdf() === 'false' ? `my portfolio at ${website}` : <Anchor href={website}>my portfolio</Anchor>}
					</Text>
					{lineBreak()}
					<Text as="span">Sincerely,</Text>
					<Text as="span">Ahmed Habeila</Text>
					<Text as="span">(647) 979-0872</Text>
					<Text as="span">HabeilaAhmed@gmail.com</Text>
				</Flex>
			</NotificationsProvider>
		</HopeProvider>
	);
};

export default CoverLetter;
