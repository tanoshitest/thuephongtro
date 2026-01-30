// Vietnamese Property Management System Types

export type UserRole =
  | 'admin'
  | 'property-manager'
  | 'accountant'
  | 'receptionist'
  | 'tenant'
  | 'maintenance';

export interface RoleInfo {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  icon: string;
  color: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface Tenant {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  identityNumber: string;
  unit: string;
  property: string;
  moveInDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  depositAmount: number;
  status: 'active' | 'pending' | 'expired';
}

export interface Payment {
  id: string;
  tenantName: string;
  unit: string;
  property: string;
  amount: number;
  type: 'rent' | 'utility' | 'deposit' | 'maintenance' | 'other';
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  method?: 'bank_transfer' | 'cash' | 'momo' | 'vnpay';
}

export interface MaintenanceRequest {
  id: string;
  tenantName: string;
  unit: string;
  property: string;
  category: 'plumbing' | 'electrical' | 'appliance' | 'structural' | 'hvac' | 'other';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  assignedTo?: string;
  completedAt?: string;
}

export interface Visitor {
  id: string;
  visitorName: string;
  visitorPhone: string;
  visitingTenant: string;
  unit: string;
  purpose: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'checked_in' | 'checked_out';
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'destructive';
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  property: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  approvedBy?: string;
}

export interface Room {
  id: string;
  unit: string;
  property: string;
  type: 'studio' | '1br' | '2br' | '3br' | 'penthouse';
  price: number;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  floor: number;
  area: number;
  tenantName?: string;
  images?: string[];
  features?: string[];
}

export interface Contract {
  id: string;
  tenantId: string;
  tenantName: string;
  property: string;
  unit: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  depositAmount: number;
  status: 'active' | 'expired' | 'terminated' | 'pending_renewal';
  fileUrl?: string;
}

export interface UtilityReading {
  id: string;
  property: string;
  unit: string;
  tenantName: string;
  month: string; // MM/YYYY
  previousElectric: number;
  currentElectric: number;
  previousWater: number;
  currentWater: number;
  status: 'recorded' | 'billed';
  recordedDate?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  recipients: 'all' | string; // 'all' or specific property name
  priority: 'normal' | 'high' | 'urgent';
  sender: string;
}
