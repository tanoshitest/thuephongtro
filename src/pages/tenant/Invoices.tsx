import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { payments, formatCurrency, formatDate } from '@/data/mockData';
import { Search, Filter, Download, Receipt, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TenantInvoices() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock current logged-in tenant
    const currentTenantId = 'T001';
    const myInvoices = payments.filter(p => p.tenantName === 'Nguyễn Văn Minh'); // Filtering by name for mock demo

    const filteredInvoices = myInvoices.filter(inv =>
        inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout
            role="tenant"
            title="Hóa đơn của tôi"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/tenant' },
                { label: 'Hóa đơn' }
            ]}
        >
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Cần thanh toán</p>
                        <h3 className="text-2xl font-bold text-destructive">
                            {formatCurrency(myInvoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0))}
                        </h3>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Đã thanh toán (Tháng này)</p>
                        <h3 className="text-2xl font-bold text-success">
                            {formatCurrency(myInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0))}
                        </h3>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between gap-4 bg-card p-4 rounded-lg border border-border">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Tìm hóa đơn..."
                            className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-full md:w-80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            <Filter className="h-4 w-4" />
                            <span>Bộ lọc</span>
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredInvoices.map(inv => (
                        <div key={inv.id} className="bg-card rounded-lg border border-border p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-4 flex-1">
                                <div className={cn("p-3 rounded-full bg-muted",
                                    inv.status === 'paid' ? "bg-success/10 text-success" :
                                        inv.status === 'pending' ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                                )}>
                                    <Receipt className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">{inv.type === 'rent' ? 'Tiền thuê nhà' : 'Tiền dịch vụ'}</h4>
                                    <p className="text-sm text-muted-foreground">Mã hóa đơn: <span className="font-mono">{inv.id}</span></p>
                                    <p className="text-xs text-muted-foreground mt-1">Hạn nộp: {formatDate(inv.dueDate)}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className="text-lg font-bold">{formatCurrency(inv.amount)}</span>
                                <span className={cn(
                                    "px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1",
                                    inv.status === 'paid' && "bg-success/10 text-success border-success/20",
                                    inv.status === 'pending' && "bg-warning/10 text-warning border-warning/20",
                                    inv.status === 'overdue' && "bg-destructive/10 text-destructive border-destructive/20",
                                )}>
                                    {inv.status === 'paid' ? <><CheckCircle className="h-3 w-3" /> Đã thanh toán</> :
                                        inv.status === 'pending' ? <><Clock className="h-3 w-3" /> Chờ thanh toán</> : 'Quá hạn'}
                                </span>
                                {inv.status !== 'paid' && (
                                    <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors w-full">
                                        Thanh toán ngay
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
