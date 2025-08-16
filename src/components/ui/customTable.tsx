import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from './button';
import { TABLE_PAGE_SIZES } from '../../constants';
import { TableLoader } from './loaders';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  pageSize?: number;
}

export function CustomTable<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading = false,
  pageSize: initialPageSize = 10,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  if (isLoading) return <TableLoader />;

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page: number) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">No data available</div>
    );
  }

  return (
    <div className="space-y-0">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="bg-[#F8F9FB]">
              {columns.map(column => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-sm font-semibold text-[#000424]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border border-gray-200 transition-colors hover:bg-gray-50"
              >
                {columns.map(column => (
                  <td
                    key={String(column.key)}
                    className="px-6 py-3 text-sm text-[#686973]"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-start justify-between gap-4 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center">
        {/* Page Size */}
        <div className="flex items-center space-x-2">
          <span className="hidden text-sm text-gray-700 sm:inline">Show</span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {TABLE_PAGE_SIZES.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="hidden text-sm text-gray-700 sm:inline">
            entries
          </span>
        </div>

        {/* Info */}
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of{' '}
          {data.length}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="hidden sm:inline-flex"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) pageNum = i + 1;
            else if (currentPage <= 3) pageNum = i + 1;
            else if (currentPage >= totalPages - 2)
              pageNum = totalPages - 4 + i;
            else pageNum = currentPage - 2 + i;

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'primary' : 'outline'}
                size="sm"
                onClick={() => goToPage(pageNum)}
                className="h-8 w-8 p-0 text-xs"
              >
                {pageNum}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="hidden sm:inline-flex"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
