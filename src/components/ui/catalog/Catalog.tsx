'use client'
import Link from 'next/link'
import { ICatalog } from './catalog.interface'
import { ProductCard } from './product-card/ProductCard'
import styles from './components/style/CaralogProducts.module.css'

import './Catalog.css'
import Image from 'next/image';

export function Catalog({
	title,
	description,
	linkTitle,
	link,
	products
}: ICatalog) {

	return (
		<div className='max-w-[1400px] w-full mx-auto md:px-0 mb-10'>

			<div className={styles.header}>
				<div className={styles.headerLeft}>
				<h1 className={styles.title}>{title}</h1>
				{link && linkTitle && (
					<Link href={link}>
					<button className={styles.button}>{linkTitle}</button>
					</Link>
				)}
				</div>
				<div className={styles.arrowContainer}>
					<div className={styles.arrow}>
						<Image src="/images/LeftArrow.svg" alt="Scroll Left" width={6} height={10} />
					</div>
					<div className={`${styles.arrow}`}>
						<Image src="/images/rightArrow.svg" alt="Scroll Right" width={6} height={10} />
					</div>
				</div>
			</div>
			<div className="flex items-center w-full">
				<div className="mt-2 w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-8 pl-5">
					{products.length ? (
						products.map(product => (
							<div className="w-full h-full" key={product.id}>
								<ProductCard product={product} />
							</div>
						))
					) : (
						<div>Nothing found!</div>
					)}
				</div>
			</div>
		</div>
	)
}
