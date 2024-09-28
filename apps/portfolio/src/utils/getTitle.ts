const getRoleTitle = (role: 'front' | 'full' | 'se' | 'architect') => {
	switch (role) {
		case 'front':
			return 'Front-end Developer';
		case 'full':
			return 'Full-stack Developer';
		case 'se':
			return 'Software Engineer';
		case 'architect':
			return 'Front-end Architect';
	}
};

export const getTitle = (
	// title: {
	role: 'front' | 'full' | 'se' | 'architect',
	senior: boolean
	// },
	// force?: 'full' | 'se'
) => {
	// const { role, senior } = title;
	const seniority = senior && role !== 'architect' ? 'Senior ' : '';
	const roleTitle = getRoleTitle(role);
	return `${seniority}${roleTitle}`;
};
