import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { tenants, properties } from '@/data/mockData';
import { Search, Filter, Plus, User, Phone, Mail, CreditCard } from 'lucide-react';
import { StatusBadge } from '@/components/pms/StatusBadge';

export default function TenantList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredTenants = tenants.filter(tenant => {
        const matchesSearch = tenant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.phone.includes(searchTerm) ||
            tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <DashboardLayout
            role="admin"
            title="Danh sách khách thuê"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/admin' },
                { label: 'Khách thuê', href: '/admin/tenants' },
                { label: 'Danh sách' }
            ]}
        >
            <div className="space-y-6">
                {/* Filters and Actions */}
                <div className="flex flex-col md:flex-row justify-between gap-4 bg-card p-4 rounded-lg border border-border">
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Tìm tên, SĐT, email, phòng..."
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
                                <option value="active">Đang thuê</option>
                                <option value="pending">Chờ duyệt</option>
                                <option value="expired">Đã hết hạn</option>
                            </select>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Thêm khách thuê</span>
                    </button>
                </div>

                {/* Tenant Table */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Khách thuê</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Liên hệ</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">CMND/CCCD</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Chỗ ở hiện tại</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Trạng thái</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredTenants.length > 0 ? (
                                    filteredTenants.map((tenant) => (
                                        <tr key={tenant.id} className="hover:bg-accent/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-semibold">
                                                        {tenant.fullName.split(' ').pop()?.[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">{tenant.fullName}</p>
                                                        <p className="text-xs text-muted-foreground">{tenant.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Phone className="h-3 w-3" />
                                                        <span className="text-xs">{tenant.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Mail className="h-3 w-3" />
                                                        <span className="text-xs">{tenant.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs">{tenant.identityNumber}</td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium">{tenant.unit}</p>
                                                    <p className="text-xs text-muted-foreground line-clamp-1">{tenant.property}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={tenant.status} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-primary hover:underline font-medium text-xs">Chi tiết</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                            Không tìm thấy khách thuê nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-border bg-muted/20 flex justify-between items-center text-sm text-muted-foreground">
                        <span>Hiển thị {filteredTenants.length} khách thuê</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-border rounded hover:bg-muted bg-background disabled:opacity-50" disabled>Trước</button>
                            <button className="px-3 py-1 border border-border rounded hover:bg-muted bg-background disabled:opacity-50" disabled>Sau</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
