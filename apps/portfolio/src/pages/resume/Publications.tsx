import { Anchor, Flex } from '@hope-ui/solid';
import { SiDevdotto } from 'solid-icons/si';
import { ICON_SIZE } from '.';
import { Text } from '../../ui/components/Text';
import { StyledDivider } from './Divider';

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
