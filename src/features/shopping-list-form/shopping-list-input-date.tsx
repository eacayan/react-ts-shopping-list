import { CalendarOutlined } from '@ant-design/icons';

interface ShoppingListInputDateProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShoppingListInputDate: React.FC<ShoppingListInputDateProps> = ({ value, onChange }) => {
  return (
    <div className='relative flex flex-col gap-y-1'>
      <label htmlFor='date' className='text-sm'>
        Date
      </label>
      <input
        type='date'
        id='date'
        name='date'
        value={value}
        onChange={onChange}
        className='
          appearance-none
          bg-white dark:bg-[#1a1a1a]
          border border-gray-300 dark:border-[#333]
          text-gray-900 dark:text-[#e5e5e5]
          rounded-lg
          px-4 py-2 pr-10
          max-w-40
          text-sm
          outline-none
          transition-colors
          hover:border-gray-400 dark:hover:border-[#555]
          focus:border-indigo-500 dark:focus:border-[#666]
          focus:ring-0
          min-w-[200px]
          cursor-pointer
          [&::-webkit-calendar-picker-indicator]:opacity-0
          [&::-webkit-inner-spin-button]:appearance-none
          [&::-webkit-clear-button]:appearance-none
        '
      />
      <div className='pointer-events-none absolute inset-y-0 right-0 top-1/3 flex items-center pr-3'>
        <CalendarOutlined className='text-gray-500 dark:text-[#999]' />
      </div>
    </div>
  );
};

export { ShoppingListInputDate };
