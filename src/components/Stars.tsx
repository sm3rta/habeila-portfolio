import { For } from 'solid-js';
import { Star } from '../ui/Star';
import { randRangeInt } from '../utils';

export const Stars = () => {
	return <For each={[...Array(randRangeInt(30, 100))]}>{() => <Star />}</For>;
};
