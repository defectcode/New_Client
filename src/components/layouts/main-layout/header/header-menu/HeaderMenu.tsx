'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PUBLIC_URL } from '@/config/url.config'

export function HeaderMenu() {
	const currentPath = window.location.pathname;

	return (
		<div className="items-center gap-x-2 ml-auto lg:flex">
			<div className="bg-transparent">
				<Link href={PUBLIC_URL.home()}>
					<Button
						variant="ghost"
						className={`hidden md:flex border-transparent h-[26px] rounded-[10px] w-[103px] bg-transparent text-[#000000]`}
					>
						Home
					</Button>
				</Link>
			</div>
			<div className="border-transparent h-[30px] flex items-center justify-around rounded-[10px] max-w-[103px] w-full bg-[#F9F9F9] text-[#000000]">
				<Link href={PUBLIC_URL.shop()}>
					<Button
						variant="ghost"
						className={`border-transparent w-20 h-[30px] md:h-[26px] rounded-[10px] md:w-[103px] bg-transparent text-[#000000] hover:bg-transparent`}
					>
						Shop
					</Button>
				</Link>
			</div>
		</div>
	)
}
