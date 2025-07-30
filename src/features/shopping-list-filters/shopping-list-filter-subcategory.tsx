import { ShoppingListFormInput } from '@/features/types';
import { DownOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

interface ShoppingListFilterSubcategoryProps {
  value: string;
  onChange: (value: string) => void;
  selectedCategory: string;
  data: ShoppingListFormInput[];
}

const ShoppingListFilterSubcategory: React.FC<ShoppingListFilterSubcategoryProps> = ({
  value,
  onChange,
  selectedCategory,
  data,
}) => {
  const subcategories = useMemo(() => {
    const filteredData = selectedCategory
      ? data.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
      : data;

    const uniqueSubcategories = Array.from(
      new Set(filteredData.map((item) => item.subcategory)),
    ).sort();

    return uniqueSubcategories;
  }, [data, selectedCategory]);

  return (
    <div className='relative h-[38px]'>
      <label htmlFor='subcategory' className='sr-only'>
        Subcategory
      </label>
      <select
        name='subcategory'
        id='subcategory'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={subcategories.length === 0}
        className='
          appearance-none
          bg-white dark:bg-dark
          border border-gray-300 dark:border-[#333]
          text-gray-900 dark:text-[#e5e5e5]
          rounded-lg
          px-4 py-2 pr-10
          w-[200px]
          text-sm
          cursor-pointer
          outline-none
          transition-colors
          hover:border-gray-400 dark:hover:border-[#555]
          focus:border-indigo-500 dark:focus:border-[#666]
        '
      >
        <option value='' className='text-gray-500 dark:text-[#666]'>
          Select Subcategory
        </option>
        {subcategories.map((subcategory) => (
          <option
            key={subcategory}
            value={subcategory}
            className='text-gray-900 dark:text-[#e5e5e5] dark:bg-[#1a1a1a]'
          >
            {subcategory}
          </option>
        ))}
      </select>
      <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
        <DownOutlined className='w-3 h-[7px]' />
      </div>
    </div>
  );
};

export { ShoppingListFilterSubcategory };
