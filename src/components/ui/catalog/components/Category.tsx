import FilterSection from "./FilterSection";
import '../Catalog.css';

interface CategoryProps {
  onFilterChange: (title: string, selectedOptions: string[]) => void;
  resetFilters: boolean; 
}

const Category: React.FC<CategoryProps> = ({ onFilterChange, resetFilters }) => {
  return (
    <div className="w-[244px] font-Heebo-16-bold">
      <FilterSection
        title="Category"
        options={['Men', 'Women', 'Unisex']}
        onFilterChange={onFilterChange}
        resetFilters={resetFilters} 
      />
      <FilterSection
        title="Shop by Price"
        options={['$25 - 50', '$50 - 100', '$100 - 150', 'Over 150']}
        onFilterChange={onFilterChange}
        resetFilters={resetFilters} 
      />
      <FilterSection
        title="Gender"
        options={['Men', 'Women', 'Unisex']}
        onFilterChange={onFilterChange}
        resetFilters={resetFilters} 
      />
      <FilterSection
        title="Color"
        options={['Red', 'Blue', 'Green', 'Black', 'White']}
        onFilterChange={onFilterChange}
        resetFilters={resetFilters} 
      />
      <FilterSection
        title="Size"
        options={['S', 'M', 'L', 'XL']}
        onFilterChange={onFilterChange}
        resetFilters={resetFilters} 
      />
    </div>
  );
};

export default Category;
