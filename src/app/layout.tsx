import { GeistSans } from 'geist/font/sans';
import { Heebo } from 'next/font/google'; // Import Heebo din Google Fonts
import type { Metadata } from 'next';

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';

import './globals.scss';
import { Providers } from './providers';

// Configurarea fontului Heebo
const heebo = Heebo({
	subsets: ['latin'],
	weight: ['400', '500', '700'], // Greutățile dorite
	variable: '--font-heebo', // Variabila CSS pentru font
});

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${GeistSans.variable} ${heebo.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
