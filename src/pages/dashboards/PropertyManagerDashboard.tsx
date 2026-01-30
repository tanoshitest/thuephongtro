import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { StatCard } from '@/components/pms/StatCard';
import { DataTable } from '@/components/pms/DataTable';
import { StatusBadge } from '@/components/pms/StatusBadge';
import { properties, tenants, maintenanceRequests, formatCurrency, formatDate } from '@/data/mockData';
import { Tenant, MaintenanceRequest } from '@/types/pms';
import { 
  Plus,
  Filter,
  Download,
  Calendar
} from 'lucide-react';

export default function PropertyManagerDashboard() {
  const activeLeases = tenants.filter(t => t.status === 'active').length;
  const expiringLeases = tenants.filter(t => {
    const endDate = new Date(t.leaseEndDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return endDate <= thirtyDaysFromNow && t.status === 'active';
  }).length;
  const pendingRequests = maintenanceRequests.filter(r => r.status === 'pending').length;

  const stats = [
    {
      title: 'Tổng tòa nhà quản lý',
      value: properties.length,
      icon: 'Building2',
      color: 'primary' as const,
    },
    {
      title: 'Hợp đồng đang hoạt động',
      value: activeLeases,
      change: 3,
      changeLabel: 'tháng này',
      icon: 'FileText',
      color: 'success' as const,
    },
    {
      title: 'Hợp đồng sắp hết hạn',
      value: expiringLeases,
      icon: 'Calendar',
      color: 'warning' as const,
    },
    {
      title: 'Yêu cầu chờ xử lý',
      value: pendingRequests,
      icon: 'AlertCircle',
      color: 'destructive' as const,
    },
  ];

  const tenantColumns = [
    { key: 'fullName', header: 'Họ tên' },
    { key: 'phone', header: 'Số điện thoại' },
    { key: 'unit', header: 'Căn hộ' },
    { key: 'property', header: 'Tòa nhà' },
    { 
      key: 'leaseEndDate', 
      header: 'Ngày hết hạn HĐ',
      render: (item: Tenant) => formatDate(item.leaseEndDate)
    },
    { 
      key: 'monthlyRent', 
      header: 'Tiền thuê/tháng',
      render: (item: Tenant) => (
        <span className="font-medium">{formatCurrency(item.monthlyRent)}</span>
      )
    },
    { 
      key: 'status', 
      header: 'Trạng thái',
      render: (item: Tenant) => <StatusBadge status={item.status} />
    },
  ];

  const maintenanceColumns = [
    { key: 'id', header: 'Mã YC' },
    { key: 'tenantName', header: 'Cư dân' },
    { key: 'unit', header: 'Căn hộ' },
    { 
      key: 'description', 
      header: 'Mô tả',
      render: (item: MaintenanceRequest) => (
        <span className="line-clamp-1 max-w-xs">{item.description}</span>
      )
    },
    { 
      key: 'priority', 
      header: 'Ưu tiên',
      render: (item: MaintenanceRequest) => <StatusBadge status={item.priority} />
    },
    { 
      key: 'status', 
      header: 'Trạng thái',
      render: (item: MaintenanceRequest) => <StatusBadge status={item.status} />
    },
    { 
      key: 'createdAt', 
      header: 'Ngày tạo',
      render: (item: MaintenanceRequest) => formatDate(item.createdAt)
    },
  ];

  // Upcoming events mock data
  const upcomingEvents = [
    { id: 1, title: 'Họp ban quản lý Sunrise Tower', date: '2024-01-15', time: '09:00' },
    { id: 2, title: 'Kiểm tra PCCC Diamond Plaza', date: '2024-01-16', time: '14:00' },
    { id: 3, title: 'Gia hạn HĐ - Nguyễn Văn Minh', date: '2024-01-18', time: '10:00' },
    { id: 4, title: 'Bảo trì thang máy Green Valley', date: '2024-01-20', time: '08:00' },
  ];

  return (
    <DashboardLayout 
      role="property-manager" 
      title="Quản lý tòa nhà" 
      subtitle="Tổng quan hoạt động quản lý bất động sản"
    >
      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-6">
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
          <Plus className="h-4 w-4" />
          Thêm cư dân mới
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm">
          <Filter className="h-4 w-4" />
          Bộ lọc
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Tenants Table - 2 columns */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Danh sách cư dân</h3>
            <button className="text-sm text-primary hover:underline font-medium">
              Xem tất cả
            </button>
          </div>
          <DataTable data={tenants.slice(0, 6)} columns={tenantColumns} />
        </div>

        {/* Upcoming Events - 1 column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Lịch sắp tới</h3>
            <button className="text-sm text-primary hover:underline font-medium">
              Xem lịch
            </button>
          </div>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`p-4 flex items-start gap-3 ${index !== upcomingEvents.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(event.date)} • {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Requests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Yêu cầu bảo trì gần đây</h3>
          <button className="text-sm text-primary hover:underline font-medium">
            Xem tất cả
          </button>
        </div>
        <DataTable data={maintenanceRequests} columns={maintenanceColumns} />
      </div>
    </DashboardLayout>
  );
}
