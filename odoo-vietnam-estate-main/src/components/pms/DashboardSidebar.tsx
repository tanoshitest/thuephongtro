import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Wrench,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  Bell,
  ChevronLeft,
  UserCircle,
  Home,
  Calendar,
  BarChart3,
  Calculator,
  UserCheck,
  Zap,
  Receipt,
  MessageSquare,
  ClipboardList,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { UserRole } from '@/types/pms';

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: { title: string; href: string }[];
}

const navItemsByRole: Record<UserRole, NavItem[]> = {
  admin: [
    { title: 'Tổng quan', icon: LayoutDashboard, href: '/admin' },
    { 
      title: 'Nhà trọ', 
      icon: Building2, 
      children: [
        { title: 'Danh sách phòng', href: '/admin/rooms' },
        { title: 'Tình trạng phòng', href: '/admin/room-status' },
      ]
    },
    { 
      title: 'Khách thuê', 
      icon: Users, 
      children: [
        { title: 'Danh sách khách thuê', href: '/admin/tenants' },
        { title: 'Hợp đồng', href: '/admin/contracts' },
      ]
    },
    { title: 'Tài chính', icon: CreditCard, href: '/admin/finance' },
    { title: 'Bảo trì', icon: Wrench, href: '/admin/maintenance' },
    { title: 'Báo cáo', icon: BarChart3, href: '/admin/reports' },
    { title: 'Cài đặt', icon: Settings, href: '/admin/settings' },
  ],
  'property-manager': [
    { title: 'Tổng quan', icon: LayoutDashboard, href: '/property-manager' },
    { title: 'Phòng', icon: Building2, href: '/property-manager/rooms' },
    { title: 'Khách thuê', icon: Users, href: '/property-manager/tenants' },
    { title: 'Hợp đồng', icon: FileText, href: '/property-manager/contracts' },
    { title: 'Yêu cầu bảo trì', icon: Wrench, href: '/property-manager/maintenance' },
    { title: 'Lịch', icon: Calendar, href: '/property-manager/calendar' },
  ],
  accountant: [
    { title: 'Tổng quan', icon: LayoutDashboard, href: '/accountant' },
    { title: 'Thu tiền', icon: CreditCard, href: '/accountant/payments' },
    { title: 'Chi phí', icon: FileText, href: '/accountant/expenses' },
    { title: 'Xuất hóa đơn', icon: Receipt, href: '/accountant/invoices' },
    { title: 'Công nợ', icon: Calculator, href: '/accountant/receivables' },
    { title: 'Báo cáo tài chính', icon: BarChart3, href: '/accountant/reports' },
  ],
  receptionist: [
    { title: 'Tổng quan', icon: LayoutDashboard, href: '/receptionist' },
    { title: 'Khách thuê', icon: Users, href: '/receptionist/tenants' },
    { title: 'Ghi điện nước', icon: Zap, href: '/receptionist/utilities' },
    { title: 'Khách ra vào', icon: UserCheck, href: '/receptionist/visitors' },
    { title: 'Thông báo', icon: Bell, href: '/receptionist/announcements' },
  ],
  tenant: [
    { title: 'Trang chủ', icon: Home, href: '/tenant' },
    { title: 'Hóa đơn', icon: Receipt, href: '/tenant/invoices' },
    { title: 'Báo sự cố', icon: Wrench, href: '/tenant/maintenance' },
    { title: 'Thông báo', icon: Bell, href: '/tenant/announcements' },
    { title: 'Liên hệ', icon: MessageSquare, href: '/tenant/contact' },
  ],
  maintenance: [
    { title: 'Tổng quan', icon: LayoutDashboard, href: '/maintenance' },
    { title: 'Yêu cầu mới', icon: ClipboardList, href: '/maintenance/requests' },
    { title: 'Đang xử lý', icon: Clock, href: '/maintenance/in-progress' },
    { title: 'Hoàn thành', icon: CheckCircle, href: '/maintenance/completed' },
  ],
};

const roleLabels: Record<UserRole, string> = {
  admin: 'Chủ trọ',
  'property-manager': 'Quản lý tòa nhà',
  accountant: 'Kế toán',
  receptionist: 'Lễ tân',
  tenant: 'Khách thuê',
  maintenance: 'Kỹ thuật',
};

interface DashboardSidebarProps {
  role: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function DashboardSidebar({ role, collapsed = false, onToggle }: DashboardSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navItems = navItemsByRole[role];

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { href: string }[]) => 
    children?.some(child => location.pathname === child.href);

  return (
    <aside className={cn(
      'h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 flex-shrink-0',
      collapsed ? 'w-[70px]' : 'w-[260px]'
    )}>
      {/* Header with Logo */}
      <div className={cn(
        "flex items-center border-b border-sidebar-border h-16",
        collapsed ? "justify-center px-2" : "px-4"
      )}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-md flex-shrink-0">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-sidebar-foreground leading-tight">SmartPMS</span>
              <span className="text-[10px] text-sidebar-muted uppercase tracking-wider">Quản lý nhà trọ</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto custom-scrollbar">
        {!collapsed && (
          <p className="px-3 mb-2 text-[11px] font-semibold text-sidebar-muted uppercase tracking-wider">
            Menu chính
          </p>
        )}
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      isParentActive(item.children) && 'bg-sidebar-accent text-sidebar-accent-foreground',
                      collapsed && 'justify-center'
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          expandedItems.includes(item.title) && "rotate-180"
                        )} />
                      </>
                    )}
                  </button>
                  {!collapsed && expandedItems.includes(item.title) && (
                    <ul className="mt-1 ml-4 pl-4 border-l border-sidebar-border/50 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            className={cn(
                              'block px-3 py-2 rounded-lg text-sm transition-all duration-200',
                              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                              isActive(child.href) && 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                            )}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href!}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    isActive(item.href!) && 'bg-sidebar-primary text-sidebar-primary-foreground',
                    collapsed && 'justify-center'
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse Toggle Button */}
      <div className="px-2 py-2 border-t border-sidebar-border">
        <button 
          onClick={onToggle}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-muted",
            collapsed && "justify-center"
          )}
        >
          <ChevronLeft className={cn(
            "h-5 w-5 transition-transform duration-300",
            collapsed && "rotate-180"
          )} />
          {!collapsed && <span>Thu gọn menu</span>}
        </button>
      </div>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
              NV
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">Nguyễn Văn An</p>
              <p className="text-xs text-sidebar-muted truncate">{roleLabels[role]}</p>
            </div>
            <Link 
              to="/"
              className="p-2 rounded-lg hover:bg-sidebar-border transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="h-4 w-4 text-sidebar-muted hover:text-sidebar-foreground" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
              NV
            </div>
            <Link 
              to="/"
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="h-4 w-4 text-sidebar-muted hover:text-sidebar-foreground" />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
