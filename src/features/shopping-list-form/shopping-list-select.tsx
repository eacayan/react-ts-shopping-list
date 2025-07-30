import { DownOutlined } from '@ant-design/icons';
import { CATEGORIES } from '@/features/types';

interface ShoppingListSelectProps {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: string[] | typeof CATEGORIES;
}

const ShoppingListSelect: React.FC<ShoppingListSelectProps> = ({
  value,
  onChange,
  options,
  label,
}) => {
  return (
    <div className='relative flex flex-col gap-y-1'>
      <label htmlFor={label} className='text-sm'>
        {label}
      </label>
      <select
        name={label}
        id={label}
        value={value}
        onChange={onChange}
        className='
          appearance-none
          bg-white dark:bg-dark
          border border-gray-300 dark:border-[#333]
          text-gray-900 dark:text-[#e5e5e5]
          rounded-lg
          px-4 py-2 pr-10
          w-[180px]
          text-sm
          cursor-pointer
          outline-none
          transition-colors
          hover:border-gray-400 dark:hover:border-[#555]
          focus:border-indigo-500 dark:focus:border-[#666]
          focus:ring-0
          first-child:text-gray-500 dark:first-child:text-[#666]
        '
      >
        <option value='' className='text-gray-500 dark:text-[#666]'>
          Select
        </option>
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className='text-gray-900 dark:text-[#e5e5e5] dark:bg-[#1a1a1a]'
          >
            {option}
          </option>
        ))}
      </select>
      <div className='absolute inset-y-2/4 right-0 top-1/2flex items-center pr-3 pointer-events-none'>
        <DownOutlined />
      </div>
    </div>
  );
};

export { ShoppingListSelect };
