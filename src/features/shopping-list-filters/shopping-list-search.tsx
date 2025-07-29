import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

interface ShoppingListSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ShoppingListSearch: React.FC<ShoppingListSearchProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Input
      placeholder='Search'
      prefix={<SearchOutlined className='text-gray-400' />}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      allowClear
      size='small'
      className='hover:border-primary focus:border-primary'
      style={{
        borderRadius: '8px',
      }}
    />
  );
};

export { ShoppingListSearch };
