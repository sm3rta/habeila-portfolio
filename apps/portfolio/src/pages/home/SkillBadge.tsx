import { Badge, BadgeProps, Box } from '@hope-ui/solid';
import { IconTypes } from 'solid-icons';
import { Accessor, splitProps } from 'solid-js';

export const SkillBadge = (
	_props: Omit<BadgeProps, 'opacity' | 'transform'> & {
		skill: {
			name: string;
			Icon: IconTypes | null;
		};
		opacity?: Accessor<number>;
		transform?: Accessor<string>;
	}
) => {
	const [props, badgeProps] = splitProps(_props, ['skill', 'opacity', 'transform']);

	return (
		<Badge
			{...badgeProps}
			h={22}
			d="flex"
			alignItems="center"
			opacity={props.opacity?.() ?? 1}
			transform={props.transform?.() ?? 'unset'}
		>
			{props.skill.Icon && (
				<Box mr="$2">
					<props.skill.Icon />
				</Box>
			)}
			{props.skill.name}
		</Badge>
	);
};
