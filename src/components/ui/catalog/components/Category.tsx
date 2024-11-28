import Image from "next/image"
import FilterSection from "./FilterSection";
import '../Catalog.css'


interface CategoryProps {
    onFilterChange: (title: string, selectedOptions: string[]) => void;
  }
  
  const Category: React.FC<CategoryProps> = ({ onFilterChange }) => {
    return (
      <div className="w-[244px] font-Heebo-16-bold">
        <FilterSection
          title="Category"
          options={['Men', 'Women', 'Unisex']}
          onFilterChange={onFilterChange}
        />
        <FilterSection
          title="Shop by Price"
          options={['$25 - 50', '$50 - 100', '$100 - 150', 'Over 150']}
          onFilterChange={onFilterChange}
        />
        <FilterSection
          title="Gender"
          options={['Men', 'Women', 'Unisex']}
          onFilterChange={onFilterChange}
        />
        <FilterSection
          title="Color"
          options={['Red', 'Blue', 'Green', 'Black', 'White']}
          onFilterChange={onFilterChange}
        />
        <FilterSection
          title="Size"
          options={['S', 'M', 'L', 'XL']}
          onFilterChange={onFilterChange}
        />
      </div>
    );
  };
  
  export default Category;
  