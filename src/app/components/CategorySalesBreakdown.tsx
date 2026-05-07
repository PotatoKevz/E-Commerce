import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CategorySalesBreakdownProps {
  data: { name: string; value: number; percentage: number }[];
}

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];

export function CategorySalesBreakdown({ data }: CategorySalesBreakdownProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-6">Sales by Category</h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `₱${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((category, index) => (
          <div key={category.name} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{category.name}</p>
              <p className="text-xs text-gray-500">₱{category.value.toFixed(2)}</p>
            </div>
            <span className="text-sm font-semibold text-gray-900">{category.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
