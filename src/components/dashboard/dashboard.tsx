import { FETCH_SIZE, fetchData } from '@/api/helpers';
import {
  ExportToExcel,
  ShoppingListFilterCategory,
  ShoppingListFilterSubcategory,
  ShoppingListForm,
  ShoppingListSearch,
  ShoppingListTable,
} from '@/features';
import { ShoppingListApiResponse } from '@/features/types';
import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';
import { useShoppingListStore } from '@/store/useShoppingListStore';

const Dashboard: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [sorting] = useState<SortingState>([]);
  const { allData, setAllData, setFilteredData } = useShoppingListStore();

  const { data } = useInfiniteQuery<ShoppingListApiResponse>({
    queryKey: ['item', sorting],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * FETCH_SIZE;
      const fetchedData = await fetchData(start);
      return fetchedData;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const flatData = useMemo(() => data?.pages?.flatMap((page) => page.data) ?? [], [data]);
  const itemCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;

  useEffect(() => {
    setAllData(flatData);
  }, [flatData, setAllData]);

  const filteredData = useMemo(() => {
    let filtered = [...flatData];

    if (categoryFilter) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    if (subcategoryFilter) {
      filtered = filtered.filter(
        (item) => item.subcategory.toLowerCase() === subcategoryFilter.toLowerCase(),
      );
    }

    if (globalFilter) {
      const search = globalFilter.toLowerCase();
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(search));
    }

    return filtered;
  }, [flatData, categoryFilter, subcategoryFilter, globalFilter]);

  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData, setFilteredData]);

  const dataToExport = useMemo(() => {
    return filteredData.map((item) => ({
      Name: item.name,
      Category: item.category,
      'Sub Category': item.subcategory,
      Quantity: item.qty,
      Price: item.price,
      Total: item.qty * item.price,
      Date: item.date,
    }));
  }, [filteredData]);

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setSubcategoryFilter('');
  };

  return (
    <section>
      <ShoppingListForm />
      <div className='flex justify-between items-center w-full'>
        <h2 className='font-bold text-lg pl-4'>{itemCount} Items</h2>
        <div className='flex gap-4 items-center pr-4'>
          <p className='whitespace-nowrap'>Filter By:</p>
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
      <ShoppingListTable data={filteredData} globalFilter={globalFilter} />
    </section>
  );
};

export { Dashboard };
