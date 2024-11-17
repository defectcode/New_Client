

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { productService } from '@/services/product.service'
import { IProductInput } from '@/shared/types/product.interface'

export const useUpdateProduct = () => {
	const params = useParams<{ productId: string }>()
	const productId = params?.productId
	const queryClient = useQueryClient()

	const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update product', productId], // Include productId in the key for context
		mutationFn: (data: IProductInput) => {
			if (!productId) {
				return Promise.reject('Product ID is required to update the product.')
			}
			return productService.update(productId, data)
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			})
			toast.success('Product updated')
		},
		onError() {
			toast.error('Error updating product')
		}
	})

	return useMemo(
		() => ({
			updateProduct,
			isLoadingUpdate
		}),
		[updateProduct, isLoadingUpdate]
	)
}
