import { For, onMount, createSignal, Show } from 'solid-js';
import { Star } from '../ui/Star';
import { randRangeInt } from '../utils';
import { Box } from '@hope-ui/solid';

export const Stars = () => {
	const [show, setShow] = createSignal(false);

	onMount(() => {
		setTimeout(() => {
			setShow(true);
		}, 5000);
	});

	return (
		<Show when={show()}>
			<Box pos="absolute" h="100%" w="100%">
				<Box pos="relative" h="100%" w="100%">
					<For each={[...Array(randRangeInt(20, 60))]}>{() => <Star />}</For>
				</Box>
			</Box>
		</Show>
	);
};
