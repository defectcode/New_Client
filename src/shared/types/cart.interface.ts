import { IProduct } from './product.interface'

export interface ICartItem {
    name: any
	id: number
	product: IProduct
	quantity: number
	price: number
}
