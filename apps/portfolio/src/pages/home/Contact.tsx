import { Box, Button, IconButton, List, ListItem } from '@hope-ui/solid';
import { IconTypes } from 'solid-icons';
import { BiLogosDiscordAlt } from 'solid-icons/bi';
import { FaBrandsLinkedinIn } from 'solid-icons/fa';
import { RiDeviceSmartphoneLine } from 'solid-icons/ri';
import { SiGithub, SiMaildotru } from 'solid-icons/si';
import { For } from 'solid-js';
import { emailAddress, telephoneNumberStylized } from '../../data/work';
import { ICON_SIZE } from '../../ui/theme';
import Section from './Section';

export const EmailAndTelephone = () => (
	<List d="flex" flexDirection="column" rowGap="$4">
		<ListItem d="flex" columnGap="$4" alignItems="center">
			<Button px="$1" variant="ghost" leftIcon={<SiMaildotru size={ICON_SIZE} />}>
				{emailAddress}
			</Button>
		</ListItem>
		<ListItem  d="flex" columnGap="$4" alignItems="center">
			<Button px="$1" variant="ghost" leftIcon={<RiDeviceSmartphoneLine size={ICON_SIZE} />}>
				{telephoneNumberStylized}
			</Button>
		</ListItem>
	</List>
);

export const socials: Array<{
	Icon: IconTypes;
	href: string;
	name?: string;
}> = [
	{
		Icon: FaBrandsLinkedinIn,
		href: 'https://www.linkedin.com/in/ahmedhabeila/',
		name: 'LinkedIn',
	},
	{
		Icon: SiGithub,
		href: 'https://github.com/sm3rta/',
		name: 'Github',
	},
	{
		Icon: BiLogosDiscordAlt,
		href: 'https://discordapp.com/users/286265603143237643',
	},
	// {
	// 	Icon: BiLogosFacebook,
	// 	href: 'https://www.facebook.com/sm3rta',
	// },
];
export default function Contact() {
	return (
		<Section flexDirection="column" id="contact">
			<EmailAndTelephone />
			<Box d="flex" columnGap="$6" mt="$8">
				<For each={socials}>
					{({ href, Icon }) => (
						<IconButton as="a" href={href} target="_blank" aria-label={href} icon={<Icon size={ICON_SIZE} />} />
					)}
				</For>
			</Box>
		</Section>
	);
}
