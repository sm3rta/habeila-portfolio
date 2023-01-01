import { Box } from '@hope-ui/solid';
import { For } from 'solid-js';
import { JSX } from 'solid-js/web/types/jsx';
import { colors } from '../../ui/theme';

const side = 24;

export const Timeline = ({ children }: { children: Array<JSX.Element> }) => {
	return (
		<Box d="flex" flexDirection="column" p="$8">
			<For each={children}>
				{(child, index) => (
					<Box d="flex" gap="$8">
						<Box d="flex" flexDirection="column" w={side} alignItems="center">
							<Box h={side} w={side} borderRadius="50%" border={`4px solid ${colors.secondary3}`}></Box>
							<Box flex={1} w="2px" bg={colors.secondary2}></Box>
						</Box>
						<Box pb={index() !== children.length - 1 ? '$4' : 0}>{child}</Box>
					</Box>
				)}
			</For>
		</Box>
	);
};
