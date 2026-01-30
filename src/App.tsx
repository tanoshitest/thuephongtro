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
import ReceptionistDashboard from "./pages/dashboards/ReceptionistDashboard";
import TenantDashboard from "./pages/dashboards/TenantDashboard";
import MaintenanceDashboard from "./pages/dashboards/MaintenanceDashboard";
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
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/tenant" element={<TenantDashboard />} />
          <Route path="/maintenance" element={<MaintenanceDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
