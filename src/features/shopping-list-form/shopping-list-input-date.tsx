import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';

interface ShoppingListInputDateProps {
  value: string;
  onChange: (value: string) => void;
}

const ShoppingListInputDate: React.FC<ShoppingListInputDateProps> = ({ value, onChange }) => {
  return (
    <div className='relative flex flex-col gap-y-1'>
      <label htmlFor='date' className='text-sm'>
        Date
      </label>
      <DatePicker
        id='date'
        value={value}
        onChange={onChange}
        allowClear={false}
        suffixIcon={<CalendarOutlined className='!text-gray-500 !dark:text-[#999]' />}
        className='custom-date-picker'
        style={{ width: '100%' }}
        inputReadOnly
      />
    </div>
  );
};

export { ShoppingListInputDate };
