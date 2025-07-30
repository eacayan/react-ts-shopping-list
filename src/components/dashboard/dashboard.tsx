import { FETCH_SIZE, fetchData } from '@/api/helpers';
import {
  ExportToExcel,
  ShoppingListFilterCategory,
  ShoppingListFilterSubcategory,
  ShoppingListForm,
  ShoppingListSearch,
  ShoppingListTable,
} from '@/features';
import { ShoppingListApiResponse, TableExportProps } from '@/features/types';
import { useMemo, useState } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';

const Dashboard: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [dataToExport, setDataToExport] = useState<TableExportProps[]>([]);
  const [sorting] = useState<SortingState>([]);

  const { data } = useInfiniteQuery<ShoppingListApiResponse>({
    queryKey: ['item', sorting],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * FETCH_SIZE;
      const fetchedData = await fetchData(start); //pretend api call
      return fetchedData;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const flatData = useMemo(() => data?.pages?.flatMap((page) => page.data) ?? [], [data]);
  const itemCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setSubcategoryFilter('');
  };

  return (
    <section>
      <ShoppingListForm />
      <div className='flex justify-between items-center w-full'>
        <h2 className='font-bold text-lg pl-4'>{itemCount} Items</h2>
        <div className='flex gap-4 pr-4'>
          <p className='whitespace-nowrap self-center'>Filter By:</p>
          <ShoppingListFilterCategory value={categoryFilter} onChange={handleCategoryChange} />
          <ShoppingListFilterSubcategory
            value={subcategoryFilter}
            onChange={setSubcategoryFilter}
            selectedCategory={categoryFilter}
            data={flatData}
          />
          <ShoppingListSearch value={globalFilter} onChange={setGlobalFilter} />
          <ExportToExcel data={dataToExport} fileName='Shopping List Export' />
        </div>
      </div>
      <ShoppingListTable
        data={flatData}
        globalFilter={globalFilter}
        categoryFilter={categoryFilter}
        subcategoryFilter={subcategoryFilter}
        onDataToExportChange={setDataToExport}
      />
    </section>
  );
};

export { Dashboard };
