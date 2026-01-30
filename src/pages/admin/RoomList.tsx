import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { rooms, properties, formatCurrency } from '@/data/mockData';
import { Search, Filter, Plus, Home } from 'lucide-react';
import { StatusBadge } from '@/components/pms/StatusBadge';

export default function RoomList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [propertyFilter, setPropertyFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredRooms = rooms.filter(room => {
        const matchesSearch = room.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.tenantName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProperty = propertyFilter === 'all' || room.property === propertyFilter;
        const matchesStatus = statusFilter === 'all' || room.status === statusFilter;

        return matchesSearch && matchesProperty && matchesStatus;
    });

    return (
        <DashboardLayout
            role="admin"
            title="Danh sách phòng"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/admin' },
                { label: 'Nhà trọ', href: '/admin/rooms' },
                { label: 'Danh sách phòng' }
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
                                placeholder="Tìm phòng, khách thuê..."
                                className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <select
                                className="border border-input rounded-md bg-background py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                value={propertyFilter}
                                onChange={(e) => setPropertyFilter(e.target.value)}
                            >
                                <option value="all">Tất cả tòa nhà</option>
                                {properties.map(p => (
                                    <option key={p.id} value={p.name}>{p.name}</option>
                                ))}
                            </select>

                            <select
                                className="border border-input rounded-md bg-background py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="available">Trống</option>
                                <option value="occupied">Đang thuê</option>
                                <option value="reserved">Đã đặt cọc</option>
                                <option value="maintenance">Bảo trì</option>
                            </select>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Thêm phòng</span>
                    </button>
                </div>

                {/* Room Table */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Phòng</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Tòa nhà</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Loại</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Giá thuê</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Diện tích</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Khách thuê</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Trạng thái</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredRooms.length > 0 ? (
                                    filteredRooms.map((room) => (
                                        <tr key={room.id} className="hover:bg-accent/5 transition-colors">
                                            <td className="px-6 py-4 font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                                                        <Home className="h-4 w-4" />
                                                    </div>
                                                    {room.unit}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{room.property}</td>
                                            <td className="px-6 py-4 uppercase text-xs font-semibold text-muted-foreground">{room.type}</td>
                                            <td className="px-6 py-4 font-medium">{formatCurrency(room.price)}</td>
                                            <td className="px-6 py-4">{room.area}m²</td>
                                            <td className="px-6 py-4">
                                                {room.tenantName ? (
                                                    <span className="text-foreground">{room.tenantName}</span>
                                                ) : (
                                                    <span className="text-muted-foreground italic">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={room.status} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-primary hover:underline font-medium text-xs">Chi tiết</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                                            Không tìm thấy phòng nào phù hợp.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-border bg-muted/20 flex justify-between items-center text-sm text-muted-foreground">
                        <span>Hiển thị {filteredRooms.length} phòng</span>
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
