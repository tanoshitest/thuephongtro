import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { StatCard } from '@/components/pms/StatCard';
import { formatCurrency } from '@/data/mockData';
import { 
  ArrowUpRight,
  BarChart3,
  User,
  FileText,
  CreditCard,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  // Static KPIs as specified
  const stats = [
    {
      title: 'Doanh thu Tháng 10',
      value: '285.000.000 VNĐ',
      change: 5,
      changeLabel: 'so với tháng trước',
      icon: 'DollarSign',
      color: 'success' as const,
    },
    {
      title: 'Tỷ lệ lấp đầy',
      value: '96%',
      changeLabel: '48/50 phòng đang thuê',
      icon: 'Home',
      color: 'primary' as const,
    },
    {
      title: 'Công nợ chưa thu',
      value: '18.500.000 VNĐ',
      changeLabel: '5 hóa đơn quá hạn',
      icon: 'AlertCircle',
      color: 'warning' as const,
    },
    {
      title: 'Sự cố chờ xử lý',
      value: '4',
      changeLabel: '1 ưu tiên cao',
      icon: 'Wrench',
      color: 'destructive' as const,
    },
  ];

  // Revenue chart data (mock for 6 months)
  const revenueData = [
    { month: 'T5', value: 245000000 },
    { month: 'T6', value: 258000000 },
    { month: 'T7', value: 262000000 },
    { month: 'T8', value: 271000000 },
    { month: 'T9', value: 278000000 },
    { month: 'T10', value: 285000000 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.value));

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      icon: FileText,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
      text: 'Lễ tân Phạm Thu Hà đã tạo hợp đồng mới cho phòng P.302',
      time: '5 phút trước',
    },
    {
      id: 2,
      icon: CreditCard,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      text: 'Kế toán Trần Văn Tâm đã xác nhận thu tiền P.401',
      time: '15 phút trước',
    },
    {
      id: 3,
      icon: CheckCircle,
      iconBg: 'bg-info/10',
      iconColor: 'text-info',
      text: 'Kỹ thuật Nguyễn Hữu Thắng hoàn thành sửa điều hòa P.205',
      time: '1 giờ trước',
    },
    {
      id: 4,
      icon: User,
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary',
      text: 'Khách thuê mới Lê Thị Mai Hương đăng ký phòng P.302',
      time: '2 giờ trước',
    },
    {
      id: 5,
      icon: Clock,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
      text: 'Nhắc nhở: Hợp đồng P.105 sẽ hết hạn trong 7 ngày',
      time: '3 giờ trước',
    },
  ];

  return (
    <DashboardLayout 
      role="admin" 
      title="Tổng quan"
      subtitle="Chào mừng trở lại, Nguyễn Văn An!"
      breadcrumbs={[
        { label: 'Trang chủ', href: '/admin' },
        { label: 'Tổng quan' }
      ]}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content - Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart - 2 columns */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Biểu đồ doanh thu 6 tháng</h3>
                <p className="text-sm text-muted-foreground">Tổng quan doanh thu theo tháng</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-success">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-medium">+16.3%</span>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-4 h-48 pt-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs text-muted-foreground mb-1">
                    {(data.value / 1000000).toFixed(0)}tr
                  </span>
                  <div 
                    className="w-full bg-primary/80 rounded-t-lg hover:bg-primary transition-colors cursor-pointer"
                    style={{ height: `${(data.value / maxRevenue) * 140}px` }}
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities - 1 column */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Hoạt động gần đây</h3>
            <button className="text-sm text-primary hover:underline font-medium">
              Xem tất cả
            </button>
          </div>
          <div className="divide-y divide-border">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${activity.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`h-5 w-5 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-relaxed">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 p-6">
          <p className="text-sm text-muted-foreground mb-1">Tổng thu tháng này</p>
          <p className="text-2xl font-bold text-success">266.500.000 VNĐ</p>
          <p className="text-xs text-muted-foreground mt-2">45 phiếu thu đã xác nhận</p>
        </div>
        <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl border border-destructive/20 p-6">
          <p className="text-sm text-muted-foreground mb-1">Tổng chi tháng này</p>
          <p className="text-2xl font-bold text-destructive">42.800.000 VNĐ</p>
          <p className="text-xs text-muted-foreground mt-2">12 phiếu chi đã duyệt</p>
        </div>
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
          <p className="text-sm text-muted-foreground mb-1">Lợi nhuận ròng</p>
          <p className="text-2xl font-bold text-primary">223.700.000 VNĐ</p>
          <p className="text-xs text-muted-foreground mt-2">+8.2% so với tháng trước</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
