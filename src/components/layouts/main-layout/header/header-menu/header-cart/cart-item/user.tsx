'use client'
import { useProfile } from '@/hooks/useProfile'
import { Loader } from '@/components/ui/Loader'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import Link from 'next/link'
import Image from 'next/image'
import { DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'

import styles from '../HeaderCart.module.scss'
import { LogOut } from 'lucide-react'



export function User() {
    const { user, isLoading } = useProfile()

    const currentPath = window.location.pathname;



    return (
        <Button className='bg-transparent p-0'>
            {isLoading ? (
				<Loader size='sm' />
			) : user ? (
				<>
					<Link href={PUBLIC_URL.shop()}>
					</Link>
					{user.stores.length ? (
						<div>
						</div>
					) : (
						// <CreateStoreModal>
						// 	<Button variant='ghost'>Create a store</Button>
						// </CreateStoreModal>
						<div>
							
						</div>
					)}
					<Link href={DASHBOARD_URL.home()}>
						<Image
							src="/images/userNavBar.svg"
							alt={user.name}
							width={17}
							height={17}
							className={`${styles.avatar} ${currentPath === DASHBOARD_URL.home() ? 'border-2 border-white max-md:w-4 max-md:h-4' : 'max-md:w-4 max-md:h-4'}`} // Iconiță activă
						/>
					</Link>
				</>
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<button className='flex items-center justify-center text-[#000000]' >
						Login
					</button>
				</Link>
			)}
        </Button>
    )

}
