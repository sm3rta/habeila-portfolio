import { Anchor, Flex, List, ListItem } from '@hope-ui/solid';
import { SiCoursera, SiDevdotto, SiMeta } from 'solid-icons/si';
import { For } from 'solid-js';
import { ICON_SIZE } from '.';
import { Text } from '../../ui/components/Text';
import { StyledDivider } from './Divider';
import { IoLogoWebComponent } from 'solid-icons/io';

export const Publications = () => (
	<Flex direction="column">
		<Text variant="title">Publications</Text>
		<StyledDivider />

		<Anchor
			href="https://dev.to/sm3rta/versioned-web-components-and-micro-front-ends-1m40"
			alignItems="center"
			display="inline-flex"
			w="fit-content"
		>
			<Text mr="$2">Versioned web components and micro front-ends &ndash; June 2025</Text>
			<SiDevdotto size={ICON_SIZE} />
		</Anchor>
	</Flex>
);
