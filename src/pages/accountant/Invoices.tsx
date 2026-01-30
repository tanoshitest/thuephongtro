import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { payments, formatCurrency, formatDate } from '@/data/mockData';
import { Search, Plus, Mail, Printer, Receipt } from 'lucide-react';

export default function AccountantInvoices() {
    const [searchTerm, setSearchTerm] = useState('');

    // Treat pending payments as logical "New Invoices" or "Sent Invoices"
    const invoices = payments.map(p => ({
        ...p,
        invoiceId: `INV-${p.id.split('PAY')[1] || '001'}`,
        sentDate: p.dueDate, // Mocking sent date as due date for now
    }));

    const filteredInvoices = invoices.filter(inv =>
        inv.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout
            role="accountant"
            title="Quản lý hóa đơn"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/accountant' },
                { label: 'Hóa đơn' }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 bg-card p-4 rounded-lg border border-border">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Tìm số hóa đơn, khách hàng..."
                            className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-full md:w-80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Lập hóa đơn mới</span>
                    </button>
                </div>

                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Số hóa đơn</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Khách hàng</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Ngày lập</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Nội dung</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Tổng tiền</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredInvoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-accent/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs flex items-center gap-2">
                                            <Receipt className="h-4 w-4 text-muted-foreground" />
                                            {inv.invoiceId}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{inv.tenantName}</div>
                                            <div className="text-xs text-muted-foreground">{inv.unit}</div>
                                        </td>
                                        <td className="px-6 py-4 text-xs">{formatDate(inv.sentDate)}</td>
                                        <td className="px-6 py-4 capitalize">{inv.type === 'rent' ? 'Tiền thuê' : 'Dịch vụ'}</td>
                                        <td className="px-6 py-4 font-medium">{formatCurrency(inv.amount)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3 text-muted-foreground">
                                                <button title="Gửi email" className="hover:text-primary"><Mail className="h-4 w-4" /></button>
                                                <button title="In hóa đơn" className="hover:text-primary"><Printer className="h-4 w-4" /></button>
                                            </div>
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
