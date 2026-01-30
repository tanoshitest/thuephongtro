import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { properties, payments } from '@/data/mockData';
import { BarChart, PieChart, LineChart, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

export default function Reports() {
    const totalRevenue = payments.reduce((sum, p) => p.status === 'paid' ? sum + p.amount : sum, 0);
    const totalUnits = properties.reduce((sum, p) => sum + p.totalUnits, 0);
    const occupiedUnits = properties.reduce((sum, p) => sum + p.occupiedUnits, 0);
    const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100);

    return (
        <DashboardLayout
            role="admin"
            title="Báo cáo & Thống kê"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/admin' },
                { label: 'Báo cáo' }
            ]}
        >
            <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <StatCard title="Tổng doanh thu" value={`${(totalRevenue / 1000000).toLocaleString()}M`} icon={<ArrowUpRight className="h-4 w-4" />} color="primary" />
                    <StatCard title="Tỷ lệ lấp đầy" value={`${occupancyRate}%`} icon={<PieChart className="h-4 w-4" />} color="success" />
                    <StatCard title="Tổng số phòng" value={totalUnits} icon={<LayoutDashboard className="h-4 w-4" />} color="info" />
                    <StatCard title="Phòng đã thuê" value={occupiedUnits} icon={<LayoutDashboard className="h-4 w-4" />} color="warning" />
                </div>

                {/* Charts Section (Mock UI) */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Revenue Chart */}
                    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <BarChart className="h-5 w-5 text-primary" />
                                Doanh thu theo tháng
                            </h3>
                            <select className="text-sm border rounded px-2 py-1 bg-background">
                                <option>6 tháng gần đây</option>
                                <option>Năm nay</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-2 px-2">
                            {[65, 59, 80, 81, 56, 95, 72, 85].map((h, i) => (
                                <div key={i} className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}M
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground px-2">
                            <span>Tháng 6</span>
                            <span>Tháng 7</span>
                            <span>Tháng 8</span>
                            <span>Tháng 9</span>
                            <span>Tháng 10</span>
                            <span>Tháng 11</span>
                            <span>Tháng 12</span>
                            <span>Tháng 1</span>
                        </div>
                    </div>

                    {/* Occupancy by Property */}
                    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <PieChart className="h-5 w-5 text-success" />
                                Tỷ lệ lấp đầy theo tòa nhà
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {properties.map(p => (
                                <div key={p.id} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{p.name}</span>
                                        <span className="text-muted-foreground">{Math.round((p.occupiedUnits / p.totalUnits) * 100)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-success/80 rounded-full"
                                            style={{ width: `${(p.occupiedUnits / p.totalUnits) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
