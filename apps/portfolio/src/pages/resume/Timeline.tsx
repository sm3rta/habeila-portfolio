import { Box, Divider } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { JSX } from 'solid-js/web/types/jsx';
import { colors } from '../../ui/theme';

const side = 24;

export const Timeline = (props: { children: JSX.Element[]; showStepper?: boolean }) => (
	<Box d="flex" flexDirection="column" py={{
		"@initial": "$4",
		"@lg": "$0",
		"@2xl": "$24"
	}} px={{
		"@initial": "$8",
		"@md": "$16",
		"@lg": "$32",
		"@xl": "$48"
	}}>
		<For each={props.children}>
			{(child, index) => (
				<>
					<Box d="flex" gap="$8">
						<Show when={props.showStepper}>
							<Box d="flex" flexDirection="column" w={side} alignItems="center">
								<Box h={side} w={side} borderRadius="50%" border={`4px solid ${colors.secondary3}`} />
								<Box flex={1} w="2px" bg={colors.secondary2} />
							</Box>
						</Show>
						<Box d="flex" flexDirection="column" flex={1}>
							<Box>{child}</Box>
							{index() !== props.children.length - 1 && <Divider my="$3" />}
						</Box>
					</Box>
				</>
			)}
		</For>
	</Box>
);
