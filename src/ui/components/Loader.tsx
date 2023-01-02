import { Box } from '@hope-ui/solid';
import { HEADER_HEIGHT } from '../theme';

const side = 80;

const Loader = () => {
	return (
		<Box d="flex" justifyContent="center" alignItems="center" w="100%" minH={`calc(100vh - ${HEADER_HEIGHT}px)`}>
			<svg width={`${side}px`} height={`${side}px`} viewBox={`0 0 ${side} ${side}`}>
				<circle cx={side / 2} cy={side / 2} r="0" fill="none" stroke="#407385" stroke-width="2">
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
				<circle cx={side / 2} cy={side / 2} r="0" fill="none" stroke="#f5eaea" stroke-width="2">
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
