import { Box, Button, FormControl, FormLabel, Grid, IconButton, Input, Text, useTheme } from '@hope-ui/solid';
import { FaSolidChevronLeft } from 'solid-icons/fa';
import { For } from 'solid-js';

const DesignSystemPage = () => {
	const colors = useTheme()().colors;
	return (
		<>
			<Box h="300vh" />
			<Box position="fixed" p="100px" data-id="index-box-1-7dff69">
				<Grid gap="$4" mb="$8" templateColumns="repeat(12, 1fr)" data-id="index-grid-1-ffe634">
					<For
						each={Object.entries(colors).filter(([colorName]) =>
							['primary', 'accent', 'neutral'].some((prefix) => colorName.startsWith(prefix))
						)}
					>
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
								data-id="index-box-2-56ae44"
							>
								<Text fontSize="$xs" color="#000" textAlign="center" data-id="index-text-1-b274b1">
									{colorName}
								</Text>
								{/* <Text fontSize="$xs" color="#000" textAlign="center" data-id="index-text-2-521923">
								{colorShades.value}
							</Text> */}
							</Box>
						)}
					</For>
				</Grid>
				<Button variant="solid">Solid</Button>
				<Button variant="outline">Outline</Button>
				<IconButton icon={<FaSolidChevronLeft />} aria-label="Previous" disabled />
				<IconButton icon={<FaSolidChevronLeft />} aria-label="Previous" />
				<FormControl mb="$4">
					<FormLabel for="email">Email</FormLabel>
					<Input id="email" type="email" placeholder="your.email@example.com" value={''} required />
				</FormControl>
			</Box>
		</>
	);
};

export default DesignSystemPage;
