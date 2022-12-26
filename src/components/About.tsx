import { Box, Container, List, ListItem, ListItemIcon, Typography } from '@suid/material';

export default function About() {
	return (
		<Container sx={{ pt: 10 }}>
			<Typography variant="h1" textAlign="center" mb={2}>
				Ahmed Habeila
			</Typography>
			<Typography textAlign="center" mb={2}>
				Front-end Web Developer
			</Typography>

			<Typography>
				I am a software developer based in Egypt, interested in web development, game development, Python scripting and
				all that includes programming. My work extends from system design, analysis to complete implementation. I'm
				currently working as a MERN stack developer focused on front-end, with flexibility to work on other stacks.
			</Typography>
		</Container>
	);
}
