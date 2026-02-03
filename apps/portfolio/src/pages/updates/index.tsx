import { Badge, Box, Button, Grid, Heading, Image, Text, useTheme } from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import { For } from 'solid-js';
import { Update, updates } from '../../data/updates';
import Fade from '../../ui/components/Fade';
import { zIndexes } from '../../ui/theme';
import { capitalizeFirstLetter } from '../../utils';
import Section from '../home/Section';

const formatDate = (date: Date) => {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
};

const UpdateCard = (props: { update: Update }) => {
	const colors = useTheme()().colors;
	return (
		<Box
			role="listitem"
			background="$neutral2"
			borderWidth="1px"
			borderColor="$neutral6"
			borderRadius="$lg"
			zIndex={zIndexes.aboveRhombus}
			data-id="index-box-1-14fc2a"
		>
			<Box p="$6" position="relative" data-id="index-box-2-a2ca2e">
				{props.update.image && (
					<Image
						src={props.update.image}
						alt={props.update.imageAlt || props.update.title}
						display={{ '@initial': 'none', '@md': 'block' }}
						css={{ float: 'right' }}
						boxShadow={`0 0 10px -6px ${colors.accent10.value}`}
						ml="$6"
						mb="$6"
						w="300px"
						h="auto"
						objectFit="contain"
						borderRadius="$md"
						width="300px"
					/>
				)}

				<Box mb="$3" display="flex" justifyContent="space-between" gap="$2" data-id="index-box-3-73baa3">
					<Badge fontSize="$xs" px="$2" py="$1">
						{capitalizeFirstLetter(props.update.type)}
					</Badge>
					<Text fontSize="$sm" color="$neutral11" flexShrink={0} data-id="index-text-1-b9eaa2">
						{formatDate(props.update.date)}
					</Text>
				</Box>

				<Box mb="$2" data-id="index-box-4-f17be6">
					<Heading size="lg" mb="$1" color="$neutral12" data-id="index-heading-1-641b37">
						{props.update.title}
					</Heading>
					{props.update.subtitle && (
						<Text fontSize="$sm" color="$accent11" fontWeight="$semibold" mb="$2" data-id="index-text-2-ef0445">
							{props.update.subtitle}
						</Text>
					)}
				</Box>

				<Text color="$neutral12" lineHeight="$6" mb="$4" data-id="index-text-3-7ca61a">
					{props.update.description}
				</Text>

				{props.update.link && (
					<Button
						as="a"
						role="link"
						href={props.update.link}
						target="_blank"
						rel="noopener noreferrer"
						variant="subtle"
						colorScheme="accent"
						size="sm"
					>
						{props.update.linkText || 'Learn More'}
					</Button>
				)}

				{props.update.image && (
					<Image
						src={props.update.image}
						alt={props.update.imageAlt || props.update.title}
						display={{ '@initial': 'block', '@md': 'none' }}
						w="100%"
						h="auto"
						boxShadow={`0 0 10px -6px ${colors.accent10.value}`}
						objectFit="contain"
						borderRadius="$md"
						mt="$4"
						width="100%"
					/>
				)}
			</Box>
		</Box>
	);
};

const Updates = () => (
	<Fade in={() => true}>
		<MetaProvider>
			<Title>Ahmed Habeila's Portfolio - Updates</Title>
		</MetaProvider>
		<Section>
			<Text
				tabIndex={-1}
				mt={{
					'@xl': '$32',
				}}
				mb="$12"
				as="h1"
				fontSize="$2xl"
				color="$neutral12"
				maxW="800px"
				mx="auto"
				data-id="index-text-4-7073d3"
				id="main-content"
			>
				News, achievements, and publications
			</Text>

			<Grid templateColumns="1fr" gap="$6" mx="auto" data-id="index-grid-1-e2d7df" role="list">
				<For each={updates}>{(update) => <UpdateCard update={update} />}</For>
			</Grid>
		</Section>
	</Fade>
);

export default Updates;
