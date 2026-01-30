import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';

export default function TenantContact() {
    return (
        <DashboardLayout
            role="tenant"
            title="Liên hệ ban quản lý"
            breadcrumbs={[
                { label: 'Trang chủ', href: '/tenant' },
                { label: 'Liên hệ' }
            ]}
        >
            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">

                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <h3 className="font-semibold text-lg mb-4">Văn phòng quản lý</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Địa chỉ</h4>
                                    <p className="text-sm text-muted-foreground">Tầng 1, Sunrise Tower, 123 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-500/10 text-green-600 rounded-lg">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Hotline (24/7)</h4>
                                    <p className="text-lg font-bold text-primary">028 3999 8888</p>
                                    <p className="text-xs text-muted-foreground">Hỗ trợ khẩn cấp, an ninh</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email hỗ trợ</h4>
                                    <p className="text-sm text-muted-foreground">support@sunrisetower.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Giờ làm việc</h4>
                                    <p className="text-sm text-muted-foreground">Thứ 2 - Thứ 6: 8:00 - 17:30</p>
                                    <p className="text-sm text-muted-foreground">Thứ 7: 8:00 - 12:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Gửi tin nhắn trực tiếp</h3>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Chủ đề</label>
                            <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                <option>Góp ý dịch vụ</option>
                                <option>Khiếu nại</option>
                                <option>Đăng ký tiện ích</option>
                                <option>Khác</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tiêu đề</label>
                            <input
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Tóm tắt nội dung..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nội dung</label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Nhập nội dung tin nhắn..."
                            />
                        </div>

                        <button className="w-full bg-primary text-primary-foreground h-10 rounded-md font-medium hover:bg-primary/90 transition-colors">
                            Gửi tin nhắn
                        </button>
                    </form>
                </div>

            </div>
        </DashboardLayout>
    );
}
