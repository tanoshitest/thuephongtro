import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { StatusBadge } from '@/components/pms/StatusBadge';
import { 
  FileText,
  CreditCard,
  Wrench,
  Bell,
  Phone,
  QrCode,
  Plus,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function TenantDashboard() {
  // Current tenant info as specified
  const currentTenant = {
    name: 'Lê Thị Mai Hương',
    room: 'P.302',
  };

  // Current bill
  const currentBill = {
    period: 'Tháng 10/2023',
    amount: 3800000,
    status: 'pending' as const,
    dueDate: '05/11/2023',
    breakdown: [
      { label: 'Tiền phòng', amount: 3200000 },
      { label: 'Tiền điện (125 kWh)', amount: 350000 },
      { label: 'Tiền nước (8m³)', amount: 160000 },
      { label: 'Phí quản lý', amount: 90000 },
    ],
  };

  // My maintenance requests
  const myRequests = [
    {
      id: 'YC-2310-01',
      title: 'Sửa bóng đèn nhà vệ sinh',
      date: '28/10',
      status: 'in_progress' as const,
      description: 'Bóng đèn nhà vệ sinh bị cháy, cần thay thế',
    },
  ];

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  return (
    <DashboardLayout 
      role="tenant" 
      title="Cổng thông tin cư dân"
      subtitle=""
      breadcrumbs={[
        { label: 'Trang chủ', href: '/tenant' }
      ]}
    >
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Xin chào, {currentTenant.name} ({currentTenant.room})
        </h1>
        <p className="text-muted-foreground mt-1">Chào mừng bạn quay trở lại cổng thông tin cư dân</p>
      </div>

      {/* Main Action Card - Current Bill */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 rounded-2xl border border-primary/20 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Hóa đơn {currentBill.period}</h2>
                <p className="text-sm text-muted-foreground">Hạn thanh toán: {currentBill.dueDate}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {currentBill.breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{formatVND(item.amount)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">{formatVND(currentBill.amount)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <StatusBadge status="pending" customLabel="Chưa thanh toán" />
              <span className="text-sm text-muted-foreground">• Quá hạn {5} ngày</span>
            </div>
          </div>

          <div className="lg:w-72">
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center mb-3">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Quét mã để thanh toán</p>
              <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Thanh toán ngay (VietQR)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Section - My Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Yêu cầu của tôi</h3>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                <Plus className="h-4 w-4" />
                Tạo yêu cầu mới
              </button>
            </div>
            
            {myRequests.length > 0 ? (
              <div className="divide-y divide-border">
                {myRequests.map((request) => (
                  <div key={request.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{request.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                      </div>
                      <StatusBadge status={request.status} customLabel="Đang xử lý" />
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Ngày gửi: {request.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-primary font-medium">Mã: {request.id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Bạn chưa có yêu cầu nào</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Contact & Notifications */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Thông báo</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="p-4 border-l-4 border-l-warning bg-warning/5">
                <p className="text-sm font-medium text-foreground">Nhắc nhở thanh toán</p>
                <p className="text-xs text-muted-foreground mt-1">Hóa đơn tháng 10 đã quá hạn 5 ngày</p>
              </div>
              <div className="p-4 border-l-4 border-l-info bg-info/5">
                <p className="text-sm font-medium text-foreground">Bảo trì định kỳ</p>
                <p className="text-xs text-muted-foreground mt-1">Bảo trì thang máy vào 15/11/2023</p>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground mb-4">Liên hệ nhanh</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Hotline BQL</p>
                  <p className="text-sm text-muted-foreground">1900 1234</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium">Đường dây khẩn cấp</p>
                  <p className="text-sm text-muted-foreground">0909 999 911</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
