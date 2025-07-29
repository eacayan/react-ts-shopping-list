interface ShoppingListInputNumberProps {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const ShoppingListInputNumber: React.FC<ShoppingListInputNumberProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <div className='relative flex flex-col gap-y-1'>
      <label htmlFor={label} className='text-sm'>
        {label}
      </label>
      <input
        type='number'
        id={label}
        name={label}
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
        first-child:text-gray-500 dark:first-child:text-[#666]
      '
      />
    </div>
  );
};

export { ShoppingListInputNumber };
