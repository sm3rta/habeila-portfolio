import { Box, Flex } from '@hope-ui/solid';
import { SiApache, SiCplusplus, SiGithub, SiLinux } from 'solid-icons/si';
import { For } from 'solid-js';
import { ICON_SIZE, StyledFlexLink } from '.';
import { Text } from '../../ui/components/Text';
import { SkillBadge } from '../home/SkillBadge';
import { StyledDivider } from './Divider';

export const Education = () => (
	<Flex direction="column">
		<Text variant="title">Education</Text>
		<StyledDivider />
		<Text>Bachelor's Degree of Computer Science and Automatic Control</Text>
		<Text>Tanta University &ndash; (2014 - 2019)</Text>
		<Box d="inline" alignItems="center">
			<Text as="span" variant="subtitle">
				Graduation Project:{' '}
			</Text>
			<StyledFlexLink href="https://github.com/darwishdd/cpp_webapi_framework" d="inline-flex">
				<Text mr="$2" d="contents" as="span">
					An Express-like C++ web application framework
				</Text>
				<SiGithub size={ICON_SIZE} style={{ display: 'inline', 'margin-left': '8px', 'vertical-align': 'baseline' }} />
			</StyledFlexLink>
		</Box>
		<Text>
			A simple-to-use web development framework with an easy syntax inspired by Express.js that lets developers build
			full-fledged back-end multi-threaded API servers with middleware support and connect it to the desired database in
			C++
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
);
