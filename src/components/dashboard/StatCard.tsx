import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'destructive';
    subtext?: string;
    className?: string;
}

export function StatCard({ title, value, icon, color, subtext, className }: StatCardProps) {
    const getColors = (c: string) => {
        switch (c) {
            case 'primary': return 'bg-primary/10 text-primary';
            case 'secondary': return 'bg-secondary/10 text-secondary';
            case 'success': return 'bg-success/10 text-success';
            case 'warning': return 'bg-warning/10 text-warning';
            case 'info': return 'bg-info/10 text-info';
            case 'destructive': return 'bg-destructive/10 text-destructive';
            default: return 'bg-primary/10 text-primary';
        }
    };

    return (
        <div className={cn("bg-card p-6 rounded-lg border border-border flex items-start justify-between shadow-sm", className)}>
            <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
                {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
            </div>
            <div className={cn("p-3 rounded-lg", getColors(color))}>
                {icon}
            </div>
        </div>
    );
}
