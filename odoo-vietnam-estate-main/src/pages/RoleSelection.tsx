import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  UserCheck, 
  Home,
  Wrench,
  ArrowRight,
  Building2
} from 'lucide-react';
import { roles } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/pms';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Calculator,
  UserCheck,
  Home,
  Wrench,
};

const colorMap: Record<string, { bg: string; border: string; icon: string; hover: string; ring: string }> = {
  primary: {
    bg: 'bg-primary/5',
    border: 'border-primary/20 hover:border-primary/50',
    icon: 'bg-primary text-primary-foreground',
    hover: 'hover:bg-primary/10',
    ring: 'group-hover:ring-primary/20',
  },
  info: {
    bg: 'bg-info/5',
    border: 'border-info/20 hover:border-info/50',
    icon: 'bg-info text-info-foreground',
    hover: 'hover:bg-info/10',
    ring: 'group-hover:ring-info/20',
  },
  success: {
    bg: 'bg-success/5',
    border: 'border-success/20 hover:border-success/50',
    icon: 'bg-success text-success-foreground',
    hover: 'hover:bg-success/10',
    ring: 'group-hover:ring-success/20',
  },
  tenant: {
    bg: 'bg-gradient-to-br from-secondary/10 to-primary/10',
    border: 'border-secondary/30 hover:border-secondary/60 ring-2 ring-secondary/10',
    icon: 'bg-gradient-to-br from-secondary to-primary text-white',
    hover: 'hover:from-secondary/15 hover:to-primary/15',
    ring: 'group-hover:ring-secondary/30',
  },
  warning: {
    bg: 'bg-warning/5',
    border: 'border-warning/20 hover:border-warning/50',
    icon: 'bg-warning text-warning-foreground',
    hover: 'hover:bg-warning/10',
    ring: 'group-hover:ring-warning/20',
  },
};

const routeMap: Record<UserRole, string> = {
  admin: '/admin',
  'property-manager': '/property-manager',
  accountant: '/accountant',
  receptionist: '/receptionist',
  tenant: '/tenant',
  maintenance: '/maintenance',
};

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SmartPMS</h1>
              <p className="text-sm text-muted-foreground">Hệ thống Quản lý Nhà trọ Thông minh</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Hệ thống Quản lý Nhà trọ Thông minh
            </h2>
            <p className="text-xl text-primary font-semibold mb-2">SmartPMS</p>
            <p className="text-muted-foreground text-lg">
              Vui lòng chọn vai trò để tiếp tục
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, index) => {
              const IconComponent = iconMap[role.icon] || LayoutDashboard;
              const colors = colorMap[role.color] || colorMap.primary;
              const isTenantPortal = role.id === 'tenant';

              return (
                <Link
                  key={role.id}
                  to={routeMap[role.id as UserRole]}
                  className={cn(
                    'group role-card relative p-6 rounded-2xl border-2 transition-all duration-300',
                    colors.bg,
                    colors.border,
                    'hover:shadow-lg',
                    'animate-slide-up',
                    isTenantPortal && 'lg:col-span-1 sm:col-span-2 lg:col-start-2 lg:row-start-2'
                  )}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Special badge for Tenant Portal */}
                  {isTenantPortal && (
                    <div className="absolute -top-2 -right-2 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full shadow-md">
                      Cổng cư dân
                    </div>
                  )}

                  <div className="flex flex-col h-full">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-md',
                      colors.icon
                    )}>
                      <IconComponent className="h-7 w-7" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {role.titleVi}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium mb-3">
                        {role.title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {role.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                      <span>Truy cập hệ thống</span>
                      <ArrowRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 SmartPMS - Hệ thống Quản lý Nhà trọ Thông minh. Phát triển bởi Công ty TNHH Công nghệ SmartPMS Việt Nam.
          </p>
        </div>
      </footer>
    </div>
  );
}
