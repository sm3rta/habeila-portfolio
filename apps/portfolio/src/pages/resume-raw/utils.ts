export type Params = {
	skills: string;
	senior: string;
	jobType: 'full-stack' | 'front-end' | 'softwareEngineer';
	adjective: string;
	includeLocation: string;
};

const SPLIT_CHARACTER = '-';
export const parseArray = (str: string | undefined) => {
	if (!str) return undefined;
	return str.split(SPLIT_CHARACTER);
};
export const stringifyArray = (arr: string[] | typeof paramsDefaultValues.skills) => arr.join(SPLIT_CHARACTER);

export const paramsDefaultValues = {
	skills: ['React', 'JavaScript', 'HTML/CSS'],
	senior: true,
	jobType: 'front-end',
	adjective: 'Highly motivated',
	includeLocation: true,
} as const;
