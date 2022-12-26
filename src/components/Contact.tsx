import { List, ListIcon, ListItem, Text } from '@hope-ui/solid';

export const Contact = () => {
	return (
		<List>
			<ListItem>
				<ListIcon>{/* <AlternateEmailOutlined /> */}</ListIcon>
				<Text>HabeilaAhmed@gmail.com</Text>
			</ListItem>
			<ListItem>
				<ListIcon>{/* <PhoneAndroidSharp /> */}</ListIcon>
				<Text>+20 (101) 517-8686</Text>
			</ListItem>
		</List>
	);
};
