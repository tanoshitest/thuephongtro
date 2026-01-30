import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { maintenanceRequests } from '@/data/mockData';
import { ClipboardList, MapPin, AlertCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MaintenanceNewRequests() {
    const pendingRequests = maintenanceRequests.filter(req => req.status === 'pending');

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-destructive/10 text-destructive border-destructive/20';
            case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-200';
            case 'medium': return 'bg-blue-500/10 text-blue-600 border-blue-200';
            default: return 'bg-muted text-muted-foreground border-border';
        }
    };

    const getCategoryLabel = (category: string) => {
        const labels: Record<string, string> = {
            plumbing: 'Điện nước',
            electrical: 'Điện',
            hvac: 'Điện lạnh',
            appliance: 'Thiết bị',
            structural: 'Kết cấu',
            other: 'Khác'
        };
        return labels[category] || category;
    };

    return (
        <DashboardLayout
            role="maintenance"
            title="Yêu cầu mới"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/maintenance' },
                { label: 'Yêu cầu mới' }
            ]}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="bg-card p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Tổng yêu cầu chờ xử lý</p>
                        <h3 className="text-3xl font-bold text-orange-600">{pendingRequests.length}</h3>
                    </div>
                </div>

                <div className="space-y-4">
                    {pendingRequests.length > 0 ? pendingRequests.map(req => (
                        <div key={req.id} className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-xs font-bold px-2.5 py-1 rounded uppercase border", getPriorityColor(req.priority))}>
                                        {req.priority === 'urgent' ? 'Khẩn cấp' :
                                            req.priority === 'high' ? 'Cao' :
                                                req.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                                    </span>
                                    <span className="text-xs bg-muted px-2 py-1 rounded">{getCategoryLabel(req.category)}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{req.createdAt}</span>
                            </div>

                            <h3 className="font-semibold text-lg mb-2">{req.description}</h3>

                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span className="font-medium text-foreground">{req.unit}</span>
                                    <span>-</span>
                                    <span>{req.property}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Khách thuê: {req.tenantName}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border flex gap-2">
                                <button className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                                    Nhận việc
                                </button>
                                <button className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors text-sm font-medium">
                                    Chi tiết
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-card rounded-lg border border-border text-muted-foreground">
                            <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p>Không có yêu cầu mới nào</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
