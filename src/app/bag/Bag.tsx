

'use client'

import { Header } from '@/components/layouts/main-layout/header/Header'
import { CatalogBag } from '@/components/ui/catalog/CatalogBag'
import { CatalogCheckout } from '@/components/ui/catalog/CatalogChecout'

import { useProfile } from '@/hooks/useProfile'

export function Bag() {
	const { user } = useProfile()

	return (
		<div className='bg-[#F9F9F9] h-full'>
			<Header />
			<CatalogBag 
				title='' 
				products={user?.favorites || []} 
			/>
		</div>
	)
}
