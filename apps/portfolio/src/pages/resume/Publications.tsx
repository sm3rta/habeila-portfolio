import { Anchor, Flex } from '@hope-ui/solid';
import { SiDevdotto } from 'solid-icons/si';
import { ICON_SIZE } from '.';
import { Text } from '../../ui/components/Text';
import { ResumeDivider } from './Divider';

export const Publications = () => (
	<Flex direction="column" data-id="Publications-flex-1-01f858">
		<Text variant="title" data-id="Publications-text-1-fcf4b6">Publications</Text>
		<ResumeDivider />

		<Anchor
			href="https://dev.to/sm3rta/versioned-web-components-and-micro-front-ends-1m40"
			alignItems="center"
			display="inline-flex"
			w="fit-content"
		>
			<Text mr="$2" data-id="Publications-text-2-e4579c">Versioned web components and micro front-ends &ndash; June 2025</Text>
			<SiDevdotto size={ICON_SIZE} />
		</Anchor>
	</Flex>
);
