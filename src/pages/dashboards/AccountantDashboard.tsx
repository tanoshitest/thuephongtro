import { DashboardLayout } from '@/components/pms/DashboardLayout';
import { DataTable } from '@/components/pms/DataTable';
import { StatusBadge } from '@/components/pms/StatusBadge';
import { 
  Plus,
  Filter,
  Download
} from 'lucide-react';

// Invoice type for this view
interface Invoice {
  id: string;
  room: string;
  customerName: string;
  period: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: 'paid' | 'pending' | 'partial';
}

export default function AccountantDashboard() {
  // Invoice data as specified
  const invoices: Invoice[] = [
    {
      id: 'HĐ2310-01',
      room: 'P.301',
      customerName: 'Nguyễn Văn Hùng',
      period: '10/2023',
      totalAmount: 4500000,
      paidAmount: 4500000,
      remainingAmount: 0,
      status: 'paid',
    },
    {
      id: 'HĐ2310-02',
      room: 'P.302',
      customerName: 'Lê Thị Mai Hương',
      period: '10/2023',
      totalAmount: 3800000,
      paidAmount: 0,
      remainingAmount: 3800000,
      status: 'pending',
    },
    {
      id: 'HĐ2310-03',
      room: 'P.405',
      customerName: 'Trần Quang Dũng',
      period: '10/2023',
      totalAmount: 5200000,
      paidAmount: 2000000,
      remainingAmount: 3200000,
      status: 'partial',
    },
    {
      id: 'HĐ2310-04',
      room: 'P.201',
      customerName: 'Phạm Thu Trang',
      period: '10/2023',
      totalAmount: 4200000,
      paidAmount: 4200000,
      remainingAmount: 0,
      status: 'paid',
    },
    {
      id: 'HĐ2310-05',
      room: 'P.503',
      customerName: 'Hoàng Văn Đức',
      period: '10/2023',
      totalAmount: 3500000,
      paidAmount: 0,
      remainingAmount: 3500000,
      status: 'pending',
    },
    {
      id: 'HĐ2310-06',
      room: 'P.102',
      customerName: 'Vũ Thị Hồng Nhung',
      period: '10/2023',
      totalAmount: 4800000,
      paidAmount: 4800000,
      remainingAmount: 0,
      status: 'paid',
    },
    {
      id: 'HĐ2310-07',
      room: 'P.404',
      customerName: 'Đỗ Minh Tuấn',
      period: '10/2023',
      totalAmount: 3900000,
      paidAmount: 1500000,
      remainingAmount: 2400000,
      status: 'partial',
    },
    {
      id: 'HĐ2310-08',
      room: 'P.305',
      customerName: 'Ngô Thị Lan Anh',
      period: '10/2023',
      totalAmount: 4100000,
      paidAmount: 4100000,
      remainingAmount: 0,
      status: 'paid',
    },
  ];

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const invoiceColumns = [
    { key: 'id', header: 'Mã HĐ' },
    { key: 'room', header: 'Phòng' },
    { key: 'customerName', header: 'Khách hàng' },
    { key: 'period', header: 'Kỳ thanh toán' },
    { 
      key: 'totalAmount', 
      header: 'Tổng tiền',
      render: (item: Invoice) => (
        <span className="font-medium">{formatVND(item.totalAmount)}</span>
      )
    },
    { 
      key: 'paidAmount', 
      header: 'Đã thu',
      render: (item: Invoice) => (
        <span className={item.paidAmount > 0 ? 'text-success font-medium' : 'text-muted-foreground'}>
          {formatVND(item.paidAmount)}
        </span>
      )
    },
    { 
      key: 'remainingAmount', 
      header: 'Còn lại',
      render: (item: Invoice) => (
        <span className={item.remainingAmount > 0 ? 'text-destructive font-medium' : 'text-muted-foreground'}>
          {formatVND(item.remainingAmount)}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Trạng thái',
      render: (item: Invoice) => {
        const statusMap: Record<string, { label: string; variant: 'paid' | 'pending' | 'overdue' }> = {
          paid: { label: 'Đã thanh toán', variant: 'paid' },
          pending: { label: 'Chưa thanh toán', variant: 'overdue' },
          partial: { label: 'Thanh toán một phần', variant: 'pending' },
        };
        const status = statusMap[item.status];
        return <StatusBadge status={status.variant} customLabel={status.label} />;
      }
    },
  ];

  // Summary stats
  const totalInvoices = invoices.length;
  const paidCount = invoices.filter(i => i.status === 'paid').length;
  const pendingCount = invoices.filter(i => i.status === 'pending').length;
  const partialCount = invoices.filter(i => i.status === 'partial').length;
  const totalRevenue = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalRemaining = invoices.reduce((acc, i) => acc + i.remainingAmount, 0);

  return (
    <DashboardLayout 
      role="accountant" 
      title="Tổng quan"
      subtitle="Quản lý thu chi, xuất hóa đơn, công nợ"
      breadcrumbs={[
        { label: 'Trang chủ', href: '/accountant' },
        { label: 'Tổng quan' }
      ]}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground">Tổng hóa đơn</p>
          <p className="text-2xl font-bold text-foreground mt-1">{totalInvoices}</p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-success">{paidCount} đã thu</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-warning">{partialCount} một phần</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-destructive">{pendingCount} chưa thu</span>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-foreground mt-1">{formatVND(totalRevenue)}</p>
          <p className="text-xs text-muted-foreground mt-2">Kỳ 10/2023</p>
        </div>
        <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 p-4">
          <p className="text-sm text-muted-foreground">Đã thu</p>
          <p className="text-2xl font-bold text-success mt-1">{formatVND(totalCollected)}</p>
          <p className="text-xs text-muted-foreground mt-2">{((totalCollected / totalRevenue) * 100).toFixed(1)}% hoàn thành</p>
        </div>
        <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl border border-destructive/20 p-4">
          <p className="text-sm text-muted-foreground">Còn phải thu</p>
          <p className="text-2xl font-bold text-destructive mt-1">{formatVND(totalRemaining)}</p>
          <p className="text-xs text-muted-foreground mt-2">{pendingCount + partialCount} hóa đơn chưa đủ</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-6">
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
          <Plus className="h-4 w-4" />
          Tạo phiếu thu
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm">
          <Plus className="h-4 w-4" />
          Tạo phiếu chi
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm">
          <Filter className="h-4 w-4" />
          Bộ lọc
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm">
          <Download className="h-4 w-4" />
          Xuất Excel
        </button>
      </div>

      {/* Invoice Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Danh sách Hóa đơn - Tháng 10/2023</h3>
          <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background">
            <option>Tháng 10/2023</option>
            <option>Tháng 9/2023</option>
            <option>Tháng 8/2023</option>
          </select>
        </div>
        <DataTable data={invoices} columns={invoiceColumns} />
      </div>
    </DashboardLayout>
  );
}
