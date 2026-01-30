import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { contracts, formatCurrency, formatDate } from '@/data/mockData';
import { Search, Filter, Plus, FileText, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContractList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredContracts = contracts.filter(contract => {
        const matchesSearch = contract.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-success/10 text-success border-success/20';
            case 'expired': return 'bg-destructive/10 text-destructive border-destructive/20';
            case 'pending_renewal': return 'bg-warning/10 text-warning border-warning/20';
            case 'terminated': return 'bg-muted text-muted-foreground border-muted-foreground/20';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Hiệu lực';
            case 'expired': return 'Hết hạn';
            case 'pending_renewal': return 'Chờ gia hạn';
            case 'terminated': return 'Đã thanh lý';
            default: return status;
        }
    };

    return (
        <DashboardLayout
            role="admin"
            title="Danh sách hợp đồng"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/admin' },
                { label: 'Khách thuê', href: '/admin/tenants' },
                { label: 'Hợp đồng' }
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
                                placeholder="Tìm số HĐ, khách thuê, phòng..."
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
                                <option value="active">Hiệu lực</option>
                                <option value="pending_renewal">Chờ gia hạn</option>
                                <option value="expired">Hết hạn</option>
                                <option value="terminated">Đã thanh lý</option>
                            </select>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Tạo hợp đồng</span>
                    </button>
                </div>

                {/* Contract Table */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Số HĐ</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Khách thuê</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Phòng</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Thời hạn</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Giá trị</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Trạng thái</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredContracts.length > 0 ? (
                                    filteredContracts.map((contract) => (
                                        <tr key={contract.id} className="hover:bg-accent/5 transition-colors">
                                            <td className="px-6 py-4 font-medium flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                {contract.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium">{contract.tenantName}</div>
                                                <div className="text-xs text-muted-foreground">{contract.tenantId}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium">{contract.unit}</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1">{contract.property}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs">
                                                    <span className="text-muted-foreground">Từ:</span> {formatDate(contract.startDate)}
                                                </div>
                                                <div className="text-xs">
                                                    <span className="text-muted-foreground">Đến:</span> {formatDate(contract.endDate)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-success">{formatCurrency(contract.monthlyRent)}/th</div>
                                                <div className="text-xs text-muted-foreground">Cọc: {formatCurrency(contract.depositAmount)}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", getStatusColor(contract.status))}>
                                                    {getStatusLabel(contract.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button className="text-primary hover:text-primary/80" title="Xem chi tiết">
                                                        <FileText className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-muted-foreground hover:text-foreground" title="Tải về">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                                            Không tìm thấy hợp đồng nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-border bg-muted/20 flex justify-between items-center text-sm text-muted-foreground">
                        <span>Hiển thị {filteredContracts.length} hợp đồng</span>
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
