import { Box, Container, ContainerProps } from '@hope-ui/solid';
import { Show, splitProps } from 'solid-js';
import { BottomSectionDivider, UpperSectionDivider } from './SectionDivider';

const Section = (_props: ContainerProps & { upperSectionDivider?: boolean; bottomSectionDivider?: boolean }) => {
	const [dividers, props] = splitProps(_props, ['bottomSectionDivider', 'upperSectionDivider']);
	return (
		<Box position="relative" as="section" data-id="Section-box-1-de6f13">
			<Container
				minH="calc(100vh)"
				d="flex"
				placeContent="center"
				alignContent="center"
				flexDirection="column"
				w="fit-content"
				p={{
					'@initial': '200px $6',
					'@md': '200px $12',
					'@lg': '200px $32',
					'@xl': '60px $32',
				}}
				{...props}
			/>
			<Show when={dividers.upperSectionDivider}>
				<UpperSectionDivider />
			</Show>
			<Show when={dividers.bottomSectionDivider}>
				<BottomSectionDivider />
			</Show>
		</Box>
	);
};
export default Section;
