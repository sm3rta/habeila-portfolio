import { Box, Flex } from '@hope-ui/solid';
import { SiApache, SiCplusplus, SiGithub, SiLinux } from 'solid-icons/si';
import { For } from 'solid-js';
import { ICON_SIZE, StyledFlexLink } from '.';
import { Text } from '../../ui/components/Text';
import { SkillBadge } from '../home/SkillBadge';
import { ResumeDivider } from './Divider';

export const Education = () => (
	<Flex direction="column" data-id="Education-flex-1-b9663b">
		<Text variant="title" data-id="Education-text-1-7549e9">Education</Text>
		<ResumeDivider />
		<Text data-id="Education-text-2-9a7e89">Bachelor's Degree of Computer Science and Automatic Control &ndash; (2014 - 2019)</Text>
		{/* <Text data-id="Education-text-3-e6e22c">Tanta University &ndash; (2014 - 2019)</Text> */}
		<Box d="inline" alignItems="center" data-id="Education-box-1-4c11be">
			<Text as="span" variant="subtitle" data-id="Education-text-4-587a16">
				Graduation Project:{' '}
			</Text>
			<StyledFlexLink href="https://github.com/darwishdd/cpp_webapi_framework" d="inline-flex">
				<Text mr="$2" d="contents" as="span" data-id="Education-text-5-45ea51">
					An Express-like C++ web application framework
				</Text>
				<SiGithub size={ICON_SIZE} style={{ display: 'inline', 'margin-left': '8px', 'vertical-align': 'baseline' }} />
			</StyledFlexLink>
		</Box>
		<Text data-id="Education-text-6-e69923">
			A simple-to-use web development framework with an easy syntax inspired by Express.js that lets developers build
			full-fledged back-end multi-threaded API servers with middleware support and connect it to the desired database in
			C++
		</Text>
		<Flex gap="$2" wrap="wrap" mt="$2" data-id="Education-flex-2-1b1fc7">
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
);
