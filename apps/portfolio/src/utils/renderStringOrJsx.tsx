import { JSX, Match, Switch } from 'solid-js';

export const renderStringOrJsx = (stringOrFunction: string | undefined | (() => JSX.Element)) => {
	return (
		<Switch>
			<Match when={typeof stringOrFunction === 'function'}>{(stringOrFunction as () => JSX.Element)()}</Match>
			<Match when={typeof stringOrFunction === 'string'}>{stringOrFunction}</Match>
		</Switch>
	);
};
