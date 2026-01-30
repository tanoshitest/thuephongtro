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
    <div className="min-h-screen flex w-full bg-muted/40">
      <DashboardSidebar 
        role={role} 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <DashboardHeader 
          title={title} 
          subtitle={subtitle} 
          breadcrumbs={defaultBreadcrumbs}
        />
        <main className="flex-1 p-6 overflow-y-auto bg-muted/40">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
