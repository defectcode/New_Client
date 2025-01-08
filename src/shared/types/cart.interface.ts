import { IProduct } from './product.interface'

export interface ICartItem {
    name?: string
	id: number
	product: IProduct
	quantity: number
	price: number
}
