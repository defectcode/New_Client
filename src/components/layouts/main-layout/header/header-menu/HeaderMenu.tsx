'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation' 
import { Button } from '@/components/ui/Button'
import { PUBLIC_URL } from '@/config/url.config'

export function HeaderMenu() {
	const currentPath = usePathname();

	const isActive = (path: string) => currentPath === path;

	return (
		<div className="items-center gap-x-2 ml-auto lg:flex font-heebo">
			{/* Crowdfunding Button */}
			<div
				className={`border-transparent h-[26px] flex items-center justify-around rounded-[10px] max-w-[149px] w-full lg:block hidden ${
					isActive(PUBLIC_URL.crowdfunding()) ? 'bg-white' : 'bg-transparent'
				} text-[#000000]`}
			>
				<Link href={PUBLIC_URL.crowdfunding()}>
					<Button
						variant="ghost"
						className={`w-[149px] h-[26px] rounded-[10px] text-[#1E1E1E] text-[13px] ${
							isActive(PUBLIC_URL.crowdfunding()) ? 'bg-white' : 'bg-transparent text-[#1E1E1E]'
						} hover:bg-transparent`}
					>
						Crowdfunding
					</Button>
				</Link>
			</div>

			{/* Pre-Order Button */}
			<div
				className={`border-transparent h-[26px] flex items-center justify-around rounded-[10px] max-w-[103px] w-full ${
					isActive(PUBLIC_URL.preOrder()) ? 'bg-white' : 'bg-transparent'
				} text-[#000000]`}
			>
				<Link href={PUBLIC_URL.preOrder()}>
					<Button
						variant="ghost"
						className={`w-[103px] h-[26px] rounded-[10px] text-[#1E1E1E] text-[13px] ${
							isActive(PUBLIC_URL.preOrder()) ? 'bg-white' : 'bg-transparent text-[#1E1E1E]'
						} hover:bg-transparent`}
					>
						Pre-Order
					</Button>
				</Link>
			</div>
		</div>
	)
}
