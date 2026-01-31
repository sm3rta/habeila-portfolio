import { Box, Flex, FormControl, FormLabel, Input, Text, useTheme, Button } from '@hope-ui/solid';
import { For } from 'solid-js';

const p = 15;

const DesignSystemPage = () => {
	const colors = useTheme()().colors;
	return (
		<>
			<Box h="300vh"></Box>
			<Box position="fixed" p="100px">
				<Flex flexWrap="wrap" gap="$4" mb="$8">
					<For each={Object.entries(colors)}>
						{([colorName, colorShades]) => (
							<Box
								width="50px"
								height="50px"
								backgroundColor={colorShades.value}
								display="flex"
								alignItems="center"
								justifyContent="center"
								flexDirection="column"
								mr="$2"
							>
								<Text fontSize="$xs" color="#000" textAlign="center">
									{colorName}
								</Text>
								{/* <Text fontSize="$xs" color="#000" textAlign="center">
								{colorShades.value}
							</Text> */}
							</Box>
						)}
					</For>
				</Flex>
				<Button variant="solid">Solid</Button>
				<Button variant="outline">Outline</Button>
				<FormControl mb="$4">
					<FormLabel for="email">Email</FormLabel>
					<Input id="email" type="email" placeholder="your.email@example.com" value={''} required />
				</FormControl>
			</Box>
		</>
	);
};

export default DesignSystemPage;
