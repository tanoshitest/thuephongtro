import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Users, 
  DollarSign, 
  Wrench,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Home
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'destructive';
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Users,
  DollarSign,
  Wrench,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  TrendingUp,
  TrendingDown,
};

const colorStyles = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-info/10 text-info',
  destructive: 'bg-destructive/10 text-destructive',
};

export function StatCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  color = 'primary',
  className 
}: StatCardProps) {
  const IconComponent = iconMap[icon] || Building2;
  const isPositiveChange = change && change > 0;
  const isNegativeChange = change && change < 0;

  return (
    <div className={cn('stat-card animate-fade-in', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositiveChange && (
                <TrendingUp className="h-4 w-4 text-success" />
              )}
              {isNegativeChange && (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={cn(
                'text-sm font-medium',
                isPositiveChange && 'text-success',
                isNegativeChange && 'text-destructive',
                !isPositiveChange && !isNegativeChange && 'text-muted-foreground'
              )}>
                {isPositiveChange && '+'}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={cn(
          'p-3 rounded-lg',
          colorStyles[color]
        )}>
          <IconComponent className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
