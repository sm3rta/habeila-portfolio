import {
	Anchor,
	Box,
	Divider,
	Flex,
	HopeProvider,
	IconButton,
	Input,
	PropsOf,
	Radio,
	RadioGroup,
} from '@hope-ui/solid';
import { Link, useSearchParams } from '@solidjs/router';
import { BsChatLeftTextFill, BsPrinter } from 'solid-icons/bs';
import { TbStackPop } from 'solid-icons/tb';
import { ComponentProps, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Text } from '../../ui/Text';
import { colors } from '../../ui/theme';
import { printWidth } from '../../utils';
import Page1 from './Page1';
import Page2 from './Page2';

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
		icon: status === 'success' ? '../../../public/check.png' : '../../../public/cross.png',
	});
};

export const pagePaddings = {
	x: '$20',
	y: '$16',
};

export const ICON_SIZE = 20;

export const StyledDivider = styled((props: PropsOf<typeof Divider>) => <Divider {...props} />)({
	marginBlock: '0.5rem',
	backgroundColor: 'gray',
	height: '2px',
});

export const StyledFlexLink = (props: ComponentProps<typeof Flex>) => (
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
		const page2 = document.getElementById('page2');
		if (!root || !page2) return;

		root.style.width = `${printWidth}px`;
		page2.style.display = 'none';
		const height = root.scrollHeight;
		root.style.width = '';
		page2.style.display = 'block';

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
							textDecoration: 'underline',
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
			{/* top invisible bar */}
			<Box pos="fixed" top="0" right="0">
				<IconButton
					{...iconButtonProps}
					size="lg"
					as={Link}
					href={`/cover?skill1=${skill1()}&skill2=${skill2()}&skill3=${skill3()}`}
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
			{/* header */}

			{/* page 1 */}
			<Page1
				{...{
					jobType: jobType(),
					senior: senior(),
					skill1: skill1(),
					skill2: skill2(),
					skill3: skill3(),
				}}
			/>

			{/* page 2 */}
			<Page2 />
		</HopeProvider>
	);
};

export default ResumeRaw;
