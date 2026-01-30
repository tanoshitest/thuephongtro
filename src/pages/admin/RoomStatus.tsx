import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { rooms, properties } from '@/data/mockData';
import { Filter, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Room } from '@/types/pms';

export default function RoomStatus() {
    const [selectedProperty, setSelectedProperty] = useState<string>(properties[0].name);

    const displayedRooms = rooms
        .filter(room => room.property === selectedProperty)
        .sort((a, b) => b.floor - a.floor || a.unit.localeCompare(b.unit));

    // Group rooms by floor
    const floors = Array.from(new Set(displayedRooms.map(r => r.floor))).sort((a, b) => b - a);

    // Stats for the selected property
    const totalRooms = displayedRooms.length;
    const occupiedRooms = displayedRooms.filter(r => r.status === 'occupied').length;
    const availableRooms = displayedRooms.filter(r => r.status === 'available').length;
    const maintenanceRooms = displayedRooms.filter(r => r.status === 'maintenance').length;
    const reservedRooms = displayedRooms.filter(r => r.status === 'reserved').length;

    return (
        <DashboardLayout
            role="admin"
            title="Tình trạng phòng"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/admin' },
                { label: 'Nhà trọ', href: '/admin/rooms' },
                { label: 'Tình trạng phòng' }
            ]}
        >
            <div className="space-y-6">
                {/* Header Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Chọn tòa nhà:</span>
                        <div className="relative">
                            <select
                                className="appearance-none border border-input rounded-md bg-card pl-3 pr-8 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-ring w-64"
                                value={selectedProperty}
                                onChange={(e) => setSelectedProperty(e.target.value)}
                            >
                                {properties.map(p => (
                                    <option key={p.id} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-success"></span>
                            <span>Trống ({availableRooms})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-destructive"></span>
                            <span>Đang thuê ({occupiedRooms})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-warning"></span>
                            <span>Bảo trì ({maintenanceRooms})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-info"></span>
                            <span>Đã đặt ({reservedRooms})</span>
                        </div>
                    </div>
                </div>

                {/* Visual Grid */}
                <div className="space-y-6">
                    {displayedRooms.length > 0 ? (
                        floors.map(floor => (
                            <div key={floor} className="bg-card rounded-lg border border-border p-4">
                                <h3 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider border-b border-border pb-2">
                                    Tầng {floor}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                                    {displayedRooms.filter(r => r.floor === floor).map(room => (
                                        <RoomCard key={room.id} room={room} />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-card rounded-lg border border-border">
                            <p className="text-muted-foreground">Chưa có dữ liệu phòng cho tòa nhà này.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

function RoomCard({ room }: { room: Room }) {
    const statusColors = {
        available: 'bg-success/10 border-success/30 text-success hover:bg-success/20',
        occupied: 'bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20',
        maintenance: 'bg-warning/10 border-warning/30 text-warning hover:bg-warning/20',
        reserved: 'bg-info/10 border-info/30 text-info hover:bg-info/20',
    };

    const statusLabels = {
        available: 'Trống',
        occupied: 'Đã thuê',
        maintenance: 'Bảo trì',
        reserved: 'Đã cọc',
    };

    return (
        <div className={cn(
            "border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 flex flex-col justify-between aspect-square",
            statusColors[room.status]
        )}>
            <div className="flex justify-between items-start">
                <span className="font-bold text-lg">{room.unit.split('-')[1] || room.unit}</span>
                <span className="text-[10px] uppercase font-bold border border-current px-1 rounded">
                    {room.type}
                </span>
            </div>

            <div className="text-xs space-y-1">
                <p className="font-medium truncate" title={statusLabels[room.status]}>
                    {statusLabels[room.status]}
                </p>
                {room.tenantName && (
                    <p className="truncate text-[10px] opacity-80" title={room.tenantName}>
                        {room.tenantName}
                    </p>
                )}
            </div>
        </div>
    );
}
