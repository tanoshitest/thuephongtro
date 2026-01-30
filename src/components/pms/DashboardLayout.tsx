import { useState } from 'react';
import { UserRole } from '@/types/pms';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  role: UserRole;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children: React.ReactNode;
}

export function DashboardLayout({ role, title, subtitle, breadcrumbs, children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Generate default breadcrumbs if not provided
  const defaultBreadcrumbs = breadcrumbs || [
    { label: 'Trang chủ', href: `/${role === 'property-manager' ? 'property-manager' : role}` },
    { label: title }
  ];

  return (
    <div className="h-screen w-full bg-muted/40 flex overflow-hidden">
      <DashboardSidebar 
        role={role} 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardHeader 
          title={title} 
          subtitle={subtitle} 
          breadcrumbs={defaultBreadcrumbs}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
