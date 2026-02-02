import { Anchor, Flex, List, ListItem } from '@hope-ui/solid';
import { SiCoursera, SiMeta } from 'solid-icons/si';
import { For } from 'solid-js';
import { ICON_SIZE } from '.';
import { Text } from '../../ui/components/Text';
import { ResumeDivider } from './Divider';

export const Certifications = () => (
	<Flex direction="column" data-id="Certifications-flex-1-11d3ea">
		<Text variant="title" data-id="Certifications-text-1-fbdc00">Certifications</Text>
		<ResumeDivider />

		<Anchor
			href="https://coursera.org/verify/professional-cert/GT8AZWL3T9L2"
			alignItems="center"
			display="inline-flex"
			w="fit-content"
		>
			<Text mr="$2" data-id="Certifications-text-2-794652">Meta Front-End Developer Specialization &ndash; April 2023</Text>
			<SiMeta size={ICON_SIZE} />
		</Anchor>

		<Flex direction="column" as={List} ml="$6" data-id="Certifications-flex-2-a6ea2e">
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
					<ListItem data-id="Certifications-listitem-1-769616">
						<Anchor
							href={`https://coursera.org/verify/${courseraVerificationId}`}
							alignItems="center"
							display="inline-flex"
							w="fit-content"
						>
							<Text mr="$2" data-id="Certifications-text-3-50f5e1">{course} by Meta</Text>
							<SiCoursera size={ICON_SIZE} />
						</Anchor>
					</ListItem>
				)}
			</For>
		</Flex>
	</Flex>
);
