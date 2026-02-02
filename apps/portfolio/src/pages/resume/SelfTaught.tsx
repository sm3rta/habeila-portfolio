import { Flex } from '@hope-ui/solid';
import { For } from 'solid-js';
import { Text } from '../../ui/components/Text';
import { ResumeDivider } from './Divider';
import { Params } from '../../../../common/params';

const accentTextColor = 'var(--hope-colors-neutral10)';

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
	<Flex direction="column" mt="$8" data-id="SelfTaught-flex-1-cd336c">
		<Text variant="title" data-id="SelfTaught-text-1-694cef">
			Self-taught Courses
		</Text>
		<ResumeDivider />
		<Flex direction="column" role="list" data-id="SelfTaught-flex-2-4d8609">
			<For each={courses.filter((course) => course.availableJobTypes.includes(props.jobType))}>
				{({ course, subtitle }) => (
					<Flex role="listitem" data-id="SelfTaught-flex-3-b58000">
						<Text d="contents" data-id="SelfTaught-text-2-83f26e">
							{course}
						</Text>
						<Text d="contents" color={accentTextColor} data-id="SelfTaught-text-3-f7e434">
							{' '}
							{subtitle}
						</Text>
					</Flex>
				)}
			</For>
		</Flex>
	</Flex>
);
