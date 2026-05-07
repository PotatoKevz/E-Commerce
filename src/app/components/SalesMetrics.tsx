import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

function MetricCard({ title, value, change, icon, iconBgColor, iconColor }: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <div className={iconColor}>{icon}</div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

interface SalesMetricsProps {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
  productsSold: number;
  pendingOrders: number;
  revenueChange?: number;
  ordersChange?: number;
  customersChange?: number;
}

export function SalesMetrics({
  totalRevenue,
  totalOrders,
  averageOrderValue,
  totalCustomers,
  productsSold,
  pendingOrders,
  revenueChange,
  ordersChange,
  customersChange
}: SalesMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Total Revenue"
        value={`₱${totalRevenue.toFixed(2)}`}
        change={revenueChange}
        icon={<DollarSign className="w-6 h-6" />}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <MetricCard
        title="Total Orders"
        value={totalOrders}
        change={ordersChange}
        icon={<ShoppingBag className="w-6 h-6" />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <MetricCard
        title="Average Order Value"
        value={`₱${averageOrderValue.toFixed(2)}`}
        icon={<TrendingUp className="w-6 h-6" />}
        iconBgColor="bg-orange-100"
        iconColor="text-orange-600"
      />
      <MetricCard
        title="Total Customers"
        value={totalCustomers}
        change={customersChange}
        icon={<Users className="w-6 h-6" />}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
      <MetricCard
        title="Products Sold"
        value={productsSold}
        icon={<Package className="w-6 h-6" />}
        iconBgColor="bg-indigo-100"
        iconColor="text-indigo-600"
      />
      <MetricCard
        title="Pending Orders"
        value={pendingOrders}
        icon={<ShoppingBag className="w-6 h-6" />}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
    </div>
  );
}
