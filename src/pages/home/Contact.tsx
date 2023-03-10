import { Box, IconButton, List, ListItem, Text } from '@hope-ui/solid';
import { IconTypes } from 'solid-icons';
import { AiOutlineGithub } from 'solid-icons/ai';
import { BiLogosDiscordAlt } from 'solid-icons/bi';
import { FaBrandsLinkedinIn } from 'solid-icons/fa';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine } from 'solid-icons/ri';
import { For } from 'solid-js';
import { telephoneNumber, telephoneNumberStylized } from '../../data/work';
import { ICON_SIZE } from '../../ui/theme';
import Section from './Section';

export const EmailAndTelephone = () => (
	<List d="flex" flexDirection="column" rowGap="$4">
		<ListItem d="flex" columnGap="$4" alignItems="center">
			<IconButton
				as="a"
				href={"mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!"}
				target="_blank"
				aria-label="mail"
				icon={<HiOutlineMail size={ICON_SIZE} />}
			/>
			<Text fontSize="$md">HabeilaAhmed@gmail.com</Text>
		</ListItem>
		<ListItem d="flex" columnGap="$4" alignItems="center">
			<IconButton
				as="a"
				href={`tel:+${telephoneNumber}`}
				target="_blank"
				aria-label="telephone"
				icon={<RiDeviceSmartphoneLine size={ICON_SIZE} />}
			/>
			<Text fontSize="$md">{telephoneNumberStylized}</Text>
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
		Icon: AiOutlineGithub,
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
