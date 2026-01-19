const getRoleTitle = (role: 'front' | 'full' | 'se' | 'architect') => {
	switch (role) {
		case 'front':
			return 'Front-end Developer';
		case 'full':
			return 'Full-stack Developer';
		case 'se':
			return 'Software Engineer';
		case 'architect':
			return 'Frontend Architect';
	}
};

export const getTitle = (role: 'front' | 'full' | 'se' | 'architect', senior: boolean) => {
	const roleTitle = getRoleTitle(role);
	if (role === 'architect') return roleTitle;
	
	const seniority = senior ? 'Senior ' : '';
	return `${seniority}${roleTitle}`;
};
