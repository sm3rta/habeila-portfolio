import { Text as HopeText } from '@hope-ui/solid';
import { ComponentProps, splitProps } from 'solid-js';

type TextVariant = 'h1' | 'body' | 'title' | 'subtitle';
const textVariantMap: Record<
	TextVariant,
	Pick<ComponentProps<typeof HopeText>, 'fontSize' | 'fontWeight' | 'textTransform' | 'lineHeight'>
> = {
	h1: { fontSize: '$3xl', fontWeight: '$extrabold', lineHeight: '3rem' }, // name
	title: { fontSize: '$lg', fontWeight: '$bold', textTransform: 'uppercase', lineHeight: 1 }, // job title, company name
	subtitle: { fontSize: '$md', fontWeight: 'bold' }, //
	body: { fontSize: '$md', fontWeight: 'normal' },
};

export const Text = (_props: ComponentProps<typeof HopeText> & { variant?: TextVariant }) => {
	const [{ variant = 'body' }, props] = splitProps(_props, ['variant']);

	return <HopeText {...textVariantMap[variant]} {...props} />;
};
