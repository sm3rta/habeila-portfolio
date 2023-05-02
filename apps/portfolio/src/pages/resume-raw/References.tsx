import { Flex } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { Text } from '../../ui/components/Text';
import { StyledDivider } from './Divider';

export const References = () => (
	<Flex direction="column" mt="$8">
		<Text variant="title">References</Text>
		<StyledDivider />
		<Flex direction="column">
			<For
				each={[
					{
						name: 'Mostafa Gamal',
						phone: '(647) 395-0236',
						email: 'mosgamal@hayasolutions.com',
						role: 'Technical manager',
						company: 'Haya Solutions Inc.',
						description: 'Mostafa was my direct technical manager while working at Haya Solutions Inc.',
					},
				]}
			>
				{({ company, email, name, phone, role, description }) => (
					<Flex direction="column">
						<Text variant="subtitle">{name}</Text>
						<Text>{role}</Text>
						<Text>{company}</Text>
						<Show when={phone}>
							<Text>{phone}</Text>
						</Show>
						<Text>{email}</Text>
						<Show when={description}>
							<Text>{description}</Text>
						</Show>
					</Flex>
				)}
			</For>
		</Flex>
	</Flex>
);
