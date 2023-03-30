const getRoleTitle = (role: 'front' | 'full' | 'se') => {
	switch (role) {
		case 'front':
			return 'Front-end Web Developer';
		case 'full':
			return 'Full-stack Web Developer';
		case 'se':
			return 'Software Engineer';
	}
};

export const getTitle = (
	// title: {
	role: 'front' | 'full' | 'se',
	senior: boolean
	// },
	// force?: 'full' | 'se'
) => {
	// const { role, senior } = title;
	const seniority = senior ? 'Senior ' : '';
	const roleTitle = getRoleTitle(role);
	return `${seniority}${roleTitle}`;
};