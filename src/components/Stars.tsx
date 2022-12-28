import { For } from 'solid-js';
import { Star } from '../ui/Star';
import { randRangeInt } from '../utils';
import { Box } from '@hope-ui/solid';

export const Stars = () => {
	return (
		<Box>
			<For each={[...Array(randRangeInt(30, 100))]}>{() => <Star />}</For>
		</Box>
	);
};
