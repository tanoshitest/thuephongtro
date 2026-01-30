import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'outline';
  className?: string;
  customLabel?: string;
}

const statusStyles: Record<string, string> = {
  // General statuses
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-muted',
  pending: 'bg-warning/10 text-warning border-warning/20',
  
  // Payment statuses
  paid: 'bg-success/10 text-success border-success/20',
  overdue: 'bg-destructive/10 text-destructive border-destructive/20',
  
  // Maintenance statuses
  in_progress: 'bg-info/10 text-info border-info/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-muted text-muted-foreground border-muted',
  
  // Visitor statuses
  checked_in: 'bg-success/10 text-success border-success/20',
  checked_out: 'bg-muted text-muted-foreground border-muted',
  
  // Expense statuses
  approved: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  
  // Lease statuses
  expired: 'bg-destructive/10 text-destructive border-destructive/20',
  
  // Property statuses
  maintenance: 'bg-warning/10 text-warning border-warning/20',
  
  // Priority levels
  low: 'bg-muted text-muted-foreground border-muted',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  urgent: 'bg-destructive text-destructive-foreground border-destructive',
};

const statusLabels: Record<string, string> = {
  active: 'Đang hoạt động',
  inactive: 'Không hoạt động',
  pending: 'Chờ xử lý',
  paid: 'Đã thanh toán',
  overdue: 'Quá hạn',
  in_progress: 'Đang xử lý',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
  checked_in: 'Đã vào',
  checked_out: 'Đã ra',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
  expired: 'Hết hạn',
  maintenance: 'Bảo trì',
  low: 'Thấp',
  medium: 'Trung bình',
  high: 'Cao',
  urgent: 'Khẩn cấp',
};

export function StatusBadge({ status, variant = 'default', className, customLabel }: StatusBadgeProps) {
  const style = statusStyles[status] || statusStyles.pending;
  const label = customLabel || statusLabels[status] || status;

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      style,
      className
    )}>
      {label}
    </span>
  );
}
