import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import RoomList from "./pages/admin/RoomList";
import RoomStatus from "./pages/admin/RoomStatus";
import TenantList from "./pages/admin/TenantList";
import ContractList from "./pages/admin/ContractList";
import Finance from "./pages/admin/Finance";
import Maintenance from "./pages/admin/Maintenance";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import PropertyManagerDashboard from "./pages/dashboards/PropertyManagerDashboard";
import AccountantDashboard from "./pages/dashboards/AccountantDashboard";
import AccountantPayments from "./pages/accountant/Payments";
import AccountantExpenses from "./pages/accountant/Expenses";
import AccountantInvoices from "./pages/accountant/Invoices";
import AccountantReceivables from "./pages/accountant/Receivables";
import AccountantReports from "./pages/accountant/Reports";
import ReceptionistDashboard from "./pages/dashboards/ReceptionistDashboard";
import ReceptionistTenants from "./pages/receptionist/Tenants";
import ReceptionistUtilities from "./pages/receptionist/UtilityReadings";
import ReceptionistVisitors from "./pages/receptionist/Visitors";
import ReceptionistAnnouncements from "./pages/receptionist/Announcements";
import TenantDashboard from "./pages/dashboards/TenantDashboard";
import TenantInvoices from "./pages/tenant/Invoices";
import TenantMaintenance from "./pages/tenant/Maintenance";
import TenantAnnouncements from "./pages/tenant/Announcements";
import TenantContact from "./pages/tenant/Contact";
import MaintenanceDashboard from "./pages/dashboards/MaintenanceDashboard";
import MaintenanceNewRequests from "./pages/maintenance/NewRequests";
import MaintenanceInProgress from "./pages/maintenance/InProgress";
import MaintenanceCompleted from "./pages/maintenance/Completed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<RoomList />} />
          <Route path="/admin/room-status" element={<RoomStatus />} />
          <Route path="/admin/tenants" element={<TenantList />} />
          <Route path="/admin/contracts" element={<ContractList />} />
          <Route path="/admin/finance" element={<Finance />} />
          <Route path="/admin/maintenance" element={<Maintenance />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/property-manager" element={<PropertyManagerDashboard />} />
          <Route path="/accountant" element={<AccountantDashboard />} />
          <Route path="/accountant/payments" element={<AccountantPayments />} />
          <Route path="/accountant/expenses" element={<AccountantExpenses />} />
          <Route path="/accountant/invoices" element={<AccountantInvoices />} />
          <Route path="/accountant/receivables" element={<AccountantReceivables />} />
          <Route path="/accountant/reports" element={<AccountantReports />} />
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/receptionist/tenants" element={<ReceptionistTenants />} />
          <Route path="/receptionist/utilities" element={<ReceptionistUtilities />} />
          <Route path="/receptionist/visitors" element={<ReceptionistVisitors />} />
          <Route path="/receptionist/announcements" element={<ReceptionistAnnouncements />} />
          <Route path="/tenant" element={<TenantDashboard />} />
          <Route path="/tenant/invoices" element={<TenantInvoices />} />
          <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
          <Route path="/tenant/announcements" element={<TenantAnnouncements />} />
          <Route path="/tenant/contact" element={<TenantContact />} />
          <Route path="/maintenance" element={<MaintenanceDashboard />} />
          <Route path="/maintenance/requests" element={<MaintenanceNewRequests />} />
          <Route path="/maintenance/in-progress" element={<MaintenanceInProgress />} />
          <Route path="/maintenance/completed" element={<MaintenanceCompleted />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
