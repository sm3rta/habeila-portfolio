import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	List,
	ListItem,
	Text,
	Textarea,
} from '@hope-ui/solid';
import { IconTypes } from 'solid-icons';
import { BiLogosDiscordAlt } from 'solid-icons/bi';
import { FaBrandsLinkedinIn } from 'solid-icons/fa';
import { RiDeviceSmartphoneLine } from 'solid-icons/ri';
import { SiGithub, SiMaildotru } from 'solid-icons/si';
import { For, Show, createSignal } from 'solid-js';
import { darkMode } from '../../App';
import { emailAddress, telephoneNumberStylized } from '../../data/work';
import { ICON_SIZE } from '../../ui/theme';
import Section from './Section';

export const EmailAndTelephone = () => (
	<List d="flex" flexDirection="column" rowGap="$4">
		<ListItem d="flex" alignItems="center">
			<Button
				as="a"
				href={`mailto:${emailAddress}`}
				leftIcon={<SiMaildotru size={ICON_SIZE} />}
				variant="ghost"
				p="$1"
				h="$full"
			>
				{emailAddress}
			</Button>
		</ListItem>
		<ListItem d="flex" alignItems="center">
			<Button
				as="a"
				href={`tel:${telephoneNumberStylized}`}
				leftIcon={<RiDeviceSmartphoneLine size={ICON_SIZE} />}
				variant="ghost"
				p="$1"
				h="$full"
			>
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

const ContactForm = () => {
	const [name, setName] = createSignal('');
	const [email, setEmail] = createSignal('');
	const [message, setMessage] = createSignal('');
	const [loading, setLoading] = createSignal<false | true | 'completed'>(false);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setLoading(true);

		const req = new XMLHttpRequest();

		req.onreadystatechange = () => {
			if (req.readyState == XMLHttpRequest.DONE) {
				setLoading('completed');
			}
		};

		req.open('POST', 'https://api.jsonbin.io/v3/b/', true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.setRequestHeader('X-Bin-Name', `Message from ${name()}`);
		req.setRequestHeader('X-Collection-Id', '697cb27ed0ea881f4093108d');
		req.setRequestHeader('X-Access-Key', import.meta.env.VITE_JSONBIN_API_KEY);
		req.send(
			JSON.stringify({
				name: name(),
				email: email(),
				message: message(),
				date: new Date().toISOString(),
			})
		);
	};

	return (
		<>
			<Show when={loading() !== 'completed'}>
				<Box as="form" onSubmit={handleSubmit} w="$full">
					<Text fontSize="$xl" fontWeight="$semibold" mb="$4">
						Work with me!
					</Text>
					<FormControl mb="$4">
						<FormLabel for="name">Name</FormLabel>
						<Input
							id="name"
							type="text"
							placeholder="Your name"
							value={name()}
							onInput={(e) => setName(e.currentTarget.value)}
							required
						/>
					</FormControl>
					<FormControl mb="$4">
						<FormLabel for="email">Email</FormLabel>
						<Input
							id="email"
							type="email"
							placeholder="your.email@example.com"
							value={email()}
							onInput={(e) => setEmail(e.currentTarget.value)}
							required
						/>
					</FormControl>
					<FormControl mb="$4">
						<FormLabel for="message">Message</FormLabel>
						<Textarea
							id="message"
							placeholder="Your message..."
							value={message()}
							onInput={(e) => setMessage(e.currentTarget.value)}
							required
							minH="$32"
							resize="block"
						/>
					</FormControl>
					<Button type="submit" variant={'outline'} loading={loading() === true} loadingText="Sending message">
						Send Message
					</Button>
				</Box>
			</Show>
			<Show when={loading() === 'completed'}>
				<Box d="flex" alignItems="center" h="$full">
					<Text>Message sent. Thank you for reaching out!</Text>
				</Box>
			</Show>
		</>
	);
};

export default function Contact() {
	return (
		<Section flexDirection="column" id="contact" w="$full">
			<Box d="flex" flexDirection={{ '@initial': 'column', '@lg': 'row' }} gap={{ '@initial': '$8', '@lg': '$16' }}>
				<Flex flex="1" direction="column" justifyContent="center">
					<EmailAndTelephone />
					<Box d="flex" columnGap="$6" mt="$4" ps="$1">
						<For each={socials}>
							{({ href, Icon }) => (
								<IconButton as="a" href={href} target="_blank" aria-label={href} icon={<Icon size={ICON_SIZE} />} />
							)}
						</For>
					</Box>
				</Flex>

				<Divider
					orientation={{ '@initial': 'horizontal', '@lg': 'vertical' }}
					backgroundColor={!darkMode() ? '$neutral10' : '$neutral7'}
					flex="0 1 1px"
					h="unset"
				/>

				<Box flex="1">
					<ContactForm />
				</Box>
			</Box>
		</Section>
	);
}
