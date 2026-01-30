import { useState } from 'react';
import { Bell, Search, ChevronDown, Settings, User, LogOut, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function DashboardHeader({ title, subtitle, breadcrumbs }: DashboardHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Thanh toán mới', message: 'Nguyễn Văn Minh vừa thanh toán tiền thuê tháng 1', time: '5 phút trước', unread: true },
    { id: 2, title: 'Yêu cầu bảo trì', message: 'Yêu cầu sửa chữa khẩn cấp tại A-2205', time: '15 phút trước', unread: true },
    { id: 3, title: 'Hợp đồng sắp hết hạn', message: '3 hợp đồng sẽ hết hạn trong 30 ngày tới', time: '1 giờ trước', unread: true },
    { id: 4, title: 'Ghi chỉ số điện nước', message: 'Đã hoàn thành ghi chỉ số tháng 1/2024', time: '2 giờ trước', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-card border-b border-border h-16 flex-shrink-0">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Breadcrumbs & Title */}
        <div className="flex flex-col justify-center">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-sm mb-0.5">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  {index > 0 && <span className="text-muted-foreground">/</span>}
                  {crumb.href ? (
                    <Link 
                      to={crumb.href} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {subtitle && (
              <>
                <span className="text-muted-foreground">•</span>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </>
            )}
          </div>
        </div>

        {/* Right Section - Search, Notifications, User */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm phòng, khách thuê..."
              className="w-72 pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/70"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="lg:hidden p-2.5 rounded-lg hover:bg-muted transition-colors">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative p-2.5 rounded-lg hover:bg-muted transition-colors"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-xl shadow-xl z-50 animate-scale-in overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Thông báo</h3>
                    <span className="text-xs text-primary font-medium cursor-pointer hover:underline">
                      Đánh dấu tất cả đã đọc
                    </span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-4 hover:bg-muted/50 border-b border-border last:border-0 cursor-pointer transition-colors",
                          notification.unread && "bg-primary/5"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          )}
                          <div className={cn("flex-1", !notification.unread && "ml-5")}>
                            <p className="text-sm font-medium text-foreground">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1.5">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border bg-muted/30">
                    <button className="w-full text-center text-sm text-primary hover:underline font-medium">
                      Xem tất cả thông báo
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border mx-1" />

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                NV
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-foreground">Nguyễn Văn An</p>
                <p className="text-xs text-muted-foreground">Chủ trọ</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </button>

            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 animate-scale-in overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <p className="font-semibold text-foreground">Nguyễn Văn An</p>
                    <p className="text-sm text-muted-foreground">an.nguyen@smartpms.vn</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Tài khoản của tôi
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      Cài đặt
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      Trợ giúp
                    </button>
                  </div>
                  <div className="py-2 border-t border-border">
                    <Link 
                      to="/"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
