'use client'

import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/Button'
import { SERVER_URL } from '@/config/api.config'

export function Social() {
	const router = useRouter()

	return (
		<div className='w-full flex justify-center items-center'>
			<Button
				variant='outline'
				onClick={() => router.push(`${SERVER_URL}/auth/google`)}
				className='gap-[5px] h-[48px] max-w-lg w-full border-[#000000]/10 rounded-[10px] text-[#1E1E1E] font-semibold text-[16px]'
			>
				Continue with Google
				<FcGoogle className='w-[16px] h-[16px]' />
			</Button>
		</div>
	)
}
