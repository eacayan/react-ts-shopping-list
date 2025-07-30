import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { ShoppingListFormInput } from '@/features/types';

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

    return Array.from(new Set(filteredData.map((item) => item.subcategory))).sort();
  }, [data, selectedCategory]);

  return (
    <div className='relative'>
      <label htmlFor='subcategory' className='sr-only'>
        Subcategory
      </label>
      <Select
        id='subcategory'
        value={value || undefined}
        onChange={onChange}
        placeholder='Select Subcategory'
        disabled={subcategories.length === 0}
        suffixIcon={
          <DownOutlined className='text-[var(--color-text-light-muted)] dark:text-[var(--color-text-dark-muted)]' />
        }
        className='custom-ant-select w-[200px]'
        options={subcategories.map((sub) => ({
          value: sub,
          label: sub,
        }))}
      />
    </div>
  );
};

export { ShoppingListFilterSubcategory };
