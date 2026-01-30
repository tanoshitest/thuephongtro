import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { payments, expenses, formatCurrency, formatDate } from '@/data/mockData';
import { Search, Filter, Download, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { cn } from '@/lib/utils';

export default function Finance() {
    const [activeTab, setActiveTab] = useState<'income' | 'expenses'>('income');
    const [searchTerm, setSearchTerm] = useState('');

    const totalIncome = payments.reduce((sum, p) => p.status === 'paid' ? sum + p.amount : sum, 0);
    const totalExpense = expenses.reduce((sum, e) => e.status === 'approved' ? sum + e.amount : sum, 0);
    const netProfit = totalIncome - totalExpense;

    const filteredData = activeTab === 'income'
        ? payments.filter(p => p.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) || p.property.toLowerCase().includes(searchTerm.toLowerCase()))
        : expenses.filter(e => e.description.toLowerCase().includes(searchTerm.toLowerCase()) || e.category.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <DashboardLayout
            role="admin"
            title="Quản lý tài chính"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/admin' },
                { label: 'Tài chính' }
            ]}
        >
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard
                        title="Tổng thu"
                        value={formatCurrency(totalIncome)}
                        icon={<TrendingUp className="h-4 w-4" />}
                        color="success"
                        subtext="Doanh thu thực tế"
                    />
                    <StatCard
                        title="Tổng chi"
                        value={formatCurrency(totalExpense)}
                        icon={<TrendingDown className="h-4 w-4" />}
                        color="destructive"
                        subtext="Chi phí đã duyệt"
                    />
                    <StatCard
                        title="Lợi nhuận ròng"
                        value={formatCurrency(netProfit)}
                        icon={<DollarSign className="h-4 w-4" />}
                        color={netProfit >= 0 ? "primary" : "destructive"}
                        subtext="Thu - Chi"
                    />
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between gap-4 bg-card p-4 rounded-lg border border-border">
                    <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
                        <button
                            onClick={() => setActiveTab('income')}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                activeTab === 'income' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Khoản thu
                        </button>
                        <button
                            onClick={() => setActiveTab('expenses')}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                activeTab === 'expenses' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Khoản chi
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors">
                            <Download className="h-4 w-4" />
                            <span>Xuất báo cáo</span>
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Mã GD</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">
                                        {activeTab === 'income' ? 'Người nộp' : 'Hạng mục'}
                                    </th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Chi tiết</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Số tiền</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Thời gian</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredData.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-accent/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs">{item.id}</td>
                                        <td className="px-6 py-4 font-medium">
                                            {activeTab === 'income' ? item.tenantName : item.category}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {activeTab === 'income' ? `${item.type} - ${item.property}` : item.description}
                                        </td>
                                        <td className={cn("px-6 py-4 font-medium", activeTab === 'income' ? "text-success" : "text-destructive")}>
                                            {activeTab === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-muted-foreground">
                                            {formatDate(activeTab === 'income' ? item.paidDate || item.dueDate : item.date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                (item.status === 'paid' || item.status === 'approved') && "bg-success/10 text-success border-success/20",
                                                (item.status === 'pending') && "bg-warning/10 text-warning border-warning/20",
                                                (item.status === 'overdue' || item.status === 'rejected') && "bg-destructive/10 text-destructive border-destructive/20",
                                            )}>
                                                {item.status === 'paid' ? 'Đã thanh toán' :
                                                    item.status === 'approved' ? 'Đã duyệt' :
                                                        item.status === 'pending' ? 'Chờ xử lý' :
                                                            item.status === 'overdue' ? 'Quá hạn' : 'Từ chối'}
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
