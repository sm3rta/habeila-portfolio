import { Box, Flex } from '@hope-ui/solid';
import { SiApache, SiCplusplus, SiGithub, SiLinux } from 'solid-icons/si';
import { For } from 'solid-js';
import { ICON_SIZE, StyledDivider, StyledFlexLink, pagePaddings } from '.';
import { Text } from '../../ui/Text';
import { SkillBadge } from '../home/SkillBadge';

const secondaryTextColor = 'var(--hope-colors-neutral10)';

const Page2 = () => {
	return (
		<Box as="main" px={pagePaddings.x} py={pagePaddings.y} id="page2">
			<Flex direction="column">
				<Text variant="title">Education</Text>
				<StyledDivider />
				<Text>Bachelor's Degree of Computer Science and Automatic Control</Text>
				<Text>Tanta University of Engineering &ndash; (2014 - 2019)</Text>
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
					build full-fledged back-end multi-threaded API servers with middleware support and connect it to the desired
					database in C++
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
					<For
						each={[
							{ course: 'Mastering React', subtitle: '(by Mosh Hamedani)' },
							{ course: 'Node.js - The Complete Guide to Build RESTful APIs', subtitle: '(by Mosh Hamedani)' },
							{ course: 'CSS - The Complete Guide', subtitle: '(by Maximilian Schwarzmüller)' },
							{
								course: 'Vue - The Complete Guide (w/ Router, Vuex, Composition API)',
								subtitle: '(by Maximilian Schwarzmüller)',
							},
							{ course: 'Master C++ and OOP', subtitle: '(Learncpp.com)' },
							{ course: 'Introduction to Game Development Specialization', subtitle: '(Coursera)' },
						]}
					>
						{({ course, subtitle }) => (
							<Flex>
								<Text d="contents">{course}</Text>
								<Text d="contents" color={secondaryTextColor}>
									{' '}
									{subtitle}
								</Text>
							</Flex>
						)}
					</For>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Page2;
