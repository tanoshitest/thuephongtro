import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { maintenanceRequests } from '@/data/mockData';
import { CheckCircle, MapPin, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MaintenanceCompleted() {
    const completedRequests = maintenanceRequests.filter(req => req.status === 'completed');

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
            title="Hoàn thành"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/maintenance' },
                { label: 'Hoàn thành' }
            ]}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="bg-card p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Tổng công việc hoàn thành</p>
                        <h3 className="text-3xl font-bold text-success">{completedRequests.length}</h3>
                    </div>
                </div>

                <div className="space-y-4">
                    {completedRequests.length > 0 ? completedRequests.map(req => (
                        <div key={req.id} className="bg-card rounded-lg border-l-4 border-l-success border-y border-r border-border p-5 hover:shadow-md transition-shadow opacity-90">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-muted px-2 py-1 rounded">{getCategoryLabel(req.category)}</span>
                                    <span className="flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-1 rounded border border-success/20">
                                        <CheckCircle className="h-3 w-3" />
                                        Đã xong
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground">Tạo: {req.createdAt}</span>
                            </div>

                            <h3 className="font-semibold text-lg mb-2 text-muted-foreground">{req.description}</h3>

                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span className="font-medium">{req.unit}</span>
                                    <span>-</span>
                                    <span>{req.property}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Khách thuê: {req.tenantName}</span>
                                </div>
                                {req.assignedTo && (
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span>Kỹ thuật viên: {req.assignedTo}</span>
                                    </div>
                                )}
                                {req.completedAt && (
                                    <div className="flex items-center gap-2 text-success">
                                        <Calendar className="h-4 w-4" />
                                        <span className="font-medium">Hoàn thành: {req.completedAt}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-border flex gap-2">
                                <button className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors text-sm font-medium">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-card rounded-lg border border-border text-muted-foreground">
                            <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p>Chưa có công việc nào hoàn thành</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
