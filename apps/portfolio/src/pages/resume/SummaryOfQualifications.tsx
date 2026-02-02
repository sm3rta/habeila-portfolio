import { Flex, ListItem } from '@hope-ui/solid';
import { For } from 'solid-js';
import { Text } from '../../ui/components/Text';
import { ResumeDivider } from './Divider';
import { TopSkills } from './TopSkills';

export const SummaryOfQualifications = (props: { skills: string[] }) => (
	<Flex direction="column" data-id="SummaryOfQualifications-flex-1-cf061e">
		<Text variant="title" data-id="SummaryOfQualifications-text-1-03852f">Professional summary</Text>
		<ResumeDivider />
		<Flex mt="$2" direction="column" as="ul" data-id="SummaryOfQualifications-flex-2-599015">
			<For
				each={[
					<>7+ years of experience building elegant, performant and accessible user experiences</>,
					// helping companies create and maintain a better code base for reusability
					<>
						Excellent background in <TopSkills skills={props.skills} /> with high adaptability to work with any stack
						{/* and web development fundamentals */}
					</>,
					'Collaborative and friendly, with experience in leading teams',
					// 'Excellent in communication, capable of effectively interacting with clients to establish and record their needs',
				]}
			>
				{(item) => (
					<ListItem ml="$6" data-id="SummaryOfQualifications-listitem-1-1c656d">
						<Text data-id="SummaryOfQualifications-text-2-d9323f">{item}</Text>
					</ListItem>
				)}
			</For>
		</Flex>
	</Flex>
);
