import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { announcements, formatDate } from '@/data/mockData';
import { Bell, Megaphone, Calendar, Users, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ReceptionistAnnouncements() {
    return (
        <DashboardLayout
            role="receptionist"
            title="Thông báo cư dân"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/receptionist' },
                { label: 'Thông báo' }
            ]}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-sm">Quản lý và gửi thông báo đến cư dân.</p>
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Tạo thông báo</span>
                    </button>
                </div>

                <div className="grid gap-4">
                    {announcements.map(ann => (
                        <div key={ann.id} className="bg-card rounded-lg border border-border p-5 relative overflow-hidden group">
                            <div className={cn("absolute left-0 top-0 bottom-0 w-1",
                                ann.priority === 'urgent' ? 'bg-destructive' :
                                    ann.priority === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                            )}></div>

                            <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        {ann.priority === 'urgent' && <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Khẩn cấp</span>}
                                        <h3 className="font-semibold text-lg">{ann.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{ann.content}</p>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(ann.date)}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="h-3 w-3" />
                                            {ann.recipients === 'all' ? 'Toàn hệ thống' : ann.recipients}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Megaphone className="h-3 w-3" />
                                            {ann.sender}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="px-3 py-1.5 border border-border rounded text-sm hover:bg-muted">Sửa</button>
                                    <button className="px-3 py-1.5 border border-border rounded text-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30">Xóa</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
