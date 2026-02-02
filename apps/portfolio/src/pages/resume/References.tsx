import { Flex } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { Text } from '../../ui/components/Text';
import { ResumeDivider } from './Divider';

export const References = () => (
	<Flex direction="column" mt="$8" data-id="References-flex-1-8739a5">
		<Text variant="title" data-id="References-text-1-e2d154">References</Text>
		<ResumeDivider />
		<Flex direction="column" data-id="References-flex-2-5f97fc">
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
					<Flex direction="column" data-id="References-flex-3-ab4464">
						<Text variant="subtitle" data-id="References-text-2-ce9097">{name}</Text>
						<Text data-id="References-text-3-1cdb3e">{role}</Text>
						<Text data-id="References-text-4-9c635c">{company}</Text>
						<Show when={phone}>
							<Text data-id="References-text-5-0702df">{phone}</Text>
						</Show>
						<Text data-id="References-text-6-96ab7c">{email}</Text>
						<Show when={description}>
							<Text data-id="References-text-7-cd7e72">{description}</Text>
						</Show>
					</Flex>
				)}
			</For>
		</Flex>
	</Flex>
);
