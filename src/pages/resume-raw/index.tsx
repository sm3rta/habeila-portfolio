import {
	Center,
	Button,
	Anchor,
	HopeProvider,
	Flex,
	Text,
	IconButton,
	Box,
	List,
	ListItem,
	Grid,
	GridItem,
	Divider,
	Badge,
	Progress,
	ProgressIndicator,
} from '@hope-ui/solid';
import { introText, work } from '../../data/work';
import Fade from '../../ui/components/Fade';
import { CompanyProjects } from '../resume/CompanyProjects';
import { Timeline } from '../resume/Timeline';
import { EmailAndTelephone, socials } from '../home/Contact';
import { For } from 'solid-js';
import { theme } from '../../ui/theme';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine } from 'solid-icons/ri';
import { styled } from 'solid-styled-components';
import { AiOutlineGithub } from 'solid-icons/ai';

const ICON_SIZE = 20;

const secondaryTextAndIconColor = 'var(--hope-colors-neutral8)';

const StyledDivider = styled((props: any) => <Divider {...props} />)(({ theme }) => {
	console.log(`🚀 ~ StyledDivider ~ theme`, theme);
	return {
		marginBlock: '1rem',
		backgroundColor: 'var(--hope-colors-info12)',
		height: '2px',
	};
});

