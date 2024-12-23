'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PUBLIC_URL } from '@/config/url.config'

export function HeaderMenu() {
	const currentPath = window.location.pathname;

	return (
		<>
			{currentPath === PUBLIC_URL.home() ? (
				<div className="items-center gap-x-2 ml-auto lg:flex">
					<div className="bg-transparent">
						<Link href={PUBLIC_URL.home()}>
							<Button
								variant="ghost"
								className={`hidden md:flex border-transparent h-[26px] rounded-[10px] w-[103px] ${
									currentPath === PUBLIC_URL.home()
										? 'text-white font-bold'
										: 'bg-transparent text-[#424242]'
								}`}
							>
								Home
							</Button>
						</Link>
					</div>
					<div className="border-transparent h-[30px] flex items-center justify-around rounded-[10px] max-w-[103px] w-full bg-[#FFFFFF] text-[#000000]">
						<Link href={PUBLIC_URL.shop()}>
							<Button
								variant="ghost"
								className={`border-transparent w-20 h-[30px] md:h-[26px] rounded-[10px] md:w-[103px] ${
									currentPath === PUBLIC_URL.shop()
										? 'text-white font-bold'
										: 'bg-transparent text-[#000000]'
								}`}
							>
								Shop
							</Button>
						</Link>
					</div>
				</div>
			) : (
				<div className="items-center gap-x-2 ml-auto lg:flex">
					<div className="bg-transparent">
						<Link href={PUBLIC_URL.home()}>
							<Button
								variant="ghost"
								className={`hidden md:flex border-transparent h-[26px] rounded-[10px] w-[103px] ${
									currentPath === PUBLIC_URL.home()
										? 'text-white font-bold'
										: 'bg-transparent text-[#FFFFFF]'
								}`}
							>
								Home
							</Button>
						</Link>
					</div>
					<div className="border-transparent h-[30px] flex items-center justify-around rounded-[10px] max-w-[103px] w-full bg-black/20 text-white">
						<Link href={PUBLIC_URL.shop()}>
							<Button
								variant="ghost"
								className={`border-transparent w-20 h-[30px] md:h-[26px] rounded-[10px] md:w-[103px] ${
									currentPath === PUBLIC_URL.shop()
										? 'text-white font-bold'
										: 'bg-transparent text-white'
								}`}
							>
								Shop
							</Button>
						</Link>
					</div>
				</div>
			)}
		</>
	)
}
