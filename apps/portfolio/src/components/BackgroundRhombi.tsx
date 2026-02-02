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
			<Box pos="absolute" h="100%" w="100%" pointerEvents="none" data-id="BackgroundRhombi-box-1-d49cf0">
				<Box pos="relative" h="100%" w="100%" pointerEvents="none" data-id="BackgroundRhombi-box-2-2d3f26">
					<For each={[...Array(randRangeInt(20, 40))]}>{() => <BackgroundRhombus />}</For>
				</Box>
			</Box>
		</Show>
	);
};
