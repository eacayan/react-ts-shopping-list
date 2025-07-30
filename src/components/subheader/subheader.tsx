import { BarChartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import { ShoppingListChart } from '@/features';

const Subheader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className='flex items-center justify-between w-full px-6 py-4'>
        <div className='flex'>
          <ShoppingCartOutlined className='text-2xl' />
          <h1 className='font-semibold text-xl pl-3'>Shopping List Application</h1>
        </div>

        <button
          className='
            appearance-none
            bg-white dark:bg-dark
            border border-gray-300 dark:border-[#333]
            text-gray-900 dark:text-[#e5e5e5]
            rounded-lg
            px-4 py-2.5
            text-sm
            cursor-pointer
            outline-none
            transition-colors
            hover:border-gray-400 dark:hover:border-[#555]
            focus:border-indigo-500 dark:focus:border-[#666]
            focus:ring-0
            min-w-[130px]
            flex items-center gap-1
          '
          onClick={() => setIsModalOpen(true)}
        >
          <BarChartOutlined />
          <span>View Report</span>
        </button>
      </section>

      <Modal
        title='Report'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={900}
        className='custom-modal'
      >
        <ShoppingListChart />
      </Modal>
    </>
  );
};

export { Subheader };
