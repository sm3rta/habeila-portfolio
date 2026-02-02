import { Box, Button, Flex, FormControl, FormLabel, IconButton, Input, Text, Textarea } from '@hope-ui/solid';
import { IconTypes } from 'solid-icons';
import { BiLogosDiscordAlt } from 'solid-icons/bi';
import { FaBrandsLinkedinIn } from 'solid-icons/fa';
import { RiDeviceSmartphoneLine } from 'solid-icons/ri';
import { SiGithub, SiMaildotru } from 'solid-icons/si';
import { For, Show, createSignal } from 'solid-js';
import { darkMode } from '../../App';
import { emailAddress, telephoneNumberStylized } from '../../data/work';
import StyledDivider from '../../ui/components/Divider';
import { ICON_SIZE } from '../../ui/theme';
import Section from './Section';

export const EmailAndTelephone = () => (
	<Box d="flex" flexDirection="column" rowGap="$4" data-id="Contact-list-1-01ba39">
		<Button
			as="a"
			role="link"
			href={`mailto:${emailAddress}`}
			leftIcon={<SiMaildotru size={ICON_SIZE} />}
			variant="ghost"
			p="$1"
			h="$full"
			w="fit-content"
		>
			{emailAddress}
		</Button>
		<Button
			as="a"
			role="link"
			href={`tel:${telephoneNumberStylized}`}
			leftIcon={<RiDeviceSmartphoneLine size={ICON_SIZE} />}
			variant="ghost"
			p="$1"
			h="$full"
			w="fit-content"
		>
			{telephoneNumberStylized}
		</Button>
	</Box>
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

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData as Object as Record<string, string>).toString(),
			});
			setLoading('completed');
		} catch (error) {
			console.error('Form submission error:', error);
			setLoading(false);
			alert('Failed to send message. Please try again or email me directly.');
		}
	};

	return (
		<>
			<Show when={loading() !== 'completed'}>
				<Box
					as="form"
					onSubmit={handleSubmit}
					w="$full"
					data-netlify="true"
					name="contact"
					data-id="Contact-box-1-8c2ab2"
				>
					<input type="hidden" name="form-name" value="contact" />
					<Text fontSize="$xl" fontWeight="$semibold" mb="$4" data-id="Contact-text-1-14fa8b">
						Work with me!
					</Text>
					<FormControl mb="$4">
						<FormLabel for="name">Name</FormLabel>
						<Input
							id="name"
							name="name"
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
							name="email"
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
							name="message"
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
				<Box d="flex" alignItems="center" h="$full" data-id="Contact-box-2-1af1b6">
					<Text data-id="Contact-text-2-a7cbae">Message sent. Thank you for reaching out!</Text>
				</Box>
			</Show>
		</>
	);
};

export default function Contact() {
	return (
		<Section flexDirection="column" id="contact" w="$full" role="group" aria-label="Contact section" tabIndex={-1}>
			<Box
				d="flex"
				flexDirection={{ '@initial': 'column', '@lg': 'row' }}
				gap={{ '@initial': '$8', '@lg': '$16' }}
				data-id="Contact-box-3-cad580"
			>
				<Flex
					role="group"
					aria-label="Contact links"
					flex="1"
					direction="column"
					justifyContent="center"
					data-id="Contact-flex-1-a8b9f9"
				>
					<EmailAndTelephone />
					<Box d="flex" columnGap="$6" mt="$4" ps="$1" data-id="Contact-box-4-0d938f">
						<For each={socials}>
							{({ href, Icon }) => (
								<IconButton
									as="a"
									role="link"
									href={href}
									target="_blank"
									aria-label={href}
									icon={<Icon size={ICON_SIZE} />}
								/>
							)}
						</For>
					</Box>
				</Flex>

				<StyledDivider
					orientation={{ '@initial': 'horizontal', '@lg': 'vertical' }}
					backgroundColor={!darkMode() ? '$neutral10' : '$neutral7'}
					flex="0 1 1px"
					h="unset"
				/>

				<Box flex="1" data-id="Contact-box-5-5617ab">
					<ContactForm />
				</Box>
			</Box>
		</Section>
	);
}
