import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { expenses, formatCurrency, formatDate } from '@/data/mockData';
import { Search, Filter, Plus, ArrowUpRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccountantExpenses() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredExpenses = expenses.filter(e => {
        const matchesSearch = e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <DashboardLayout
            role="accountant"
            title="Quản lý chi phí"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/accountant' },
                { label: 'Chi phí' }
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
                                placeholder="Tìm khoản chi, hạng mục..."
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
                                <option value="approved">Đã duyệt</option>
                                <option value="pending">Chờ duyệt</option>
                                <option value="rejected">Từ chối</option>
                            </select>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Tạo phiếu chi</span>
                    </button>
                </div>

                {/* Expenses Table */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Mã PC</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Hạng mục</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Diễn giải</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Số tiền</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Ngày chi</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Người duyệt</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredExpenses.map((e) => (
                                    <tr key={e.id} className="hover:bg-accent/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs">{e.id}</td>
                                        <td className="px-6 py-4 font-medium">{e.category}</td>
                                        <td className="px-6 py-4 text-muted-foreground line-clamp-1" title={e.description}>{e.description}</td>
                                        <td className="px-6 py-4 font-medium text-destructive">-{formatCurrency(e.amount)}</td>
                                        <td className="px-6 py-4 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                {formatDate(e.date)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs">{e.approvedBy || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                e.status === 'approved' && "bg-success/10 text-success border-success/20",
                                                e.status === 'pending' && "bg-warning/10 text-warning border-warning/20",
                                                e.status === 'rejected' && "bg-destructive/10 text-destructive border-destructive/20",
                                            )}>
                                                {e.status === 'approved' ? 'Đã duyệt' : e.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                                            </span>
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
