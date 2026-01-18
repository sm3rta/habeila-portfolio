import { Anchor, Flex } from '@hope-ui/solid';
import { FaSolidLocationDot } from 'solid-icons/fa';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine, RiDocumentBookMarkFill } from 'solid-icons/ri';
import { For, Match, Show, Switch } from 'solid-js';
import { StyledFlexLink, pagePaddings } from '.';
import { emailAddress, locationAddress, telephoneNumber, telephoneNumberStylized, website } from '../../data/work';
import { Text } from '../../ui/components/Text';
import { ICON_SIZE } from '../../ui/theme';
import { socials } from '../home/Contact';
import { StyledDivider } from './Divider';
import { Params } from '../../../../common/params';

const PhoneNumber = () => (
	<StyledFlexLink href={`tel:+${telephoneNumber}`} textDecoration="none">
		<RiDeviceSmartphoneLine size={ICON_SIZE} />
		<Text ml="$2">{telephoneNumberStylized}</Text>
	</StyledFlexLink>
);
const Email = () => (
	<StyledFlexLink href={`mailto:${emailAddress}?subject=Let's%20work%20together!`} textDecoration="none">
		<HiOutlineMail size={ICON_SIZE} />
		<Text ml="$2">{emailAddress}</Text>
	</StyledFlexLink>
);
const Links = () => (
	<For
		each={[
			{ name: 'Portfolio', href: website, Icon: RiDocumentBookMarkFill },
			socials.find((s) => s.name === 'LinkedIn')!,
			socials.find((s) => s.name === 'Github')!,
		]}
	>
		{({ href, Icon, name }) => (
			<StyledFlexLink gap="$2" href={href} as={Anchor}>
				<Icon size={ICON_SIZE} />
				<Text>{name}</Text>
			</StyledFlexLink>
		)}
	</For>
);

const capitalizeFirstLetter = (str: string) => str[0].toUpperCase() + str.slice(1);

const jobTypeTitles: Record<Params['jobType'], string> = {
	'full-stack': 'full-stack developer',
	softwareEngineer: 'software engineer',
	'front-end': 'front-end developer',
	react: 'React.js developer',
	architect: 'Frontend Architect',
};

export const Header = (props: { adjective?: string; jobType?: Params['jobType']; includeLocation?: boolean }) => {
	return (
		<Flex
			direction="column"
			px={pagePaddings.x}
			pt={pagePaddings.y}
			pb={pagePaddings.y}
			// bgColor="var(--hope-colors-info12)"
			// color="white"
			gap="$4"
			alignItems="center"
		>
			<Text variant="h1">Ahmed Habeila</Text>
			<Show when={props.jobType}>
				<Text variant="title" textTransform="unset" fontWeight="normal">
					{props.adjective}{' '}
					{props.adjective ? jobTypeTitles[props.jobType!] : capitalizeFirstLetter(jobTypeTitles[props.jobType!])}
				</Text>
			</Show>
			<StyledDivider noMargin />

			<Switch>
				<Match when={props.includeLocation}>
					<Flex gap="$8">
						<Flex alignItems="center">
							<FaSolidLocationDot size={ICON_SIZE} />
							<Text ml="$2">{locationAddress}</Text>
						</Flex>
						<Email />
						<PhoneNumber />
					</Flex>
					<Flex gap="$8">
						<Links />
					</Flex>
				</Match>
				<Match when={!props.includeLocation}>
					<Flex gap="$8">
						<Email />
						<PhoneNumber />
						<Links />
					</Flex>
				</Match>
			</Switch>
		</Flex>
	);
};
