'use client';
import Link from 'next/link';
import { ICatalog } from './catalog.interface';
import { ProductCard } from './product-card/ProductCard';
import Category from './components/Category';
import Image from 'next/image';
import './Catalog.css';
import { useState, useRef, useEffect } from 'react';

export function CatalogProducts({ title, description, linkTitle, link, products }: ICatalog) {
	const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<string>('Newest');
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(false);


	useEffect(() => {
		const updateIsMobile = () => {
		  setIsMobile(window.matchMedia("(max-width: 768px)").matches);
		};
	
		updateIsMobile();
		window.addEventListener("resize", updateIsMobile);
		return () => window.removeEventListener("resize", updateIsMobile);
	  }, []);
	


	// Gestionare filtre
	const handleFilterChange = (filterType: string, selectedOptions: string[]) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: selectedOptions,
		}));
	};


	// Închiderea dropdown-ului
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleOptionClick = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

	// Filtrarea produselor
	const filterProducts = () => {
		return products.filter((product) => {
			const matchesCategory =
				!filters.Category ||
				filters.Category.length === 0 ||
				filters.Category.includes(product.title);

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
				filters.Gender.includes(product.title);

			const matchesColor =
				!filters.Color ||
				filters.Color.length === 0 ||
				filters.Color.includes(product.color.name);

			const matchesSize =
				!filters.Size ||
				filters.Size.length === 0 ||
				filters.Size.includes(product.title);

			return matchesCategory && matchesPrice && matchesGender && matchesColor && matchesSize;
		});
	};

	const filteredProducts = filterProducts();

	const options = ['Newest', 'Low-High', 'High-Low', 'Discount'];

	return (
		<div className="max-w-[1400px] w-full mx-auto md:px-0 px-5 bg-[#F9F9F9]">
			<div className='flex items-center justify-between pt-16 mb-10'>
				<h2 className="font-Heebo-24 text-[#000000]">Clothing and accessories</h2>
				<div className="relative" ref={dropdownRef}>
					<button
						className="flex items-center gap-5 cursor-pointer"
						onClick={() => setIsOpen(!isOpen)}
					>
						<p className="font-Heebo-16-bold text-[#1E1E1E]">Sort by</p>
						<Image
							src="/images/arr.svg"
							alt="arrow"
							width={10}
							height={5}
							className={`transform transition-transform duration-300 ${
								isOpen ? 'rotate-180' : ''
							}`}
						/>
					</button>

					{isOpen && (
						<div className="absolute right-0 bg-[#E8E8ED] shadow-lg w-[162px] h-auto rounded-md border border-[#E0E0E0] z-10 space-y-[10px] py-5 md:mt-5">
							{options.map((option, index) => (
								<p
									key={index}
									className={`px-5 font-Heebo-16-reg cursor-pointer hover:text-[#1E1E1E] ${
										selectedOption === option ? 'text-[#1E1E1E]' : 'text-[#898989]'
									}`}
									onClick={() => handleOptionClick(option)}
								>
									{option !== 'Newest' ? `Price: ${option}` : option}
								</p>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="flex items-start justify-between w-full gap-10">
				<div>
					<Category onFilterChange={handleFilterChange} />
				</div>
				<div className="w-full mb-10">
					<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
						{filteredProducts.length ? (
							filteredProducts.map((product) => (
								<ProductCard key={product.id} product={product} />
							))
						) : (
							<div>Nothing found!</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
