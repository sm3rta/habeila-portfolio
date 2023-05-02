import { Anchor, Flex, List, ListItem } from '@hope-ui/solid';
import { SiCoursera, SiMeta } from 'solid-icons/si';
import { For } from 'solid-js';
import { ICON_SIZE } from '.';
import { Text } from '../../ui/components/Text';
import { StyledDivider } from './Divider';

export const Certifications = () => (
	<Flex direction="column" mt="$8">
		<Text variant="title">Certifications</Text>
		<StyledDivider />

		<Anchor
			href="https://coursera.org/verify/professional-cert/GT8AZWL3T9L2"
			alignItems="center"
			display="inline-flex"
			w="fit-content"
		>
			<Text mr="$2">Meta Front-End Developer Specialization &ndash; April 2023</Text>
			<SiMeta size={ICON_SIZE} />
		</Anchor>

		<Flex direction="column" as={List} ml="$6">
			<For
				each={[
					// {
					// 	course: 'Introduction to Front-End Development',
					// 	courseraVerificationId: 'U5CTD9LAHD8N',
					// },
					{
						course: 'Programming with JavaScript',
						courseraVerificationId: 'Y4XFDVAKT4MA',
					},
					{
						course: 'Version Control',
						courseraVerificationId: 'U77UHDCAK3PZ',
					},
					// {
					// 	course: 'HTML and CSS in depth',
					// 	courseraVerificationId: 'NZUM4BH62B44',
					// },
					// {
					// 	course: 'React Basics',
					// 	courseraVerificationId: 'JFYAPUXKVUZ8',
					// },
					{
						course: 'Advanced React',
						courseraVerificationId: 'JT3VHUN8VNYG',
					},
					{
						course: 'Principles of UX/UI Design',
						courseraVerificationId: '8GVZAPDDXSPZ',
					},
					// {
					// 	course: 'Front-End Developer Capstone',
					// 	courseraVerificationId: 'UMZAJFANHAKW',
					// },
					// {
					// 	course: 'Coding Interview Preparation',
					// 	courseraVerificationId: 'DKY295WXHU95',
					// },
				]}
			>
				{({ course, courseraVerificationId }) => (
					<ListItem>
						<Anchor
							href={`https://coursera.org/verify/${courseraVerificationId}`}
							alignItems="center"
							display="inline-flex"
							w="fit-content"
						>
							<Text mr="$2">{course} by Meta</Text>
							<SiCoursera size={ICON_SIZE} />
						</Anchor>
					</ListItem>
				)}
			</For>
		</Flex>
	</Flex>
);
