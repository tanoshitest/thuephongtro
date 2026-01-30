import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { payments, formatCurrency, formatDate } from '@/data/mockData';
import { Search, Filter, Download, ArrowDownLeft, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccountantPayments() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredPayments = payments.filter(p => {
        const matchesSearch = p.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <DashboardLayout
            role="accountant"
            title="Quản lý thu tiền"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/accountant' },
                { label: 'Thu tiền' }
            ]}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between gap-4 bg-card p-4 rounded-lg border border-border">
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Tìm mã GD, người nộp, phòng..."
                                className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-full md:w-80"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <select
                                className="border border-input rounded-md bg-background py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="paid">Đã thu</option>
                                <option value="pending">Chờ thanh toán</option>
                                <option value="overdue">Quá hạn</option>
                            </select>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Xuất phiếu thu</span>
                    </button>
                </div>

                {/* Payments Table */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Mã GD</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Khách thuê</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Khoản thu</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Số tiền</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Thời gian</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Trạng thái</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Phương thức</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredPayments.map((p) => (
                                    <tr key={p.id} className="hover:bg-accent/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs">{p.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{p.tenantName}</div>
                                            <div className="text-xs text-muted-foreground">{p.unit} - {p.property}</div>
                                        </td>
                                        <td className="px-6 py-4 capitalize">{p.type === 'rent' ? 'Tiền thuê nhà' : p.type === 'utility' ? 'Điện nước' : 'Phí khác'}</td>
                                        <td className="px-6 py-4 font-medium text-success">+{formatCurrency(p.amount)}</td>
                                        <td className="px-6 py-4 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                {p.paidDate ? formatDate(p.paidDate) : formatDate(p.dueDate)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                p.status === 'paid' && "bg-success/10 text-success border-success/20",
                                                p.status === 'pending' && "bg-warning/10 text-warning border-warning/20",
                                                p.status === 'overdue' && "bg-destructive/10 text-destructive border-destructive/20",
                                            )}>
                                                {p.status === 'paid' ? 'Đã thu' : p.status === 'pending' ? 'Chờ thu' : 'Quá hạn'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {p.method ? (
                                                <span className="text-xs border px-2 py-1 rounded bg-muted/50 uppercase">{p.method.replace('_', ' ')}</span>
                                            ) : <span className="text-xs text-muted-foreground">-</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
