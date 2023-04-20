import { For, Match, Switch } from 'solid-js';

export const TopSkills = (props: { skills: string[] }) => (
	<For each={props.skills}>
		{(skill, index) => (
			<Switch>
				<Match when={index() === props.skills.length - 1}>
					<>
						and <b>{skill}</b>
					</>
				</Match>
				<Match when={index() !== props.skills.length - 1}>
					<b>{skill}</b>,{' '}
				</Match>
			</Switch>
		)}
	</For>
);
