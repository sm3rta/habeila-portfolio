import { Flex } from '@hope-ui/solid';
import { For } from 'solid-js';
import { Text } from '../../ui/Text';
import { StyledDivider } from './Divider';

const secondaryTextColor = 'var(--hope-colors-neutral10)';

export const SelfTaught = () => (
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
);
