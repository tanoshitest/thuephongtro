import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  className,
  onRowClick,
  emptyMessage = 'Không có dữ liệu'
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={cn('bg-card rounded-lg border border-border', className)}>
        <div className="p-8 text-center text-muted-foreground">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-card rounded-lg border border-border overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className={column.className}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onRowClick?.(item)}
                className={cn(onRowClick && 'cursor-pointer')}
              >
                {columns.map((column) => (
                  <td key={`${item.id}-${String(column.key)}`} className={column.className}>
                    {column.render 
                      ? column.render(item) 
                      : String(item[column.key as keyof T] ?? '-')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
        <p className="text-sm text-muted-foreground">
          Hiển thị <span className="font-medium">{data.length}</span> kết quả
        </p>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-muted disabled:opacity-50" disabled>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-muted-foreground">Trang 1 / 1</span>
          <button className="p-1.5 rounded-md hover:bg-muted disabled:opacity-50" disabled>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
