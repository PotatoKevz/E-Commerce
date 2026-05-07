import { useState, useMemo } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Edit, Trash2, BarChart3, Receipt } from "lucide-react";
import { products as initialProducts } from "../data/products";
import { mockOrders, mockTransactions, getSalesStats, getSalesByDateRange, getTopSellingProducts } from "../data/orders";
import { SalesChart } from "../components/SalesChart";
import { TransactionTable } from "../components/TransactionTable";
import { SalesMetrics } from "../components/SalesMetrics";
import { DateRangeFilter } from "../components/DateRangeFilter";
import { CategorySalesBreakdown } from "../components/CategorySalesBreakdown";
import { ExportButton } from "../components/ExportButton";

export function SellerDashboard() {
  const { isSeller } = useAuth();
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({ stock: 0, price: 0 });
  const [activeTab, setActiveTab] = useState<"products" | "sales" | "transactions">("products");
  const [dateRange, setDateRange] = useState("7days");

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockProducts = products.filter(p => p.stock < 30).length;

  const salesStats = getSalesStats(mockOrders);
  const topProducts = getTopSellingProducts(mockOrders);

  // Calculate category breakdown
  const categorySales = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    mockOrders.forEach(order => {
      order.items.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          categoryTotals[product.category] = (categoryTotals[product.category] || 0) + (item.price * item.quantity);
        }
      });
    });

    const totalRevenue = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalRevenue) * 100
    }));
  }, [products]);

  // Calculate total products sold
  const totalProductsSold = useMemo(() => {
    return mockOrders.reduce((sum, order) => {
      return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);
  }, []);

  // Get unique customers
  const uniqueCustomers = useMemo(() => {
    return new Set(mockOrders.map(o => o.customerId)).size;
  }, []);

  const handleExport = (format: "csv" | "pdf") => {
    // In a real app, this would generate and download the report
    alert(`Exporting sales report as ${format.toUpperCase()}...`);
  };

  // Generate daily sales data for the chart (last 7 days)
  const salesChartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split("T")[0];
    });

    return last7Days.map(date => {
      const dayOrders = mockOrders.filter(order => order.orderDate.startsWith(date));
      return {
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        sales: dayOrders.reduce((sum, order) => sum + order.total, 0),
        orders: dayOrders.length
      };
    });
  }, []);

  if (!isSeller) {
    return <Navigate to="/login" />;
  }

  const handleEdit = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingProduct(productId);
      setEditForm({ 
        stock: product.stock, 
        price: product.price
      });
    }
  };

  const handleSave = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { 
            ...p, 
            stock: editForm.stock, 
            price: editForm.price
          }
        : p
    ));
    setEditingProduct(null);
  };

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your product listings and inventory</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === "products"
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Products
              </div>
              {activeTab === "products" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("sales")}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === "sales"
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Sales Reports
              </div>
              {activeTab === "sales" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === "transactions"
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Transactions
              </div>
              {activeTab === "transactions" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">My Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Stock</p>
                <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Inventory Value</p>
                <p className="text-2xl font-bold text-gray-900">₱{totalValue.toFixed(0)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Low Stock Alert</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockProducts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">My Product Listings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingProduct === product.id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-gray-900">₱{product.price}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingProduct === product.id ? (
                        <input
                          type="number"
                          value={editForm.stock}
                          onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span className={`text-sm font-medium ${product.stock < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                          {product.stock} units
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingProduct === product.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(product.id)}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="text-gray-600 hover:text-gray-800 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="text-orange-500 hover:text-orange-600"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Sales Reports Tab */}
        {activeTab === "sales" && (
          <div className="space-y-6">
            {/* Header with Date Filter and Export */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Sales Analytics</h2>
              <div className="flex items-center gap-4">
                <DateRangeFilter selectedRange={dateRange} onRangeChange={setDateRange} />
                <ExportButton onExport={handleExport} />
              </div>
            </div>

            {/* Enhanced Sales Metrics */}
            <SalesMetrics
              totalRevenue={salesStats.totalSales}
              totalOrders={salesStats.totalOrders}
              averageOrderValue={salesStats.averageOrderValue}
              totalCustomers={uniqueCustomers}
              productsSold={totalProductsSold}
              pendingOrders={salesStats.pendingOrders}
              revenueChange={15.3}
              ordersChange={8.7}
              customersChange={12.4}
            />

            {/* Sales Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Trend Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Sales Trend (Last 7 Days)</h3>
                <SalesChart data={salesChartData} type="line" />
              </div>

              {/* Category Breakdown */}
              <CategorySalesBreakdown data={categorySales} />
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Best Selling Product</p>
                  <p className="text-lg font-bold text-gray-900">{topProducts[0]?.name || "N/A"}</p>
                  <p className="text-sm text-orange-600 mt-1">{topProducts[0]?.quantity || 0} units sold</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                  <p className="text-lg font-bold text-gray-900">
                    {((salesStats.completedOrders / salesStats.totalOrders) * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-green-600 mt-1">Orders completed</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Categories</p>
                  <p className="text-lg font-bold text-gray-900">{categorySales.length}</p>
                  <p className="text-sm text-blue-600 mt-1">Product categories</p>
                </div>
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Units Sold
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topProducts.slice(0, 5).map((product) => (
                      <tr key={product.productId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {product.quantity} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ₱{product.revenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
              <p className="text-sm text-gray-600 mt-1">All transactions and payment records</p>
            </div>
            <TransactionTable transactions={mockTransactions} />
          </div>
        )}
      </div>
    </div>
  );
}
