import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { tenants } from '@/data/mockData';
import { Search, MapPin, Phone, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ReceptionistTenants() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTenants = tenants.filter(t =>
        t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.property.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout
            role="receptionist"
            title="Tra cứu khách thuê"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/receptionist' },
                { label: 'Khách thuê' }
            ]}
        >
            <div className="space-y-6">
                {/* Search */}
                <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, phòng, tòa nhà..."
                            className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tenant Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTenants.map(tenant => (
                        <div key={tenant.id} className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{tenant.fullName}</h3>
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded-full border",
                                            tenant.status === 'active' ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"
                                        )}>
                                            {tenant.status === 'active' ? 'Đang thuê' : 'Đã trả phòng'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span className="text-foreground font-medium">{tenant.unit}</span>
                                    <span>-</span>
                                    <span>{tenant.property}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{tenant.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{tenant.email}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                                <span>Ngày vào: {new Date(tenant.moveInDate).toLocaleDateString('vi-VN')}</span>
                                <button className="text-primary hover:underline">Chi tiết</button>
                            </div>
                        </div>
                    ))}

                    {filteredTenants.length === 0 && (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            Không tìm thấy khách thuê nào.
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
