import AlternateEmailOutlined from '@suid/icons-material/AlternateEmailOutlined';
import PhoneAndroidSharp from '@suid/icons-material/PhoneAndroidSharp';
import { List, ListItem, ListItemIcon, Typography } from '@suid/material';

export const Contact = () => {
	return (
		<List>
			<ListItem>
				<ListItemIcon>
					<AlternateEmailOutlined />
				</ListItemIcon>
				<Typography>HabeilaAhmed@gmail.com</Typography>
			</ListItem>
			<ListItem>
				<ListItemIcon>
					<PhoneAndroidSharp />
				</ListItemIcon>
				<Typography>+20 (101) 517-8686</Typography>
			</ListItem>
		</List>
	);
};
