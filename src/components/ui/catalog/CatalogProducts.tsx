'use client';
import './Catalog.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Category from './components/Category';
import { ICatalog } from './catalog.interface';
import { ProductCard } from './product-card/ProductCard';
import ClearFilter from './product-card/components/ClearFilter';
import { COLORS } from '@/app/(root)/product/[id]/product-info/constants/Colors';
import SortOptions from './product-card/components/SortOptions';
import { ExplorerProducts } from '@/app/(root)/explorer/components/ExplorerProducts';
import { CatalogForProduct } from './CatalogForProduct';



export function CatalogProducts({ title, description, linkTitle, link, products }: ICatalog) {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Newest');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [resetFilters, setResetFilters] = useState(false); 

  const bestSellerIds = useMemo(() => {
    const randomProducts = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((product) => product.id);
    return new Set(randomProducts);
  }, [products]);

  const bestPriceIds = useMemo(() => {
    return new Set(
      [...products].sort(() => 0.5 - Math.random()).slice(0, 2).map((product) => product.id)
    );
  }, [products]);


  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handleFilterChange = (filterType: string, selectedOptions: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedOptions,
    }));
  };

  const getTotalSelectedFilters = () => {
    return Object.values(filters).reduce((total, filterOptions) => total + filterOptions.length, 0);
  };

  const handleResetFilters = () => {
    setFilters({}); 
    setResetFilters(true); 
    setTimeout(() => setResetFilters(false), 0); 
  };
  
  const handleSortOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

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


  const filterProducts = () => {
      let filtered = products.filter((product) => {
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
  
    if (selectedOption === 'Low-High') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'High-Low') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (selectedOption === 'Newest') {
      filtered = filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (selectedOption === 'Discount') {
      filtered = filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return filtered;
  };
  

  const filteredProducts = filterProducts();
  const options = ['Newest', 'Low-High', 'High-Low', 'Discount'];

  return (
    <div className="max-w-[1400px] w-full mx-auto md:px-0 px-5 bg-[#F9F9F9]">
      <div className="flex items-center justify-between pt-16 mb-10">
        <h2 className="font-Heebo-24 text-[#000000]">Clothing and accessories</h2>
        <div className='flex items-center justify-between gap-10'>
          <ClearFilter 
            handleResetFilters={handleResetFilters} 
            totalFilters={getTotalSelectedFilters()} 
          />
          <SortOptions
            options={options}
            selectedOption={selectedOption}
            onOptionSelect={handleSortOptionSelect}
          />
        </div>
      </div>
      <div className="flex items-start justify-between w-full gap-10">
      <div>
        <Category 
          onFilterChange={handleFilterChange} 
          resetFilters={resetFilters} 
        />
      </div>
        <div className="w-full mb-10">
          <div className="flex flex-wrap gap-x-5 gap-y-10">
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <ExplorerProducts 
                  key={product.id} 
                  product={product} 
                  isBestSeller={bestSellerIds.has(product.id)}
                  isBestPrice={bestPriceIds.has(product.id)} 
                />
              ))
            ) : (
              <div className='text-[24px] font-heebo font-light'>Nothing found!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
