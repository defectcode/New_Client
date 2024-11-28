import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ICatalog } from '../catalog.interface';
import { ProductCard } from '../product-card/ProductCard';

import '../Catalog.css'

export function CatalogMobile({ title, description, linkTitle, link, products }: ICatalog) {
	const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState(false);

	// Detectare dispozitiv mobil
	useEffect(() => {
		const updateIsMobile = () => {
			setIsMobile(window.matchMedia('(max-width: 768px)').matches);
		};
		updateIsMobile();
		window.addEventListener('resize', updateIsMobile);
		return () => window.removeEventListener('resize', updateIsMobile);
	}, []);

	// Gestionare filtre
	const handleFilterChange = (filterType: string, option: string) => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters };
			if (updatedFilters[filterType]?.includes(option)) {
				// Dacă opțiunea este deja selectată, elimin-o
				updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== option);
			} else {
				// Adaugă opțiunea selectată
				updatedFilters[filterType] = [...(updatedFilters[filterType] || []), option];
			}
			return updatedFilters;
		});
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'; // Blochează scroll-ul
		} else {
			document.body.style.overflow = ''; // Resetează comportamentul scroll-ului
		}
		return () => {
			document.body.style.overflow = ''; // Asigură curățarea stilului
		};
	}, [isOpen]);
	

	// Filtrarea produselor pe baza filtrelor
	const filterProducts = () => {
		return products.filter((product) => {
			const matchesPrice =
				!filters['Shop by Price'] ||
				filters['Shop by Price'].length === 0 ||
				filters['Shop by Price'].some((priceRange) => {
					if (priceRange === 'Over $150') return product.price > 150;
					const [min, max] = priceRange
						.replace('$', '')
						.split(' - ')
						.map(Number);
					return product.price >= min && product.price <= max;
				});

			// Alte filtre (ex: Gender, Category) pot fi adăugate similar
			return matchesPrice;
		});
	};

	const filteredProducts = filterProducts();

	return (
		<div className="max-w-[1400px] w-full mx-auto md:px-0 bg-[#F9F9F9]">
			<div className="bg-white px-5 space-y-5 py-5">
				<span className="text-[#8C8C8C]">Home / Catalog</span>
				<h2 className="font-Heebo-24 text-[#000000]">Clothing and accessories</h2>
			</div>
			<div className="flex items-center justify-between mb-5 border-y-[1px] border-[#BDBDBD]/50 p-5 bg-white">
				<span className="font-Heebo-14-reg text-[#8C8C8C]">{filteredProducts.length} Results</span>
				<button
					className="flex items-center gap-[10px] cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
				>
					<p className="font-Heebo-16-bold text-[#1E1E1E]">Filters</p>
					<Image
						src="/images/filter.svg"
						alt="filter icon"
						width={16}
						height={14}
					/>
				</button>
			</div>

			{/* Modal pentru filtre */}
			{isOpen && (
				<div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
					<div className="absolute bottom-0 w-full bg-[#F9F9F9] rounded-t-xl p-5 h-[75vh] overflow-y-auto"
					onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-between items-center mb-5">
							<h3 className="text-lg font-semibold">Filters</h3>
							<button onClick={() => setIsOpen(false)}>
								<Image
									src="/images/close.svg"
									alt="close"
									width={16}
									height={16}
								/>
							</button>
						</div>

						<div className="">
							{/* Sortare */}
							<div className='border-b-[1px] pb-5'>
								<h4 className="font-bold mb-2">Sort By</h4>
								<ul className="space-y-2">
									{['Newest', 'Price: Low-High', 'Price: High-Low', 'Discount'].map((option) => (
										<li key={option}>
											<label className="flex items-center space-x-2 ml-[10px]">
												<input
													type="checkbox"
													className='form-checkbox'
													checked={filters['Sort By']?.includes(option) || false}
													onChange={() => handleFilterChange('Sort By', option)}
												/>
												<span>{option}</span>
											</label>
										</li>
									))}
								</ul>
							</div>

							<div className='border-b-[1px] py-5'>
								<h4 className="font-bold mb-2">Category</h4>
								<ul className="space-y-2">
									{['Woman', 'Man', 'Kids'].map((category) => (
										<li key={category}>
											<label className="flex items-center space-x-2 ml-[10px]">
												<input
													type="checkbox"
													className='form-checkbox'
													checked={filters['Gender']?.includes(category) || false}
													onChange={() => handleFilterChange('Gender', category)}
												/>
												<span>{category}</span>
											</label>
										</li>
									))}
								</ul>
							</div>

							{/* Filtrare după preț */}
							<div className='border-b-[1px] py-5'>
								<h4 className="font-bold mb-2">Shop by Price</h4>
								<ul className="space-y-2">
									{['$25 - 50', '$50 - 100', '$100 - 150', 'Over $150'].map((priceRange) => (
										<li key={priceRange}>
											<label className="flex items-center space-x-2 ml-[10px]">
												<input
													type="checkbox"
													className='form-checkbox'
													checked={filters['Shop by Price']?.includes(priceRange) || false}
													onChange={() => handleFilterChange('Shop by Price', priceRange)}
												/>
												<span>{priceRange}</span>
											</label>
										</li>
									))}
								</ul>
							</div>

							{/* Filtrare după gen */}
							<div className='border-b-[1px] py-5'>
								<h4 className="font-bold mb-2">Gender</h4>
								<ul className="space-y-2">
									{['Woman', 'Man', 'Kids'].map((gender) => (
										<li key={gender}>
											<label className="flex items-center space-x-2 ml-[10px]">
												<input
													type="checkbox"
													className='form-checkbox'
													checked={filters['Gender']?.includes(gender) || false}
													onChange={() => handleFilterChange('Gender', gender)}
												/>
												<span>{gender}</span>
											</label>
										</li>
									))}
								</ul>
							</div>

							<div className='border-b-[1px] py-5'>
								<h4 className="font-bold mb-2">Color</h4>
								<ul className="space-y-2">
									{['gray', 'black', 'white'].map((color) => (
										<li key={color}>
											<label className="flex items-center space-x-2 ml-[10px]">
												<input
													type="checkbox"
													className='form-checkbox'
													checked={filters['color']?.includes(color) || false}
													onChange={() => handleFilterChange('Gender', color)}
												/>
												<span>{color}</span>
											</label>
										</li>
									))}
								</ul>
							</div>

							<div className='pt-5 pb-20'>
								<h4 className="font-bold mb-2">Size</h4>
								<ul className="space-y-2">
									{['XL', 'XS', 'Xsize'].map((size) => (
										<li key={size}>
											<label className="flex items-center space-x-2 ml-[10px]">
												<input
													type="checkbox"
													className='form-checkbox'
													checked={filters['Size']?.includes(size) || false}
													onChange={() => handleFilterChange('Size', size)}
												/>
												<span>{size}</span>
											</label>
										</li>
									))}
								</ul>
							</div>
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
				<div className="grid grid-cols-2 gap-x-[10px] gap-y-20 px-5 pb-10">
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
	);
}
