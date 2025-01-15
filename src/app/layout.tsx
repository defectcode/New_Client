// 'use client'
import { GeistSans } from 'geist/font/sans';
import { Heebo } from 'next/font/google';
import type { Metadata } from 'next';

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';

import './globals.scss';
import "./globals.css";
import { Providers } from './providers';
import { FacebookPixelEvents } from '@/components/pixel-events';
import { TikTokPixel } from '@/components/tiktok-pixel';
import { GoogleAnalytics } from '@/components/google-analytics';

const heebo = Heebo({
	subsets: ['latin'],
	weight: ['400', '500', '700'], 
	variable: '--font-heebo', 
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
				<GoogleAnalytics />
				{/* <FacebookPixelEvents /> */}
				<TikTokPixel />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}