import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { maintenanceRequests } from '@/data/mockData';
import { Search, Filter, Plus, Clock, CheckCircle, AlertCircle, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Maintenance() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPriority, setFilterPriority] = useState<string>('all');

    const filteredRequests = maintenanceRequests.filter(req => {
        const matchesSearch = req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.property.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = filterPriority === 'all' || req.priority === filterPriority;
        return matchesSearch && matchesPriority;
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'text-destructive bg-destructive/10 border-destructive/20';
            case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    const StatusColumn = ({ title, status, icon: Icon, color }: { title: string, status: string, icon: any, color: string }) => {
        const items = filteredRequests.filter(r =>
            status === 'pending' ? r.status === 'pending' :
                status === 'in_progress' ? r.status === 'in_progress' :
                    r.status === 'completed' || r.status === 'cancelled'
        );

        return (
            <div className="flex-1 bg-muted/30 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <div className={cn("p-2 rounded-md", color)}>
                        <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-sm uppercase tracking-wide">{title}</h3>
                    <span className="ml-auto text-xs font-mono bg-background px-2 py-0.5 rounded-full border border-border">
                        {items.length}
                    </span>
                </div>

                <div className="space-y-3">
                    {items.map(req => (
                        <div key={req.id} className="bg-card p-3 rounded-md border border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <span className={cn("text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border", getPriorityColor(req.priority))}>
                                    {req.priority}
                                </span>
                                <span className="text-xs text-muted-foreground">{req.createdAt}</span>
                            </div>
                            <h4 className="font-medium text-sm mb-1 line-clamp-2">{req.description}</h4>
                            <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                                <Wrench className="h-3 w-3" />
                                {req.category}
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-border">
                                <div className="text-xs font-medium">{req.property}</div>
                                <div className="text-xs text-muted-foreground">{req.unit}</div>
                            </div>
                            {req.assignedTo && (
                                <div className="mt-2 text-xs text-primary flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    {req.assignedTo}
                                </div>
                            )}
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground text-xs italic">
                            Không có yêu cầu nào
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <DashboardLayout
            role="admin"
            title="Quản lý bảo trì"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/admin' },
                { label: 'Bảo trì' }
            ]}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm yêu cầu..."
                                className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="border border-input rounded-md bg-background py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                        >
                            <option value="all">Tất cả mức độ</option>
                            <option value="urgent">Khẩn cấp</option>
                            <option value="high">Cao</option>
                            <option value="medium">Trung bình</option>
                            <option value="low">Thấp</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Tạo yêu cầu</span>
                    </button>
                </div>

                {/* Board */}
                <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
                    <StatusColumn
                        title="Chờ xử lý"
                        status="pending"
                        icon={AlertCircle}
                        color="bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                    />
                    <StatusColumn
                        title="Đang thực hiện"
                        status="in_progress"
                        icon={Clock}
                        color="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    />
                    <StatusColumn
                        title="Hoàn thành"
                        status="completed"
                        icon={CheckCircle}
                        color="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
