import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from './button';
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
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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
        {/* gaps between rows */}
        <table className="min-w-full border-separate border-spacing-y-3 text-left">
          <thead>
            <tr className="bg-[#F5F7F9]">
              {columns.map(column => (
                <th
                  key={String(column.key)}
                  className="h-16 px-6 py-3 text-left text-lg font-normal text-[#000424]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, rowIndex) => (
              // group so we can hover all cells together
              <tr key={rowIndex} className="group">
                {columns.map((column, colIdx) => (
                  <td
                    key={String(column.key)}
                    className={[
                      'px-6 py-3 text-base text-[#686973] transition-colors',
                      // outer-only borders (light gray)
                      'border-t border-b border-[#E4E3E8]',
                      colIdx === 0
                        ? 'first:overflow-hidden first:rounded-l-lg first:border-l'
                        : '',
                      colIdx === columns.length - 1
                        ? 'last:overflow-hidden last:rounded-r-lg last:border-r'
                        : '',
                      // row hover effect
                      'group-hover:bg-gray-50',
                    ].join(' ')}
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
      <div className="flex flex-col items-start justify-between gap-4 border-gray-300 px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Current Page Input */}
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={e => {
              const page = Number(e.target.value);
              if (!isNaN(page) && page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
            className="h-8 w-10 rounded border border-gray-300 text-center text-sm text-[#000424] focus:border-[#000424] focus:outline-none"
          />

          {/* Info Text */}
          <div className="text-sm text-[#686973]">
            Showing {startIndex + 1} - {Math.min(endIndex, data.length)} of{' '}
            {data.length}
          </div>
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
