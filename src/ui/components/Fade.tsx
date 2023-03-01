import { Box } from '@hope-ui/solid';
import { Accessor, JSX, createEffect, createSignal, onMount } from 'solid-js';

const Fade = ({ children, ...rest }: { children: JSX.Element; in: boolean | Accessor<boolean> }) => {
	const [opacity, setOpacity] = createSignal(0);

	createEffect(() => {
		setTimeout(() => {
			console.log(opacity());
			setOpacity((typeof rest.in === 'boolean' ? rest.in : rest.in()) ? 1 : 0);
		}, 0);
	});

	return (
		<Box
			css={{
				opacity: opacity(),
				transition: 'opacity 1s ease-in-out',
			}}
		>
			{children}
		</Box>
	);
};

export default Fade;
