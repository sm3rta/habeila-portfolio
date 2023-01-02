import { Box } from '@hope-ui/solid';
import { JSX, createSignal, onMount } from 'solid-js';

const Fade = ({ children }: { children: JSX.Element }) => {
	const [opacity, setOpacity] = createSignal(0);

	onMount(() => {
		setTimeout(() => {
			setOpacity(1);
		}, 0);
	});

	return <Box css={{ opacity: opacity(), transition: 'opacity 0.5s ease-in-out' }}>{children}</Box>;
};

export default Fade;
