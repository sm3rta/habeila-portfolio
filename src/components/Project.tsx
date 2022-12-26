import { Box, Chip, List, ListItem, MenuItem, Typography } from '@suid/material';
import { ProjectWithWork } from '../data/work';

export default function Project({ project }: { project: ProjectWithWork }) {
	return (
		<Box p={10} height="100%" width="100%" display="flex" flexDirection="column" gap={1} justifyContent="center">
			<Typography>{project.company.title}</Typography>
			<Typography>
				{project.company.from} - {project.company.to}
			</Typography>
			<Typography>{project.name}</Typography>
			<Typography>{project.website}</Typography>
			<Typography>technologies</Typography>
			<Box display="flex" gap={1} flexWrap="wrap">
				{project.technologies?.map((tech) => {
					// console.log(`🚀 ~ {project.technologies?.map ~ tech`, tech);
					return <Chip key={tech} label={tech} />;
				})}
			</Box>
			<Typography>responsibilities</Typography>
			<Box display="flex" gap={1} flexWrap="wrap">
				{project.responsibilities?.map((resp) => (
					<Chip key={resp} label={resp} />
				))}
			</Box>
		</Box>
	);
}
