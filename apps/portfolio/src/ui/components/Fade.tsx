import { Box, PropsOf } from '@hope-ui/solid';
import { Accessor, JSX, createEffect, createSignal, splitProps } from 'solid-js';

const Fade = (_props: { children: JSX.Element; in: boolean | Accessor<boolean> } & PropsOf<typeof Box>) => {
	const [props, boxProps] = splitProps(_props, ['children', 'in']);
	const [opacity, setOpacity] = createSignal(0);

	createEffect(() => {
		setTimeout(() => {
			// console.log(opacity());
			setOpacity((typeof props.in === 'boolean' ? props.in : props.in()) ? 1 : 0);
		}, 0);
	});

	return (
		<Box
			css={{
				opacity: opacity(),
				transition: 'opacity 1s ease-in-out',
			}}
			data-id="Fade-box-1-d92c00"
			{...boxProps}
		>
			{props.children}
		</Box>
	);
};

export default Fade;
