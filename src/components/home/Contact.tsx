import { Box, List, ListIcon, ListItem, Text } from '@hope-ui/solid';
import { HiOutlineMail } from 'solid-icons/hi';
import { RiDeviceSmartphoneLine } from 'solid-icons/ri';

const Contact = () => {
	return (
		<Box id="contact">
			<List>
				<ListItem>
					<ListIcon>
						<HiOutlineMail />
					</ListIcon>
					<Text>HabeilaAhmed@gmail.com</Text>
				</ListItem>
				<ListItem>
					<ListIcon>
						<RiDeviceSmartphoneLine />
					</ListIcon>
					<Text>+20 (101) 517-8686</Text>
				</ListItem>
			</List>
		</Box>
	);
};

export default Contact;
