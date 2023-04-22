import { For, Match, Show, Switch } from 'solid-js';

export const TopSkills = (props: { skills: string[] }) => (
	<For each={props.skills}>
		{(_skill, index) => {
			const skill = _skill.trim();
			return (
				<Switch>
					<Match when={index() === props.skills.length - 1}>
						<>
							and <b>{skill}</b>
						</>
					</Match>
					<Match when={index() !== props.skills.length - 1}>
						<b>{skill}</b>
						<Show when={props.skills.length > 2}>,</Show>{' '}
					</Match>
				</Switch>
			);
		}}
	</For>
);
