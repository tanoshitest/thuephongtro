import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { visitors, formatDateTime } from '@/data/mockData';
import { Search, LogIn, LogOut, Clock, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/dashboard/StatCard';

export default function ReceptionistVisitors() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVisitors = visitors.filter(v =>
        v.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.visitingTenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.unit.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeVisitors = visitors.filter(v => v.status === 'checked_in').length;

    return (
        <DashboardLayout
            role="receptionist"
            title="Khách ra vào"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/receptionist' },
                { label: 'Khách ra vào' }
            ]}
        >
            <div className="space-y-6">

                <div className="grid gap-4 md:grid-cols-2">
                    <StatCard
                        title="Khách đang ở trong tòa nhà"
                        value={activeVisitors}
                        icon={<UserCheck className="h-4 w-4" />}
                        color="primary"
                        subtext="Cần kiểm soát"
                    />
                    <button className="h-full border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-primary transition-colors gap-2 p-4">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <LogIn className="h-6 w-6" />
                        </div>
                        <span className="font-medium">Đăng ký khách mới</span>
                    </button>
                </div>

                <div className="flex flex-col gap-4 bg-card p-4 rounded-lg border border-border">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Tìm tên khách, người được thăm..."
                            className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredVisitors.map(visitor => (
                        <div key={visitor.id} className="bg-card rounded-lg border border-border p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-4 flex-1">
                                <div className={cn("p-2 rounded-full", visitor.status === 'checked_in' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground')}>
                                    {visitor.status === 'checked_in' ? <LogIn className="h-5 w-5" /> : <LogOut className="h-5 w-5" />}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{visitor.visitorName} <span className="text-muted-foreground font-normal text-sm">({visitor.visitorPhone})</span></h4>
                                    <p className="text-sm text-muted-foreground">
                                        Thăm: <span className="font-medium text-foreground">{visitor.visitingTenant}</span> - {visitor.unit}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Mục đích: {visitor.purpose}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">Vào:</span>
                                    <span className="font-medium">{formatDateTime(visitor.checkInTime).split(' ')[1]}</span>
                                </div>
                                {visitor.checkOutTime ? (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-muted-foreground">Ra:</span>
                                        <span className="font-medium">{formatDateTime(visitor.checkOutTime).split(' ')[1]}</span>
                                    </div>
                                ) : (
                                    <button className="mt-1 bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 px-3 py-1 rounded text-xs font-medium transition-colors">
                                        Check-out ngay
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
