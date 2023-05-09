export type Params = {
	skills: string;
	senior: 'true' | 'false';
	jobType: 'full-stack' | 'front-end' | 'softwareEngineer' | 'react';
	adjective: string;
	includeLocation: 'true' | 'false';
};

const SPLIT_CHARACTER = '-';
export const parseArray = (str: string | undefined) => {
	if (!str) return undefined;
	return str.split(SPLIT_CHARACTER);
};
export const stringifyArray = (arr: string[] | readonly string[]) => arr.join(SPLIT_CHARACTER);

export const paramsDefaultValues = {
	skills: ['React', 'JavaScript', 'HTML/CSS'],
	fullStackSkills: ['React', 'JavaScript', 'Python'],
	senior: true,
	jobType: 'front-end',
	adjective: 'Highly motivated',
	includeLocation: false,
} as const;
