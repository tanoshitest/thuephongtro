import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { announcements, formatDate } from '@/data/mockData';
import { Megaphone, Calendar, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TenantAnnouncements() {
    // Mock current tenant property
    const myProperty = 'Sunrise Tower';
    const myAnnouncements = announcements.filter(a => a.recipients === 'all' || a.recipients === myProperty);

    return (
        <DashboardLayout
            role="tenant"
            title="Thông báo"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/tenant' },
                { label: 'Thông báo' }
            ]}
        >
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="space-y-4">
                    {myAnnouncements.map(ann => (
                        <div key={ann.id} className="bg-card rounded-lg border border-border p-5 flex gap-4 hover:shadow-sm transition-shadow">
                            <div className={cn("p-3 rounded-full h-fit flex-shrink-0",
                                ann.priority === 'urgent' ? "bg-destructive/10 text-destructive" :
                                    ann.priority === 'high' ? "bg-orange-500/10 text-orange-600" :
                                        "bg-primary/10 text-primary"
                            )}>
                                {ann.priority === 'urgent' ? <AlertTriangle className="h-6 w-6" /> : <Megaphone className="h-6 w-6" />}
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                                    <h3 className="font-bold text-lg">{ann.title}</h3>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {formatDate(ann.date)}
                                    </span>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-border pl-3">
                                    {ann.content}
                                </p>

                                <div className="pt-2 flex items-center gap-2 text-xs font-medium text-foreground">
                                    <span>Từ: {ann.sender}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
