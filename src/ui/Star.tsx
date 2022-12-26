import { Box } from '@hope-ui/solid';
import { ComponentProps } from 'solid-js';
import { styled } from 'solid-styled-components';

const m = 5;
const clipPath = `polygon(0 50%, \
	${50 - m}% ${50 - m}%,\
	50% 0,\
	${50 + m}% ${50 - m}%,\
	100% 50%,\
	${50 + m}% ${50 + m}%,\
	50% 100%,\
	${50 - m}% ${50 + m}%)`;

export const Star = (props: ComponentProps<typeof Box>) => (
	<Box position="absolute" css={{ aspectRatio: 1, ...props.css }} zIndex={1} clipPath={clipPath} {...props} />
);
