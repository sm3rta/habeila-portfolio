import { Badge, BadgeProps, Box } from '@hope-ui/solid';
import { IconTypes } from 'solid-icons';
import { Accessor } from 'solid-js';

export const SkillBadge = ({
	skill,
	opacity,
	transform,
	...badgeProps
}: Omit<BadgeProps, 'opacity' | 'transform'> & {
	skill: {
		name: string;
		Icon: IconTypes | null;
	};
	opacity?: Accessor<number>;
	transform?: Accessor<string>;
}) => {
	const { name, Icon } = skill;

	return (
		<Badge
			{...badgeProps}
			h={22}
			d="flex"
			alignItems="center"
			opacity={opacity?.() ?? 1}
			transform={transform?.() ?? 'unset'}
		>
			{Icon && (
				<Box mr="$2">
					<Icon />
				</Box>
			)}
			{name}
		</Badge>
	);
};
