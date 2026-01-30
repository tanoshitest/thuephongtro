import { useState } from 'react';
import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { utilityReadings } from '@/data/mockData';
import { Search, Droplets, Zap, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ReceptionistUtilities() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReadings = utilityReadings.filter(r =>
        r.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.property.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout
            role="receptionist"
            title="Ghi chỉ số điện nước"
            breadcrumbs={[
                { label: 'Tổng quan', href: '/receptionist' },
                { label: 'Điện nước' }
            ]}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Tìm phòng, khách thuê..."
                            className="pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
                        <Clock className="h-4 w-4" />
                        Kỳ ghi: <strong>01/2024</strong>
                    </div>
                </div>

                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Phòng / Khách</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Zap className="h-4 w-4 text-yellow-500" /> Điện (KWh)
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Droplets className="h-4 w-4 text-blue-500" /> Nước (m³)
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Trạng thái</th>
                                    <th className="px-6 py-3 font-semibold text-muted-foreground">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredReadings.map((u) => (
                                    <tr key={u.id} className="hover:bg-accent/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{u.unit} - {u.property}</div>
                                            <div className="text-xs text-muted-foreground">{u.tenantName}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="text-muted-foreground">Cũ: {u.previousElectric}</span>
                                                    <span className="font-medium">Mới: {u.currentElectric || '---'}</span>
                                                </div>
                                                {u.currentElectric > 0 && (
                                                    <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-1.5 rounded">
                                                        {u.currentElectric - u.previousElectric} sử dụng
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="text-muted-foreground">Cũ: {u.previousWater}</span>
                                                    <span className="font-medium">Mới: {u.currentWater || '---'}</span>
                                                </div>
                                                {u.currentWater > 0 && (
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-1.5 rounded">
                                                        {u.currentWater - u.previousWater} sử dụng
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "flex items-center gap-1.5 text-xs font-medium w-fit px-2.5 py-0.5 rounded-full border",
                                                u.status === 'billed'
                                                    ? "bg-success/10 text-success border-success/20"
                                                    : "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {u.status === 'billed' ? (
                                                    <><CheckCircle className="h-3 w-3" /> Đã chốt</>
                                                ) : (
                                                    <><Clock className="h-3 w-3" /> Chờ ghi</>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.status !== 'billed' ? (
                                                <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors">
                                                    Cập nhật
                                                </button>
                                            ) : (
                                                <button className="text-xs text-muted-foreground hover:text-foreground underline">
                                                    Sửa lại
                                                </button>
                                            )}
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
