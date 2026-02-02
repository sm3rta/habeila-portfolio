import { Box } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { JSX } from 'solid-js/web/types/jsx';
import StyledDivider from '../../ui/components/Divider';

const side = 24;

export const Timeline = (props: { children: JSX.Element[]; showStepper?: boolean; ariaLabel?: string }) => (
	<Box
		d="flex"
		flexDirection="column"
		py={{
			'@initial': '$4',
			'@lg': '$0',
			'@2xl': '$24',
		}}
		px={{
			'@initial': '$8',
			'@md': '$16',
			'@lg': '$32',
			'@xl': '$48',
		}}
		role="list"
		data-id="Timeline-box-1-a9d250"
		aria-label="Experience timeline"
		id="main-content"
		tabIndex={-1}
	>
		<For each={props.children}>
			{(child, index) => (
				<Box
					role="listitem"
					d="flex"
					gap="$8"
					data-id="Timeline-box-2-aa267d"
					aria-label={`Timeline item ${index() + 1}`}
				>
					<Show when={props.showStepper}>
						<Box
							role="presentation"
							d="flex"
							flexDirection="column"
							w={side}
							alignItems="center"
							data-id="Timeline-box-3-c8fccb"
						>
							<Box h={side} w={side} borderRadius="50%" border="4px solid $accent10" />
							<Box flex={1} w="2px" bg="$accent10" />
						</Box>
					</Show>
					<Box d="flex" flexDirection="column" flex={1} data-id="Timeline-box-4-4df564">
						<Box data-id="Timeline-box-5-98aa52">{child}</Box>
						{index() !== props.children.length - 1 && <StyledDivider my="$3" />}
					</Box>
				</Box>
			)}
		</For>
	</Box>
);
