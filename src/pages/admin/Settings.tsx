import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { roles } from '@/data/mockData';
import { Settings as SettingsIcon, Bell, Shield, Palette, User } from 'lucide-react';

export default function Settings() {
    return (
        <DashboardLayout
            role="admin"
            title="Cài đặt hệ thống"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/admin' },
                { label: 'Cài đặt' }
            ]}
        >
            <div className="space-y-8 max-w-5xl mx-auto">

                {/* General Settings */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30">
                        <h3 className="font-semibold flex items-center gap-2">
                            <SettingsIcon className="h-4 w-4" />
                            Thông tin chung
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tên hệ thống</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-md bg-background" defaultValue="CMS Hostel Management" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email liên hệ</label>
                                <input type="email" className="w-full px-3 py-2 border rounded-md bg-background" defaultValue="admin@hostel.cms" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Roles */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Phân quyền & Vai trò
                        </h3>
                    </div>
                    <div className="divide-y divide-border">
                        {roles.map(role => (
                            <div key={role.id} className="p-4 flex items-start gap-4 hover:bg-accent/5">
                                <div className={`p-2 rounded-lg bg-${role.color}/10 text-${role.color}`}>
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm text-foreground">{role.titleVi} ({role.title})</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                                </div>
                                <button className="ml-auto text-xs border border-border px-3 py-1 rounded hover:bg-muted">
                                    Chỉnh sửa
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preferences */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                        <div className="p-4 border-b border-border bg-muted/30">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Bell className="h-4 w-4" />
                                Thông báo
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {['Email khi có thanh toán mới', 'Thông báo bảo trì khẩn cấp', 'Báo cáo hàng tuần', 'Cảnh báo hợp đồng sắp hết hạn'].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-sm">{item}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                        <div className="p-4 border-b border-border bg-muted/30">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Palette className="h-4 w-4" />
                                Giao diện
                            </h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-muted-foreground mb-4">Giao diện hiện tại đang sử dụng chế độ hệ thống.</p>
                            <div className="flex gap-4">
                                <div className="flex-1 p-4 border-2 border-primary rounded-lg bg-background text-center cursor-pointer">
                                    <div className="w-full h-20 bg-muted rounded mb-2"></div>
                                    <span className="text-xs font-medium">Sáng</span>
                                </div>
                                <div className="flex-1 p-4 border border-border rounded-lg bg-slate-950 text-center cursor-pointer">
                                    <div className="w-full h-20 bg-slate-900 rounded mb-2"></div>
                                    <span className="text-xs font-medium text-white">Tối</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
