'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/form-elements/Input'
import { PUBLIC_URL } from '@/config/url.config'
import Image from 'next/image'

export function SearchInput() {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [isSearchVisible, setSearchVisible] = useState<boolean>(false)
	const currentPath = window.location.pathname;
	const router = useRouter()

	
	return (
		<div className="flex items-center relative">
			{isSearchVisible && (
				<Input
					placeholder="Search for products"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="rounded-full  focus-visible:ring-transparent"
				/>
			)}
			<Button
				variant="primary"
				onClick={() => {
					if (isSearchVisible && searchTerm) {
						router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))
					} else {
						setSearchVisible(prev => !prev)
					}
				}}
				className="md:ml-2 rounded-full bg-transparent text-white p-0"
			>
				{/* {currentPath === PUBLIC_URL.home() ? <Image src='/images/search.svg' alt='search' width={15} height={15}/> : <Image src='/images/search2.svg' alt='search' width={15} height={15}/>} */}
				<Image src='/images/searchNavBar.svg' alt='search' width={15} height={15}/>
			</Button>
		</div>
	)
}
