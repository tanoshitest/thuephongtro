import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { maintenanceRequests } from '@/data/mockData';
import { Plus, Wrench, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TenantMaintenance() {
    const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');

    // Mock current tenant
    const myRequests = maintenanceRequests.filter(req => req.tenantName === 'Nguyễn Văn Minh');

    const displayRequests = activeTab === 'open'
        ? myRequests.filter(r => r.status !== 'completed' && r.status !== 'cancelled')
        : myRequests.filter(r => r.status === 'completed' || r.status === 'cancelled');

    return (
        <DashboardLayout
            role="tenant"
            title="Báo cáo sự cố"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/tenant' },
                { label: 'Báo sự cố' }
            ]}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex bg-muted rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('open')}
                            className={cn("px-4 py-2 rounded-md text-sm font-medium transition-all", activeTab === 'open' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                        >
                            Đang xử lý
                        </button>
                        <button
                            onClick={() => setActiveTab('closed')}
                            className={cn("px-4 py-2 rounded-md text-sm font-medium transition-all", activeTab === 'closed' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                        >
                            Lịch sử
                        </button>
                    </div>

                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span className="hidden md:inline">Gửi yêu cầu mới</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {displayRequests.length > 0 ? displayRequests.map(req => (
                        <div key={req.id} className="bg-card rounded-lg border border-border p-5 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded uppercase border",
                                        req.priority === 'urgent' ? "bg-destructive/10 text-destructive border-destructive/20" :
                                            req.priority === 'high' ? "bg-orange-500/10 text-orange-600 border-orange-200" :
                                                "bg-blue-500/10 text-blue-600 border-blue-200"
                                    )}>
                                        {req.priority}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{req.createdAt}</span>
                                </div>
                                <span className={cn("text-sm font-medium flex items-center gap-1.5",
                                    req.status === 'completed' ? "text-success" :
                                        req.status === 'in_progress' ? "text-blue-600" : "text-orange-600"
                                )}>
                                    {req.status === 'completed' ? <CheckCircle className="h-4 w-4" /> :
                                        req.status === 'in_progress' ? <Wrench className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    {req.status === 'completed' ? 'Đã hoàn thành' :
                                        req.status === 'in_progress' ? 'Đang sửa chữa' : 'Đang chờ tiếp nhận'}
                                </span>
                            </div>

                            <h3 className="font-semibold text-lg mb-2">{req.description}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="capitalize bg-muted px-2 py-1 rounded text-xs">{req.category === 'hvac' ? 'Điện lạnh' : req.category === 'plumbing' ? 'Điện nước' : req.category}</span>
                                {req.assignedTo && <span>• Được xử lý bởi: {req.assignedTo}</span>}
                            </p>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-card rounded-lg border border-border text-muted-foreground">
                            <Wrench className="h-10 w-10 mx-auto mb-3 opacity-20" />
                            <p>Bạn không có yêu cầu nào trong mục này</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
