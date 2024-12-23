import Image from 'next/image'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { SITE_NAME } from '@/constants/seo.constants'

export function Logo() {
	const currentPath = window.location.pathname;

	return (
		<>
			{currentPath === PUBLIC_URL.home() ? (
				<Link
					href={PUBLIC_URL.home()}
					className="flex items-center gap-x-3 hover:opacity-75 transition-opacity"
				>
					<Image
						src="/images/logoBlack.svg"
						alt={SITE_NAME}
						width={95}
						height={70}
						className="max-md:w-[73px] max-md:h-[43px]"
						style={{ lineHeight: '40px' }}
					/>
				</Link>
			) : (
				<Link
					href={PUBLIC_URL.home()}
					className="flex items-center gap-x-3 hover:opacity-75 transition-opacity"
				>
					<Image
						src="/images/logo.svg"
						alt={SITE_NAME}
						width={95}
						height={70}
						className="max-md:w-[73px] max-md:h-[43px]"
						style={{ lineHeight: '40px' }}
					/>
				</Link>
			)}
		</>
	);
}
