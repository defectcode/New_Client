import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import FilterSection from './FilterSection'; 
import { ProductCard } from '../product-card/ProductCard';
import { ICatalog } from '../catalog.interface';

import '../Catalog.css';
import { COLORS } from '@/app/(root)/product/[id]/product-info/constants/Colors';
import { ExplorerProducts } from '@/app/(root)/explorer/components/ExplorerProducts';
import { PreOrderProducts } from '@/app/(root)/pre-order/components/PreOrderProducts';



export function PreOrderCatalogMobile({ title, description, linkTitle, link, products }: ICatalog) {
	const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleFilterChange = (title: string, selectedOptions: string[]) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[title]: selectedOptions,
		}));
	};
	

	const bestSellerIds = useMemo(() => {
    	const randomProducts = [...products]
    	  .sort(() => 0.5 - Math.random())
    	  .slice(0, 2) 
    	  .map((product) => product.id);
    	return new Set(randomProducts);
    }, [products]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);


	const bestPriceIds = useMemo(() => {
		return new Set(
		  [...products].sort(() => 0.5 - Math.random()).slice(0, 2).map((product) => product.id)
		);
	  }, [products]);

	const filterProducts = () => {
		return products.filter((product) => {
			const matchesCategory =
				!filters.Category ||
				filters.Category.length === 0 ||
				filters.Category.includes(product.category.title);

			const matchesPrice =
				!filters['Shop by Price'] ||
				filters['Shop by Price'].length === 0 ||
				filters['Shop by Price'].some((priceRange) => {
					const [min, max] = priceRange
						.replace('$', '')
						.split(' - ')
						.map((price) => (price === 'Over' ? Infinity : parseInt(price, 10)));
					return product.price >= min && product.price <= max;
				});

			const matchesGender =
				!filters.Gender ||
				filters.Gender.length === 0 ||
				filters.Gender.includes(product.category.title);

			const matchesColor =
				!filters.Color ||
				filters.Color.length === 0 ||
				filters.Color.some((filterColor) =>
				  COLORS.some(
					(productColor) =>
					  productColor.name.trim().toLowerCase() === filterColor.trim().toLowerCase()
				  )
				);

			const matchesSize =
				!filters.Size ||
				filters.Size.length === 0 ||
				filters.Size.includes(product.color.name);

			return matchesCategory && matchesPrice && matchesGender && matchesColor && matchesSize;
		});
	};

	const filteredProducts = filterProducts();

	return (
		<div className="max-w-[1400px] w-full mx-auto bg-[#F9F9F9]">
			<div className="bg-white px-5 space-y-5 py-5">
				{/* <span className="text-[#8C8C8C]">Home / Catalog</span> */}
				<h2 className="font-Heebo-24 text-[#000000]">{title}</h2>
			</div>
			<div className="flex items-center justify-between mb-5 border-y-[1px] border-[#BDBDBD]/50 p-5 bg-white">
				<span className="font-Heebo-14-reg text-[#8C8C8C]">{filteredProducts.length} Results</span>
				<button
					className="flex items-center gap-[10px] cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
				>
					<p className="font-Heebo-16-bold text-[#1E1E1E]">Filters</p>
					<Image src="/images/filter.svg" alt="filter icon" width={16} height={14} />
				</button>
			</div>

			{isOpen && (
				<div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
					<div
						className="absolute bottom-0 w-full bg-[#F9F9F9] rounded-t-xl p-5 h-[75vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-between items-center mb-5">
							<h3 className="text-lg font-semibold">Filters</h3>
							<button onClick={() => setIsOpen(false)}>
								<Image src="/images/close.svg" alt="close" width={16} height={16} />
							</button>
						</div>

						<div className="">
							<FilterSection
									title="Filters"
									options={['Newest', 'Price: Low-High', 'Price: High-Low', 'Price: Discount']}
									onFilterChange={handleFilterChange} resetFilters={false}						
							/>
							<FilterSection
									title="Category"
									options={['Men', 'Women', 'Unisex']}
									onFilterChange={handleFilterChange} resetFilters={false}						
							/>
							<FilterSection
									title="Shop by Price"
									options={['$25 - 50', '$50 - 100', '$100 - 150', 'Over 150']}
									onFilterChange={handleFilterChange} resetFilters={false}								
							/>
							<FilterSection
									title="Gender"
									options={['Men', 'Women', 'Unisex']}
									onFilterChange={handleFilterChange} resetFilters={false}						
							/>
							<FilterSection
									title="Color"
									options={['Red', 'Blue', 'Green', 'Black', 'White']}
									onFilterChange={handleFilterChange} resetFilters={false}						
							/>
							<FilterSection
									title="Size"
									options={['S', 'M', 'L', 'XL']}
									onFilterChange={handleFilterChange}
									isLast={true} resetFilters={false}						
							/>
						</div>

						<div className="fixed bottom-0 left-0 w-full bg-white z-50 border-t-[1px] flex justify-between items-center h-[87px] px-5 py-3">
							<button
								className="border w-[185px] h-[48px] border-black rounded-lg"
								onClick={() => {
									setFilters({});
									setIsOpen(false);
								}}
							>
								Clear All
							</button>
							<button
								className="bg-black w-[185px] h-[48px] text-white rounded-lg"
								onClick={() => setIsOpen(false)}
							>
								Apply Filters
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="w-full">
				<div className="grid grid-cols-2 gap-x-[10px] gap-y-10 px-5 pb-10">
					{filteredProducts.length ? (
						filteredProducts.map((product, index) => (
							<PreOrderProducts
								key={product.id} 
								product={product} 
								isBestSeller={bestSellerIds.has(product.id)}
								isBlurred={index !== 0} // Primul produs nu va fi blurat, restul da
							/>
						))
					) : (
						<div className='text-[18px] font-heebo font-light'>Nothing found!</div>
					)}
				</div>
			</div>
		</div>
	);
}
