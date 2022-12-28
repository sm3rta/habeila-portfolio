import { Box, IconButton, List, ListItem, Text } from '@hope-ui/solid';
import { IconTypes } from 'solid-icons';
import { AiOutlineGithub } from 'solid-icons/ai';
import { BiLogosDiscordAlt } from 'solid-icons/bi';
import { FaBrandsLinkedinIn } from 'solid-icons/fa';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine } from 'solid-icons/ri';
import { For } from 'solid-js';
import { ICON_SIZE } from '../../ui/theme';
import Section from './Section';

const socials: Array<{
	Icon: IconTypes;
	href: string;
}> = [
	{
		Icon: AiOutlineGithub,
		href: 'https://github.com/sm3rta/',
	},
	{
		Icon: FaBrandsLinkedinIn,
		href: 'https://www.linkedin.com/in/ahmedhabeila/',
	},
	{
		Icon: BiLogosDiscordAlt,
		href: 'https://discordapp.com/users/286265603143237643',
	},
];
export default function Contact() {
	return (
		<Box background="rgb(0 0 0 / 40%)" id="contact">
			<Section display="flex" flexDirection="column" alignItems="center">
				<List display="flex" flexDirection="column" rowGap="$4">
					<ListItem display="flex" columnGap="$4" alignItems="center">
						<IconButton
							as={'a'}
							href={"mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!"}
							target="_blank"
							aria-label={'mail'}
							icon={<HiOutlineMail size={ICON_SIZE} />}
						/>
						<Text fontSize="$md">HabeilaAhmed@gmail.com</Text>
					</ListItem>
					<ListItem display="flex" columnGap="$4" alignItems="center">
						<IconButton
							as={'a'}
							href={'tel:+201015178686'}
							target="_blank"
							aria-label={'telephone'}
							icon={<RiDeviceSmartphoneLine size={ICON_SIZE} />}
						/>
						<Text fontSize="$md">+20 (101) 517-8686</Text>
					</ListItem>
				</List>
				<Box display="flex" columnGap="$4" mt="$8">
					<For each={socials}>
						{({ href, Icon }) => (
							<IconButton as={'a'} href={href} target="_blank" aria-label={href} icon={<Icon size={ICON_SIZE} />} />
						)}
					</For>
				</Box>
			</Section>
		</Box>
	);
}
