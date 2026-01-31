import { Box } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { JSX } from 'solid-js/web/types/jsx';

const side = 24;

export const Timeline = (props: { children: JSX.Element[]; showStepper?: boolean }) => {
	return (
		<Box d="flex" flexDirection="column" gap="$8">
			<For each={props.children.filter((child) => (child as unknown as () => JSX.Element)())}>
				{(child) => (
					<Box d="flex" gap="$8">
						<Show when={props.showStepper}>
							<Box d="flex" flexDirection="column" w={side} alignItems="center">
								<Box h={side} w={side} borderRadius="50%" border="4px solid $accent10" />
								<Box flex={1} w="2px" bg="$accent10" />
							</Box>
						</Show>
						<Box d="flex" flexDirection="column" flex={1}>
							<Box>{child}</Box>
						</Box>
					</Box>
				)}
			</For>
		</Box>
	);
};
