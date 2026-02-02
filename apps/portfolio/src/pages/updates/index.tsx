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
	const { update } = props;
	const colors = useTheme()().colors;
	return (
		<Box
			background="$neutral1"
			borderWidth="1px"
			borderColor="$neutral6"
			borderRadius="$lg"
			zIndex={zIndexes.aboveRhombus}
		>
			<Box p="$6" position="relative">
				{update.image && (
					<Image
						src={update.image}
						alt={update.imageAlt || update.title}
						display={{ '@initial': 'none', '@md': 'block' }}
						css={{ float: 'right' }}
						boxShadow={`0 0 10px -6px ${colors.accent10.value}`}
						ml="$6"
						mb="$6"
						w="300px"
						h="auto"
						objectFit="contain"
						borderRadius="$md"
					/>
				)}

				<Box mb="$3" display="flex" justifyContent="space-between" gap="$2">
					<Badge fontSize="$xs" px="$2" py="$1">
						{capitalizeFirstLetter(update.type)}
					</Badge>
					<Text fontSize="$sm" color="$neutral11" flexShrink={0}>
						{formatDate(update.date)}
					</Text>
				</Box>

				<Box mb="$2">
					<Heading size="lg" mb="$1" color="$neutral12">
						{update.title}
					</Heading>
					{update.subtitle && (
						<Text fontSize="$sm" color="$accent11" fontWeight="$semibold" mb="$2">
							{update.subtitle}
						</Text>
					)}
				</Box>

				<Text color="$neutral11" lineHeight="$6" mb="$4">
					{update.description}
				</Text>

				{update.link && (
					<Button
						as="a"
						href={update.link}
						target="_blank"
						rel="noopener noreferrer"
						variant="subtle"
						colorScheme="accent"
						size="sm"
					>
						{update.linkText || 'Learn More'}
					</Button>
				)}

				{update.image && (
					<Image
						src={update.image}
						alt={update.imageAlt || update.title}
						display={{ '@initial': 'block', '@md': 'none' }}
						w="100%"
						h="auto"
						boxShadow={`0 0 10px -6px ${colors.accent10.value}`}
						objectFit="contain"
						borderRadius="$md"
						mt="$4"
					/>
				)}
			</Box>
		</Box>
	);
};

const Updates = () => {
	return (
		<Fade in={() => true}>
			<MetaProvider>
				<Title>Ahmed Habeila's Portfolio - Updates</Title>
			</MetaProvider>
			<Section>
				<Text
					mt={{
						'@xl': '$32',
					}}
					mb="$12"
					as="h1"
					fontSize="$2xl"
					color="$neutral12"
					maxW="800px"
					mx="auto"
				>
					News, achievements, and publications
				</Text>

				<Grid templateColumns="1fr" gap="$6" mx="auto">
					<For each={updates}>{(update) => <UpdateCard update={update} />}</For>
				</Grid>
			</Section>
		</Fade>
	);
};

export default Updates;
