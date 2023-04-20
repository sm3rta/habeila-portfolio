export const createDesktopNotification = async ({
	status,
	message,
	title,
}: {
	title: string;
	status: 'success' | 'fail';
	message: string;
}) => {
	if (!window.Notification) {
		console.log('Browser does not support notifications.');
		return;
	}

	const permission = await Notification.requestPermission();

	if (permission !== 'granted') {
		console.log('User blocked notifications.');
		return;
	}

	new Notification(title, {
		body: message,
		icon: status === 'success' ? '/check.png' : '/cross.png',
	});
};
