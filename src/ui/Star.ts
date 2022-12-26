import { Box } from "@suid/material";
import { styled } from "solid-styled-components";

const m = 5;
const clipPath = `polygon(0 50%, \
	${50 - m}% ${50 - m}%,\
	50% 0,\
	${50 + m}% ${50 - m}%,\
	100% 50%,\
	${50 + m}% ${50 + m}%,\
	50% 100%,\
	${50 - m}% ${50 + m}%)`;

export const Star = styled(Box)({
  position: "absolute",
  aspectRatio: `1`,
  zIndex: 1,
  clipPath,
});
