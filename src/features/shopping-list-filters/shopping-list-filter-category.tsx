import { CATEGORIES } from '@/features/types';
import { DownOutlined } from '@ant-design/icons';

interface ShoppingListFilterCategoryProps {
  value: string;
  onChange: (value: string) => void;
}

const ShoppingListFilterCategory: React.FC<ShoppingListFilterCategoryProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className='relative'>
      <label htmlFor='category' className='sr-only'>
        Category
      </label>
      <select
        name='category'
        id='category'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='
          appearance-none
          bg-white dark:bg-[#1a1a1a]
          border border-gray-300 dark:border-[#333]
          text-gray-900 dark:text-[#e5e5e5]
          rounded-lg
          px-4 py-2.5 pr-10
          text-base
          cursor-pointer
          outline-none
          transition-colors
          hover:border-gray-400 dark:hover:border-[#555]
          focus:border-indigo-500 dark:focus:border-[#666]
          focus:ring-0
          min-w-[200px]
          first-child:text-gray-500 dark:first-child:text-[#666]
        '
      >
        <option value='' className='text-gray-500 dark:text-[#666]'>
          Select Category
        </option>
        {CATEGORIES.map((category) => (
          <option
            key={category}
            value={category.toLowerCase()}
            className='text-gray-900 dark:text-[#e5e5e5] dark:bg-[#1a1a1a]'
          >
            {category}
          </option>
        ))}
      </select>
      <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
        <DownOutlined />
      </div>
    </div>
  );
};

export { ShoppingListFilterCategory };
