import { ICategory } from './category.interface'
import { IColor } from './color.interface'
import { IReview } from './review.interface'

export interface IProduct {
	discountedPrice: number
	id: string
	title: string
	description: string
	price: number
	discount?: number; 
	images: string[]
	category: ICategory
	reviews: IReview[]
	color: IColor
	storeId: string,
	gender: string,
	size: string
	
}

export interface IProductInput
	extends Omit<
		IProduct,
		'id' | 'reviews' | 'storeId' | 'category' | 'color'
	> {
	categoryId: string
	colorId: string 
}
