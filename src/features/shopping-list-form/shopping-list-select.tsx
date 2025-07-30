import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CATEGORIES } from '@/features/types';

interface ShoppingListSelectProps {
  value: string;
  label: string;
  onChange: (value: string) => void;
  options?: string[] | typeof CATEGORIES;
}

const ShoppingListSelect: React.FC<ShoppingListSelectProps> = ({
  value,
  onChange,
  options = [],
  label,
}) => {
  return (
    <div className='relative flex flex-col gap-y-1'>
      <label htmlFor={label} className='text-sm'>
        {label}
      </label>
      <Select
        id={label}
        value={value || undefined}
        onChange={onChange}
        placeholder='Select'
        suffixIcon={<DownOutlined className='!text-gray-500 !dark:text-[#999]' />}
        className='custom-ant-select'
        options={options.map((option) => ({
          label: option,
          value: option,
        }))}
        style={{ width: 180 }}
        popupMatchSelectWidth={false}
      />
    </div>
  );
};

export { ShoppingListSelect };
