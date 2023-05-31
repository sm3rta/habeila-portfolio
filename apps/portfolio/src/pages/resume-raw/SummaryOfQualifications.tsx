import { Flex, ListItem } from '@hope-ui/solid';
import { For } from 'solid-js';
import { Text } from '../../ui/components/Text';
import { StyledDivider } from './Divider';
import { TopSkills } from './TopSkills';

export const SummaryOfQualifications = (props: { skills: string[] }) => (
	<Flex direction="column">
		<Text variant="title">Professional summary</Text>
		<StyledDivider />
		<Flex mt="$2" direction="column" as="ul">
			<For
				each={[
					<>5+ years of experience building elegant and performant user experiences</>,
					// helping companies create and maintain a better code base for reusability
					<>
						Strong background in <TopSkills skills={props.skills} /> with high adaptability to work with any stack
						{/* and web development fundamentals */}
					</>,
					'Collaborative and friendly, with experience in performing code reviews',
					'Excellent in communication, capable of effectively interacting with clients to establish and record their needs',
				]}
			>
				{(item) => (
					<ListItem ml="$6">
						<Text>{item}</Text>
					</ListItem>
				)}
			</For>
		</Flex>
	</Flex>
);
