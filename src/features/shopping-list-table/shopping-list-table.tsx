import mockData from '@/api/mock-data.json';
import { ShoppingListFormInput, ShoppingListTableRows } from '@/features/types';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from 'antd';
import { useState } from 'react';

const columns = [{}];
const columnHelper = createColumnHelper<ShoppingListTableRows>();
const defaultColumns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    header: 'Item Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.category, {
    id: 'category',
    header: 'Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.subcategory, {
    id: 'subcategory',
    header: 'Sub Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.qty, {
    id: 'quantity',
    header: 'Quantity',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.price, {
    id: 'price',
    header: 'Price',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.total, {
    id: 'total',
    header: 'Total',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.date, {
    id: 'date',
    header: 'Date',
    cell: (info) => info.getValue(),
  }),
];

const ShoppingListTable: React.FC = () => {
  const [data, setData] = useState<ShoppingListFormInput[]>(mockData as ShoppingListFormInput[]);
  const table = useReactTable({
    data,
    columns: defaultColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log('table :>> ', table);
  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
};

export { ShoppingListTable };
