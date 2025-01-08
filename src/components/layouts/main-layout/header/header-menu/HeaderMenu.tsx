'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation' // Pentru a obține pathname în mod corect
import { Button } from '@/components/ui/Button'
import { PUBLIC_URL } from '@/config/url.config'

export function HeaderMenu() {
	const currentPath = usePathname();

	const isActive = (path: string) => currentPath === path;

	return (
		<div className="items-center gap-x-2 ml-auto lg:flex">
			<div
				className={`border-transparent h-[30px] flex items-center justify-around rounded-[10px] max-w-[103px] w-full lg:block hidden ${
					isActive(PUBLIC_URL.home()) ? 'bg-white' : 'bg-transparent'
				} text-[#000000]`}
			>
				<Link href={PUBLIC_URL.home()}>
					<Button
						variant="ghost"
						className={`w-20 h-[30px] rounded-[10px] md:w-[103px] text-[#000000] ${
							isActive(PUBLIC_URL.home()) ? 'bg-white' : 'bg-transparent'
						} hover:bg-transparent`}
					>
						Home
					</Button>
				</Link>
			</div>

			<div
				className={`border-transparent h-[30px] flex items-center justify-around rounded-[10px] max-w-[103px] w-full ${
					isActive(PUBLIC_URL.catalog()) ? 'bg-white' : 'bg-transparent'
				} text-[#000000]`}
			>
				<Link href={PUBLIC_URL.catalog()}>
					<Button
						variant="ghost"
						className={`w-20 h-[30px] rounded-[10px] md:w-[103px] text-[#000000] ${
							isActive(PUBLIC_URL.catalog()) ? 'bg-white' : 'bg-transparent'
						} hover:bg-transparent`}
					>
						Shop
					</Button>
				</Link>
			</div>
		</div>
	)
}
