import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CATEGORIES } from '@/features/types';

interface ShoppingListFilterCategoryProps {
  value: string;
  onChange: (value: string) => void;
}

const ShoppingListFilterCategory: React.FC<ShoppingListFilterCategoryProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className='relative flex flex-col'>
      <label htmlFor='category' className='sr-only'>
        Category
      </label>
      <Select
        id='category'
        value={value || undefined}
        onChange={onChange}
        placeholder='Select Category'
        suffixIcon={
          <DownOutlined className='text-[var(--color-text-light-muted)] dark:text-[var(--color-text-dark-muted)]' />
        }
        className='custom-ant-select w-[200px]'
        options={CATEGORIES.map((category) => ({
          value: category.toLowerCase(),
          label: category,
        }))}
      />
    </div>
  );
};

export { ShoppingListFilterCategory };