const ResumeRaw = () => {
	return (
		<HopeProvider
			config={{
				lightTheme: {
					colors: { primary5: '#00254d' },
					fontSizes: theme.darkTheme.fontSizes,
				},

				components: {
					// Text: { baseStyle: { my: '$2' } },
					Badge: { baseStyle: { textTransform: 'none' } },
				},
			}}
		>
			<Flex background="$info12" justifyContent="space-between" p="$4">
				<Flex direction="column">
					<Text color="white" fontSize="$3xl" fontWeight="$extrabold">
						Ahmed Habeila
					</Text>
					<Text color="white" fontSize="$2xl">
						Front-end web developer
					</Text>

					<Flex direction="column" rowGap="$4">
						<Flex as="a" href={"mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!"} target="_blank">
							<HiOutlineMail size={ICON_SIZE} color={secondaryTextAndIconColor} />
							<Text color={secondaryTextAndIconColor} fontSize="$md">
								HabeilaAhmed@gmail.com
							</Text>
						</Flex>
						<Flex as={'a'} href={'tel:+201015178686'} target="_blank">
							<RiDeviceSmartphoneLine size={ICON_SIZE} color={secondaryTextAndIconColor} />
							<Text color={secondaryTextAndIconColor} fontSize="$md">
								+20 (101) 517-8686
							</Text>
						</Flex>
					</Flex>
				</Flex>
				<Flex direction="column">
					<For each={socials.filter((s) => s.name)}>
						{({ href, Icon, name }) => (
							<Flex gap="$2" as="a" href={href} target="_blank" alignItems="center">
								<Icon size={ICON_SIZE} color={secondaryTextAndIconColor} />
								<Text color={secondaryTextAndIconColor}>{name}</Text>
							</Flex>
						)}
					</For>
				</Flex>
			</Flex>

			<Flex direction="column" p="$8">
				<Text fontSize="$lg" fontWeight="$bold">
					ABOUT
				</Text>
				<StyledDivider />
				<Text>{introText}</Text>
			</Flex>

			<Grid templateColumns={{ '@lg': '3fr 1fr' }} p="$8" gap="$8">
				<GridItem flexDirection="column">
					<Text fontSize="$lg" fontWeight="$bold">
						WORK EXPERIENCE
					</Text>
					<StyledDivider />
					<Box css={{ '&>div': { p: 0 } }}>
						<Timeline>
							{work.map((company) => (
								<CompanyProjects company={company} />
							))}
						</Timeline>
					</Box>

					<Flex direction="column">
						<Text fontSize="$lg" fontWeight="$bold">
							EDUCATION
						</Text>
						<StyledDivider />

						<Text fontWeight="$bold">Computer Science and Automatic Control</Text>
						<Text>Faculty of Engineering - Tanta University</Text>
						<Text fontSize="$sm">2014 - 2019</Text>
					</Flex>

					<Flex direction="column">
						<Text fontSize="$lg" fontWeight="$bold">
							GRADUATION PROJECT{' '}
						</Text>
						<StyledDivider />
						<Flex>
							<Text fontWeight="$bold">An Express-like C++ web application framework</Text>
							<a href="https://github.com/darwishdd/cpp_webapi_framework" target="_blank">
								<AiOutlineGithub size={ICON_SIZE} color="$primary5" />
							</a>
						</Flex>
						<Text>
							A simple-to-use web development framework with an easy syntax inspired by Express.js that lets developers
							build full fledged back-end multi-threaded api servers and connect it to the desired database in C++ that
							also supports middleware
						</Text>
						<Flex gap="$2" wrap="wrap">
							<For each={['C++17', 'CGI', 'Apache', 'Multithreading', 'Linux']}>{(item) => <Badge>{item}</Badge>}</For>
						</Flex>
					</Flex>
				</GridItem>
				<GridItem flexDirection="column">
					<Text fontSize="$lg" fontWeight="$bold">
						SKILLS & TOOLS
					</Text>
					<StyledDivider />

					<Flex direction="column">
						<For
							each={[
								{ name: 'TypeScript', value: 96 },
								{ name: 'React 18', value: 94 },
								{ name: 'Material UI', value: 90 },
								{ name: 'Node.js', value: 89 },
								{ name: 'Git', value: 87 },
							]}
						>
							{({ name, value }) => (
								<Flex direction="column" gap="$2">
									<Text>{name}</Text>
									<Progress size="xs" value={value}>
										<ProgressIndicator bgColor="$primary5 !important" />
									</Progress>
								</Flex>
							)}
						</For>
					</Flex>

					<Flex gap="$2" wrap="wrap">
						<For
							each={[
								'Jira',
								'JSS/Styled components',
								'Data fetching',
								'Localization',
								'Forms & validation',
								'Responsive Design',
								'Unit Testing',
								'JSDoc',
								'Global State Design',
							]}
						>
							{(item) => <Badge>{item}</Badge>}
						</For>
					</Flex>

					<Flex gap="$2" wrap="wrap">
						<For each={['Express.js', 'Firebase', 'MongoDB', 'JWT']}>{(item) => <Badge>{item}</Badge>}</For>
					</Flex>

					<Flex gap="$2" wrap="wrap">
						<For each={['JS/HTML/CSS', 'Python', 'C++', 'Vue', 'Solid JS']}>{(item) => <Badge>{item}</Badge>}</For>
					</Flex>

					<Flex direction="column">
						<Text fontSize="$lg" fontWeight="$bold">
							LANGUAGES
						</Text>
						<StyledDivider />
						<Flex direction="column">
							<Flex>
								<Text d="contents">Arabic</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
									{' '}
									(Native)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">English</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
									{' '}
									(Fluent)
								</Text>
							</Flex>
						</Flex>
					</Flex>

					<Flex direction="column">
						<Text fontSize="$lg" fontWeight="$bold">
							SELF-TAUGHT COURSES
						</Text>
						<StyledDivider />
						<Flex direction="column">
							<Flex>
								<Text d="contents">Mastering React</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
									{' '}
									(by Mosh Hamedani)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">Node.js - The Complete Guide to Build RESTful APIs</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
									{' '}
									(by Mosh Hamedani)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">Vue - The Complete Guide (w/ Router, Vuex, Composition API)</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
									{' '}
									(by Maximilian Schwarzmüller)
								</Text>
							</Flex>
							<Flex>
								<Text d="contents">CSS - The Complete Guide</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
									{' '}
									(by Maximilian Schwarzmüller)
								</Text>
							</Flex>

							<Flex>
								<Text d="contents">Master C++ and OOP</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
									{' '}
									(Learncpp.com)
								</Text>
							</Flex>

							<Flex>
								<Text d="contents">Introduction to Game Development Specialization</Text>
								<Text d="contents" fontSize="$sm" color={secondaryTextAndIconColor}>
									{' '}
									(Coursera)
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</GridItem>
			</Grid>
		</HopeProvider>
	);
};

export default ResumeRaw;
