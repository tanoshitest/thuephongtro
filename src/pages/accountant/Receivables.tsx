import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { payments, formatCurrency, formatDate } from '@/data/mockData';
import { AlertCircle, Clock, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/dashboard/StatCard';

export default function AccountantReceivables() {
    const receivables = payments.filter(p => p.status === 'pending' || p.status === 'overdue');
    const totalReceivable = receivables.reduce((sum, p) => sum + p.amount, 0);
    const overdueAmount = receivables.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

    return (
        <DashboardLayout
            role="accountant"
            title="Quản lý công nợ"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/accountant' },
                { label: 'Công nợ' }
            ]}
        >
            <div className="space-y-6">

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <StatCard title="Tổng phải thu" value={formatCurrency(totalReceivable)} icon={<Clock className="h-4 w-4" />} color="primary" />
                    <StatCard title="Nợ quá hạn" value={formatCurrency(overdueAmount)} icon={<AlertCircle className="h-4 w-4" />} color="destructive" />
                </div>

                <div className="bg-card rounded-lg border border-border">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-lg">Danh sách khoản nợ</h3>
                    </div>
                    <div className="space-y-4 p-4">
                        {receivables.length > 0 ? (
                            receivables.map(item => (
                                <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-muted/20 border border-border rounded-lg gap-4">
                                    <div className="flex gap-4">
                                        <div className={cn("p-2 rounded-lg h-fit", item.status === 'overdue' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning')}>
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{item.tenantName} <span className="text-muted-foreground text-sm font-normal">({item.unit})</span></h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {item.type === 'rent' ? 'Tiền thuê nhà' : 'Tiền dịch vụ'} - Hạn nộp: {formatDate(item.dueDate)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                        <div className="text-right">
                                            <div className="font-bold text-lg">{formatCurrency(item.amount)}</div>
                                            <div className={cn("text-xs font-medium uppercase", item.status === 'overdue' ? 'text-destructive' : 'text-warning')}>
                                                {item.status === 'overdue' ? 'Quá hạn' : 'Sắp đến hạn'}
                                            </div>
                                        </div>
                                        <button className="p-2 border border-border rounded-full hover:bg-muted text-muted-foreground hover:text-foreground" title="Gọi điện nhắc nợ">
                                            <Phone className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-muted-foreground">Không có khoản nợ nào cần thu.</div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
