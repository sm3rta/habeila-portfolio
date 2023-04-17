import { Anchor, Box, Flex, Grid, ListItem } from '@hope-ui/solid';
import { FaSolidLocationDot } from 'solid-icons/fa';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine, RiDocumentBookMarkFill } from 'solid-icons/ri';
import { For, Show } from 'solid-js';
import { ICON_SIZE, Params, StyledDivider, StyledFlexLink, pagePaddings } from '.';
import { telephoneNumber, telephoneNumberStylized, website, work } from '../../data/work';
import { Text } from '../../ui/Text';
import { socials } from '../home/Contact';
import { CompanyProjects } from './CompanyProjects';
import { Timeline } from './Timeline';

const Page1 = (props: Omit<Params, 'senior'> & { senior: boolean }) => {
	const skills = () => [props.skill1, props.skill2, props.skill3].filter(Boolean);
	const forceRole = () =>
		props.jobType === 'full-stack' ? 'full' : props.jobType === 'softwareEngineer' ? 'se' : undefined;
	const forceNonSenior = () => (props.senior ? undefined : true);

	return (
		<>
			<Flex
				direction="column"
				px={pagePaddings.x}
				pt={pagePaddings.y}
				pb={pagePaddings.y}
				bgColor="var(--hope-colors-info12)"
				color="white"
				gap="$4"
			>
				<Text variant="h1" as="span" lineHeight="normal">
					Ahmed Habeila
				</Text>

				<Flex gap="$8">
					<Flex alignItems="center">
						<FaSolidLocationDot size={ICON_SIZE} />
						<Text ml="$2">North York, ON, M3A 2E2</Text>
					</Flex>

					<StyledFlexLink href={`tel:+${telephoneNumber}`} textDecoration="none">
						<RiDeviceSmartphoneLine size={ICON_SIZE} />
						<Text ml="$2">{telephoneNumberStylized}</Text>
					</StyledFlexLink>

					<StyledFlexLink href="mailto:HabeilaAhmed@gmail.com?subject=Let's%20work%20together!" textDecoration="none">
						<HiOutlineMail size={ICON_SIZE} />
						<Text ml="$2">HabeilaAhmed@gmail.com</Text>
					</StyledFlexLink>
				</Flex>

				<Flex gap="$8">
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
				</Flex>
			</Flex>
			<Box as="main" px={pagePaddings.x} pt="$8" pb={pagePaddings.y}>
				<Show when={props.skill1}>
					<Flex direction="column">
						<Text variant="title">Summary of Qualifications</Text>
						<StyledDivider />
						<Flex mt="$2" direction="column" as="ul">
							<For
								each={[
									<>
										5 years of professional experience as a{' '}
										<b>
											{props.jobType === 'full-stack'
												? 'full-stack developer'
												: props.jobType === 'softwareEngineer'
												? 'software engineer'
												: 'front-end developer'}
										</b>
									</>,
									<>
										Strong background in{' '}
										{
											<For each={skills()}>
												{(skill) => (
													<>
														<b>{skill}</b>,{' '}
													</>
												)}
											</For>
										}{' '}
										and web development fundamentals
									</>,
									'Demonstrated ability to lead other developers, performing code reviews and enforcing certain patterns',
									'Professional communication skills, including the ability to communicate with clients to develop and document requirements',
									'High flexibility to work with any stack',
								]}
							>
								{(item) => (
									<ListItem ml="$6">
										<Text>{item}</Text>
									</ListItem>
								)}
							</For>
						</Flex>
					</Flex>
				</Show>

				<Grid mt="$8">
					<Text variant="title">Work Experience</Text>
					<StyledDivider />
					<Timeline
						children={work.map((company) => (
							<CompanyProjects forceRole={forceRole} company={company} forceNonSenior={forceNonSenior} />
						))}
					/>
				</Grid>
			</Box>
		</>
	);
};

export default Page1;
