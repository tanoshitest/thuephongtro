import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { StatusBadge } from '@/components/pms/StatusBadge';
import { 
  Home,
  Clock,
  User,
  Calendar,
  CheckSquare,
  DoorOpen
} from 'lucide-react';

// Room type for Kanban view
interface Room {
  id: string;
  number: string;
  type: string;
  size: string;
  price: string;
  tenantName?: string;
  endDate?: string;
}

export default function ReceptionistDashboard() {
  // Kanban room data
  const availableRooms: Room[] = [
    { id: '1', number: 'P.501', type: 'Studio', size: '35m²', price: '4.5tr' },
    { id: '2', number: 'P.103', type: 'Phòng đơn', size: '25m²', price: '3.2tr' },
  ];

  const endingSoonRooms: Room[] = [
    { id: '3', number: 'P.202', type: 'Phòng đôi', size: '40m²', price: '5.0tr', tenantName: 'Nguyễn Văn Nam', endDate: '15/11/2023' },
    { id: '4', number: 'P.105', type: 'Studio', size: '32m²', price: '4.0tr', tenantName: 'Trần Thị Hoa', endDate: '20/11/2023' },
  ];

  const occupiedRooms: Room[] = [
    { id: '5', number: 'P.301', type: 'Phòng đôi', size: '45m²', price: '5.5tr', tenantName: 'Lê Thu Hà' },
    { id: '6', number: 'P.405', type: 'Penthouse', size: '60m²', price: '8.0tr', tenantName: 'Trần Quốc Tuấn' },
    { id: '7', number: 'P.302', type: 'Studio', size: '35m²', price: '4.5tr', tenantName: 'Phạm Văn Minh' },
    { id: '8', number: 'P.201', type: 'Phòng đơn', size: '28m²', price: '3.5tr', tenantName: 'Ngô Thị Lan' },
    { id: '9', number: 'P.403', type: 'Phòng đôi', size: '42m²', price: '5.2tr', tenantName: 'Hoàng Minh Đức' },
  ];

  // Today's tasks
  const todayTasks = [
    { id: 1, text: 'Ghi chỉ số điện nước tầng 3', done: false, time: '09:00' },
    { id: 2, text: 'Nhận bàn giao phòng P.102', done: false, time: '10:30' },
    { id: 3, text: 'Thu tiền phòng P.401 (quá hạn)', done: false, time: '14:00' },
    { id: 4, text: 'Hướng dẫn khách thuê mới P.501', done: true, time: '08:00' },
    { id: 5, text: 'Kiểm tra camera an ninh tầng hầm', done: false, time: '16:00' },
  ];

  return (
    <DashboardLayout 
      role="receptionist" 
      title="Tổng quan"
      subtitle="Vận hành, quản lý khách thuê, ghi điện nước"
      breadcrumbs={[
        { label: 'Trang chủ', href: '/receptionist' },
        { label: 'Tổng quan' }
      ]}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
            <Home className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phòng trống</p>
            <p className="text-2xl font-bold text-success">{availableRooms.length}</p>
          </div>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
            <Clock className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sắp hết hạn</p>
            <p className="text-2xl font-bold text-warning">{endingSoonRooms.length}</p>
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Đang ở</p>
            <p className="text-2xl font-bold text-primary">{occupiedRooms.length}</p>
          </div>
        </div>
        <div className="bg-info/10 border border-info/20 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center">
            <CheckSquare className="h-6 w-6 text-info" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Việc cần làm</p>
            <p className="text-2xl font-bold text-info">{todayTasks.filter(t => !t.done).length}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kanban Board - 3 columns */}
        <div className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-foreground mb-4">Trạng thái phòng</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Available */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-success/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DoorOpen className="h-5 w-5 text-success" />
                    <h4 className="font-semibold text-foreground">Phòng Trống</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-success/10 text-success rounded-full text-xs font-medium">
                    {availableRooms.length}
                  </span>
                </div>
              </div>
              <div className="p-3 space-y-3">
                {availableRooms.map((room) => (
                  <div 
                    key={room.id} 
                    className="p-4 bg-background rounded-lg border border-success/30 hover:border-success/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground">{room.number}</span>
                      <StatusBadge status="active" customLabel="Trống" />
                    </div>
                    <p className="text-sm text-muted-foreground">{room.type} - {room.size}</p>
                    <p className="text-sm font-semibold text-success mt-1">Giá: {room.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Ending Soon */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-warning/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warning" />
                    <h4 className="font-semibold text-foreground">Sắp trống</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-warning/10 text-warning rounded-full text-xs font-medium">
                    {endingSoonRooms.length}
                  </span>
                </div>
              </div>
              <div className="p-3 space-y-3">
                {endingSoonRooms.map((room) => (
                  <div 
                    key={room.id} 
                    className="p-4 bg-background rounded-lg border border-warning/30 hover:border-warning/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground">{room.number}</span>
                      <StatusBadge status="pending" customLabel="Sắp hết" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{room.tenantName}</p>
                    <div className="flex items-center gap-1 mt-1 text-warning">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="text-xs">Hết hạn: {room.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Occupied */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-primary/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Đang ở</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {occupiedRooms.length}
                  </span>
                </div>
              </div>
              <div className="p-3 space-y-3 max-h-[400px] overflow-y-auto">
                {occupiedRooms.map((room) => (
                  <div 
                    key={room.id} 
                    className="p-4 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground">{room.number}</span>
                      <StatusBadge status="active" customLabel="Đang thuê" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{room.tenantName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{room.type} - {room.size}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Tasks Sidebar - 1 column */}
        <div>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Nhắc việc hôm nay</h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {todayTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 flex items-start gap-3 ${task.done ? 'bg-muted/30' : 'hover:bg-muted/50'} transition-colors`}
                >
                  <input 
                    type="checkbox" 
                    checked={task.done}
                    readOnly
                    className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${task.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {task.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <button className="w-full text-center text-sm text-primary hover:underline font-medium">
                + Thêm công việc mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
