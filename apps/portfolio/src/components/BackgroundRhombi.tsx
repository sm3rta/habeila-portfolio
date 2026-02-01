import { Box } from '@hope-ui/solid';
import { For, Show, createSignal, onMount } from 'solid-js';
import { BackgroundRhombus } from '../ui/components/BackgroundRhombus';
import { randRangeInt } from '../utils';
import { mobileCheck } from '../ui/isMobileDevice';

const isMobileDevice = mobileCheck();

export const BackgroundRhombi = () => {
	const [show, setShow] = createSignal(false);

	onMount(() => {
		if (!isMobileDevice) {
			setTimeout(() => {
				setShow(true);
			}, 4000);
		}
	});

	return (
		<Show when={show()}>
			<Box pos="absolute" h="100%" w="100%" pointerEvents="none">
				<Box pos="relative" h="100%" w="100%" pointerEvents="none">
					<For each={[...Array(randRangeInt(40, 60))]}>{() => <BackgroundRhombus />}</For>
				</Box>
			</Box>
		</Show>
	);
};
