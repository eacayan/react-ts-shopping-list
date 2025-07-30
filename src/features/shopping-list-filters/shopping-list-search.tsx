import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

interface ShoppingListSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ShoppingListSearch: React.FC<ShoppingListSearchProps> = ({ value, onChange }) => {
  const [searchValue, setSearchValue] = useState(value);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, onChange]);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  return (
    <div className='relative w-[200px]'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>

      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
        <SearchOutlined />
      </span>

      <input
        type='text'
        id='search'
        name='search'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Search'
        className='
          appearance-none
          bg-white dark:bg-dark
          border border-gray-300 dark:border-[#333]
          text-gray-900 dark:text-[#e5e5e5]
          rounded-lg
          pl-9 pr-4 py-2
          w-full
          text-sm
          outline-none
          transition-colors
          hover:border-gray-400 dark:hover:border-[#555]
          focus:border-indigo-500 dark:focus:border-[#666]
          focus:ring-0
          first-child:text-gray-500 dark:first-child:text-[#666]
        '
      />
    </div>
  );
};

export { ShoppingListSearch };
