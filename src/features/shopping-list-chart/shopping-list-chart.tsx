import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useShoppingListStore } from '@/store/useShoppingListStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ShoppingListChart: React.FC = () => {
  const { allData, getTotalSpending, getSubcategoryTotals, getHighestCostItem } =
    useShoppingListStore();

  const stats = useMemo(() => {
    const totalSpending = getTotalSpending();
    const highestCostItem = getHighestCostItem();
    const avgCost = allData.length > 0 ? totalSpending / allData.length : 0;

    return {
      totalSpending,
      highestCostItem,
      avgCost,
      itemCount: allData.length,
    };
  }, [allData, getTotalSpending, getHighestCostItem]);

  const chartData = useMemo(() => {
    const subcategoryTotals = getSubcategoryTotals();

    return {
      labels: Object.keys(subcategoryTotals),
      datasets: [
        {
          data: Object.values(subcategoryTotals),
          backgroundColor: '#91CAFF',
          borderColor: '#D9D9D9',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }, [getSubcategoryTotals]);

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value}`;
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='border-border border p-4 rounded-lg'>
          <h3 className='text-md font-semibold text-gray-500 dark:text-gray-400'>Total Spending</h3>
          <p className='text-xl font-semibold text-[#1677ff]'>${stats.totalSpending.toFixed(2)}</p>
          <p className='text-xs text-gray-400 mt-4'>{stats.itemCount} items in total</p>
        </div>

        <div className='border-border border p-4 rounded-lg'>
          <h3 className='text-md font-semibold text-gray-500 dark:text-gray-400'>
            Highest Cost Item
          </h3>
          <p className='text-xl font-semibold text-[#1677ff]'>
            $
            {stats.highestCostItem
              ? (stats.highestCostItem.price * stats.highestCostItem.qty).toFixed(2)
              : '0.00'}
          </p>
          <p className='text-xs text-gray-400 mt-4'>
            {stats.highestCostItem?.name || 'N/A'} Unit/s
          </p>
        </div>

        <div className='border-border border p-4 rounded-lg'>
          <h3 className='text-md font-semibold text-gray-500 dark:text-gray-400'>Average Cost</h3>
          <p className='text-xl font-semibold text-[#1677ff]'>${stats.avgCost.toFixed(2)}</p>
          <p className='text-xs text-gray-400 mt-4'>Per Item</p>
        </div>
      </div>

      <h2 className='font-bold text-xl mb-10'>Sales Report</h2>
      <div className='h-[400px] w-full'>
        {chartData.labels.length > 0 ? (
          <Bar data={chartData} options={chartOptions} className='w-full' />
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            No data available for chart
          </div>
        )}
      </div>
    </>
  );
};

export { ShoppingListChart };
