import { InputNumber } from 'antd';

interface ShoppingListInputNumberProps {
  value: number | string;
  onChange: (value: number | null) => void;
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
      <InputNumber
        id={label}
        value={value as number}
        defaultValue={0}
        onChange={onChange}
        min={0}
        controls={false}
        className='custom-input-number'
      />
    </div>
  );
};

export { ShoppingListInputNumber };
