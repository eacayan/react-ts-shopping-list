import { ShoppingListTableProps, ShoppingListFormInput } from '@/features/types';
import { useShoppingListStore } from '@/store/useShoppingListStore';
import { ArrowDownOutlined, ArrowsAltOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';

const columnHelper = createColumnHelper<ShoppingListFormInput>();

const columns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    header: 'Item Name',
    cell: (props) => props.getValue(),
    sortingFn: 'alphanumericCaseSensitive',
  }),
  columnHelper.accessor((row) => row.category, {
    id: 'category',
    header: 'Category',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor((row) => row.subcategory, {
    id: 'subcategory',
    header: 'Sub Category',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor((row) => row.qty, {
    id: 'quantity',
    header: 'Quantity',
    cell: (props) => props.getValue(),
    sortingFn: 'basic',
  }),
  columnHelper.accessor((row) => row.price, {
    id: 'price',
    header: 'Price',
    cell: (props) => `$${props.getValue()}`,
    sortingFn: 'basic',
  }),
  columnHelper.display({
    id: 'total',
    header: 'Total',
    cell: (props) => `$${(props.row.original.price * props.row.original.qty).toFixed(2)}`,
    sortingFn: 'basic',
  }),
  columnHelper.accessor((row) => row.date, {
    id: 'date',
    header: 'Date',
    cell: (props) => new Date(props.getValue()).toLocaleDateString(),
  }),
];

const ShoppingListTable: React.FC<ShoppingListTableProps> = ({ globalFilter = '', data }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { allData, setAllData } = useShoppingListStore();

  const dataWithTotal = useMemo(() => {
    return data.map((item) => ({
      ...item,
      total: item.price * item.qty,
    }));
  }, [data]);

  const globalFilterFn: FilterFn<ShoppingListFormInput> = useMemo(
    () => (row, _, filterValue) => {
      const search = filterValue.toLowerCase();
      const name = row.getValue('name')?.toString().toLowerCase() || '';
      return name.includes(search);
    },
    [],
  );

  const table = useReactTable({
    data: dataWithTotal,
    columns: columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    globalFilterFn,
  });
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 60,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0; // pushes rows down to visible area
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0; // maintain scrollbar height

  const filteredRowsCount = table.getFilteredRowModel().rows.length;
  const totalRowsCount = data.length;

  return (
    <div className='mt-5'>
      {globalFilter && (
        <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
          Showing {filteredRowsCount} of {totalRowsCount} items
        </div>
      )}

      <div
        className='overflow-y-auto relative h-[500px] border border-gray-200 dark:border-gray-700'
        ref={tableContainerRef}
      >
        <table className='w-full table-fixed'>
          <thead className='bg-gray-50 dark:bg-[#1c1c1c] sticky top-0 z-10'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='text-left pl-4 pr-2 py-3 font-medium text-gray-700 dark:text-gray-300'
                  >
                    <div
                      className='flex items-center justify-between gap-2 cursor-pointer hover:text-primary transition-colors'
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className='text-gray-400'>
                        {{
                          asc: <ArrowUpOutlined className='w-3 h-3' />,
                          desc: <ArrowDownOutlined className='w-3 h-3' />,
                        }[header.column.getIsSorted() as string] ?? (
                          <ArrowsAltOutlined className='w-3 h-3' />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td colSpan={columns.length} style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {rows.length > 0 ? (
              virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                if (!row) return null;

                return (
                  <tr
                    key={row.id}
                    data-index={row.index}
                    className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className='pl-4 pr-2 py-3'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className='text-center py-8 text-gray-500 dark:text-gray-400'
                >
                  No items to display
                </td>
              </tr>
            )}
            {paddingBottom > 0 && (
              <tr>
                <td colSpan={columns.length} style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ShoppingListTable };
