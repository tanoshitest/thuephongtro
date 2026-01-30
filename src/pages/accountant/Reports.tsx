import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { payments, expenses } from '@/data/mockData';
import { PieChart, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function AccountantReports() {
    const totalRevenue = payments.reduce((sum, p) => p.status === 'paid' ? sum + p.amount : sum, 0);
    const totalExpense = expenses.reduce((sum, e) => e.status === 'approved' ? sum + e.amount : sum, 0);
    const netIncome = totalRevenue - totalExpense;

    return (
        <DashboardLayout
            role="accountant"
            title="Báo cáo tài chính"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/accountant' },
                { label: 'Báo cáo' }
            ]}
        >
            <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard title="Tổng doanh thu" value={`${(totalRevenue / 1000000).toFixed(1)}M`} icon={<TrendingUp className="h-4 w-4" />} color="success" />
                    <StatCard title="Tổng chi phí" value={`${(totalExpense / 1000000).toFixed(1)}M`} icon={<TrendingDown className="h-4 w-4" />} color="destructive" />
                    <StatCard title="Lợi nhuận ròng" value={`${(netIncome / 1000000).toFixed(1)}M`} icon={<DollarSign className="h-4 w-4" />} color="primary" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="font-semibold text-lg mb-4">Cơ cấu doanh thu</h3>
                        <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border border-border border-dashed">
                            <div className="text-center text-muted-foreground">
                                <PieChart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p>Biểu đồ cơ cấu doanh thu (Demo)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="font-semibold text-lg mb-4">Dòng tiền theo tháng</h3>
                        <div className="h-64 flex items-end justify-between px-4 gap-2 border-b border-l border-border pb-2 pl-2">
                            {[40, 60, 45, 70, 50, 80].map((h, i) => (
                                <div key={i} className="w-full bg-primary/20 rounded-t relative group" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100">{h}M</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground px-4">
                            <span>Thg 8</span>
                            <span>Thg 9</span>
                            <span>Thg 10</span>
                            <span>Thg 11</span>
                            <span>Thg 12</span>
                            <span>Thg 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
