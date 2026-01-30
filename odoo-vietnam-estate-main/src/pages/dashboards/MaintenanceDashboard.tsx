import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { StatusBadge } from '@/components/pms/StatusBadge';
import { 
  Clock,
  User,
  MapPin,
  CheckCircle,
  Package
} from 'lucide-react';

// Task type
interface MaintenanceTask {
  id: string;
  location: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  reportedBy: string;
  timeAgo: string;
  status: 'pending' | 'in_progress' | 'waiting_parts';
}

export default function MaintenanceDashboard() {
  // Task list as specified
  const tasks: MaintenanceTask[] = [
    {
      id: '1',
      location: 'P.402',
      description: 'Nước yếu, vòi sen rò rỉ',
      priority: 'high',
      reportedBy: 'Trần Văn Bình',
      timeAgo: '2 giờ trước',
      status: 'pending',
    },
    {
      id: '2',
      location: 'Hành lang tầng 2',
      description: 'Thay bóng đèn bị cháy',
      priority: 'medium',
      reportedBy: 'Lễ tân',
      timeAgo: '1 ngày trước',
      status: 'in_progress',
    },
    {
      id: '3',
      location: 'P.105',
      description: 'Kiểm tra cục nóng điều hòa kêu to',
      priority: 'low',
      reportedBy: 'Nguyễn Thị Lan',
      timeAgo: '2 ngày trước',
      status: 'waiting_parts',
    },
    {
      id: '4',
      location: 'P.503',
      description: 'Bồn cầu bị tắc nghẽn',
      priority: 'high',
      reportedBy: 'Phạm Văn Minh',
      timeAgo: '30 phút trước',
      status: 'pending',
    },
    {
      id: '5',
      location: 'Sảnh tầng 1',
      description: 'Quạt trần kêu to bất thường',
      priority: 'medium',
      reportedBy: 'Bảo vệ',
      timeAgo: '5 giờ trước',
      status: 'pending',
    },
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'bg-destructive/10', border: 'border-destructive/30', label: 'Cao', color: 'text-destructive' };
      case 'medium':
        return { bg: 'bg-info/10', border: 'border-info/30', label: 'Bình thường', color: 'text-info' };
      case 'low':
        return { bg: 'bg-muted', border: 'border-muted-foreground/30', label: 'Thấp', color: 'text-muted-foreground' };
      default:
        return { bg: 'bg-muted', border: 'border-border', label: priority, color: 'text-muted-foreground' };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Chờ nhận', showButton: true, buttonLabel: 'Nhận việc', buttonStyle: 'bg-primary text-primary-foreground hover:bg-primary/90' };
      case 'in_progress':
        return { label: 'Đang thực hiện', showButton: true, buttonLabel: 'Hoàn thành', buttonStyle: 'bg-success text-success-foreground hover:bg-success/90' };
      case 'waiting_parts':
        return { label: 'Chờ vật tư', showButton: false, buttonLabel: '', buttonStyle: '' };
      default:
        return { label: status, showButton: false, buttonLabel: '', buttonStyle: '' };
    }
  };

  // Stats
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const waitingPartsCount = tasks.filter(t => t.status === 'waiting_parts').length;
  const highPriorityCount = tasks.filter(t => t.priority === 'high' && t.status !== 'waiting_parts').length;

  return (
    <DashboardLayout 
      role="maintenance" 
      title="Tổng quan"
      subtitle="Tiếp nhận và cập nhật trạng thái sửa chữa"
      breadcrumbs={[
        { label: 'Trang chủ', href: '/maintenance' },
        { label: 'Tổng quan' }
      ]}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
            <Clock className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Chờ nhận việc</p>
            <p className="text-2xl font-bold text-warning">{pendingCount}</p>
          </div>
        </div>
        <div className="bg-info/10 border border-info/20 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center">
            <User className="h-6 w-6 text-info" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Đang thực hiện</p>
            <p className="text-2xl font-bold text-info">{inProgressCount}</p>
          </div>
        </div>
        <div className="bg-muted border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted-foreground/10 flex items-center justify-center">
            <Package className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Chờ vật tư</p>
            <p className="text-2xl font-bold text-muted-foreground">{waitingPartsCount}</p>
          </div>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ưu tiên cao</p>
            <p className="text-2xl font-bold text-destructive">{highPriorityCount}</p>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Danh sách công việc cần làm</h3>
        </div>
        <div className="divide-y divide-border">
          {tasks.map((task) => {
            const priorityStyle = getPriorityStyle(task.priority);
            const statusInfo = getStatusInfo(task.status);
            
            return (
              <div 
                key={task.id} 
                className={`p-5 ${priorityStyle.bg} border-l-4 ${priorityStyle.border} hover:bg-opacity-80 transition-colors`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-lg text-foreground">{task.location}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityStyle.color} ${priorityStyle.bg} border ${priorityStyle.border}`}>
                        {priorityStyle.label}
                      </span>
                      {task.status === 'in_progress' && (
                        <StatusBadge status="in_progress" customLabel="Đang thực hiện" />
                      )}
                      {task.status === 'waiting_parts' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-muted-foreground bg-muted border border-muted-foreground/30">
                          Chờ vật tư
                        </span>
                      )}
                    </div>
                    <p className="text-foreground font-medium mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        <span>Báo bởi: {task.reportedBy}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{task.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  
                  {statusInfo.showButton && (
                    <button className={`px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${statusInfo.buttonStyle}`}>
                      {statusInfo.buttonLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
