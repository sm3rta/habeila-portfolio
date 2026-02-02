import { Box, useTheme } from '@hope-ui/solid';

const side = 80;

const Loader = () => {
	const colors = useTheme()().colors;
	return (
		<Box d="flex" justifyContent="center" alignItems="center" w="100%" minH="calc(100vh)" data-id="Loader-box-1-fc835e">
			<svg width={`${side}px`} height={`${side}px`} viewBox={`0 0 ${side} ${side}`}>
				<circle cx={side / 2} cy={side / 2} r="0" fill="none" stroke={colors.primary7.value} stroke-width="2">
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="3s"
						values={`0;${side / 2}`}
						keyTimes="0;1"
						keySplines="0 0.2 0.8 1"
						calcMode="spline"
						begin="0s"
					/>
					<animate
						attributeName="opacity"
						repeatCount="indefinite"
						dur="3s"
						values="1;0"
						keyTimes="0;1"
						keySplines="0.2 0 0.8 1"
						calcMode="spline"
						begin="0s"
					/>
				</circle>
				<circle cx={side / 2} cy={side / 2} r="0" fill="none" stroke={colors.accent6.value} stroke-width="2">
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="3s"
						values={`0;${side / 2}`}
						keyTimes="0;1"
						keySplines="0 0.2 0.8 1"
						calcMode="spline"
						begin="-1.5s"
					/>
					<animate
						attributeName="opacity"
						repeatCount="indefinite"
						dur="3s"
						values="1;0"
						keyTimes="0;1"
						keySplines="0.2 0 0.8 1"
						calcMode="spline"
						begin="-1.5s"
					/>
				</circle>
			</svg>
		</Box>
	);
};

export default Loader;
