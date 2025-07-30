import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { TableExportProps } from '@/features/types';
import { FileExcelFilled } from '@ant-design/icons';

interface ExportToExcelProps {
  data: TableExportProps[];
  fileName: string;
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ data, fileName }) => {
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
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
        first-child:text-gray-500 dark:first-child:text-[#666]
        flex items-center gap-1
        '
      onClick={exportToExcel}
    >
      <FileExcelFilled />
      <span>Export Data</span>
    </button>
  );
};

export { ExportToExcel };
