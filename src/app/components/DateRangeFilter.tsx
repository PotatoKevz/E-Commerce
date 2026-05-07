import { Calendar } from "lucide-react";

interface DateRangeFilterProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function DateRangeFilter({ selectedRange, onRangeChange }: DateRangeFilterProps) {
  const ranges = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "1year", label: "Last Year" },
    { value: "all", label: "All Time" }
  ];

  return (
    <div className="flex items-center gap-3">
      <Calendar className="w-5 h-5 text-gray-600" />
      <select
        value={selectedRange}
        onChange={(e) => onRangeChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        {ranges.map(range => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
}
