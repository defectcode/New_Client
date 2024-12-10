import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'


import { sizeService } from '@/services/size.service'
import { ISizeInput } from '@/shared/types/size.interface'

export const useCreateSize = () => {
	const params = useParams<{ storeId: string }>()
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: createSize, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create color'],
    mutationFn: (data: ISizeInput) => {
        if (params?.storeId) {
            return sizeService.create(data, params.storeId);
        } else {
            console.error("Store ID is missing");
            return Promise.reject(new Error("Store ID is missing"));
        }
    },
    onSuccess() {
        queryClient.invalidateQueries({
            queryKey: ['get colors for store dashboard']
        });
        toast.success('Color created');
        if (params?.storeId) {
            router.push(STORE_URL.sizes(params.storeId));
        }
    },
    onError() {
        toast.error('Error creating color');
    }
});


	return useMemo(
		() => ({
			createSize,
			isLoadingCreate
		}),
		[createSize, isLoadingCreate]
	)
}
