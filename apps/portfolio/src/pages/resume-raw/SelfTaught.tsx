import { Flex } from '@hope-ui/solid';
import { For } from 'solid-js';
import { Text } from '../../ui/components/Text';
import { StyledDivider } from './Divider';
import { Params } from '../../../../common/params';

const secondaryTextColor = 'var(--hope-colors-neutral10)';

const courses: Array<{
	course: string;
	subtitle: string;
	availableJobTypes: Params['jobType'][];
}> = [
	{
		course: 'Mastering React',
		subtitle: '(by Mosh Hamedani)',
		availableJobTypes: ['front-end', 'full-stack', 'react', 'softwareEngineer'],
	},
	{
		course: 'Node.js - The Complete Guide to Build RESTful APIs',
		subtitle: '(by Mosh Hamedani)',
		availableJobTypes: ['front-end', 'full-stack', 'react', 'softwareEngineer'],
	},
	{
		course: 'CSS - The Complete Guide',
		subtitle: '(by Maximilian Schwarzmüller)',
		availableJobTypes: ['front-end', 'react'],
	},
	{
		course: 'Vue - The Complete Guide (w/ Router, Vuex, Composition API)',
		subtitle: '(by Maximilian Schwarzmüller)',
		availableJobTypes: ['front-end'],
	},
	{
		course: 'Master C++ and OOP',
		subtitle: '(Learncpp.com)',
		availableJobTypes: ['full-stack', 'softwareEngineer'],
	},
	{
		course: 'Introduction to Game Development Specialization',
		subtitle: '(Coursera)',
		availableJobTypes: ['softwareEngineer'],
	},
];

export const SelfTaught = (props: { jobType: Params['jobType'] }) => (
	<Flex direction="column" mt="$8">
		<Text variant="title">Self-taught Courses</Text>
		<StyledDivider />
		<Flex direction="column">
			<For each={courses.filter((course) => course.availableJobTypes.includes(props.jobType))}>
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
