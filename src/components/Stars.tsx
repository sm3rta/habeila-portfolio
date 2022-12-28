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
			<Box>
				<For each={[...Array(randRangeInt(30, 100))]}>{() => <Star />}</For>
			</Box>
		</Show>
	);
};
