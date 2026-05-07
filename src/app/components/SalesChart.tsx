import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface SalesChartProps {
  data: { date: string; sales: number; orders: number }[];
  type?: "bar" | "line";
}

export function SalesChart({ data, type = "bar" }: SalesChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        {type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "sales") return [`₱${value.toFixed(2)}`, "Sales"];
                return [value, "Orders"];
              }}
            />
            <Bar dataKey="sales" fill="#f97316" name="Sales" />
            <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "sales") return [`₱${value.toFixed(2)}`, "Sales"];
                return [value, "Orders"];
              }}
            />
            <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} name="Sales" />
            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="Orders" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
