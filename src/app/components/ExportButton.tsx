import { Download } from "lucide-react";

interface ExportButtonProps {
  onExport: (format: "csv" | "pdf") => void;
  label?: string;
}

export function ExportButton({ onExport, label = "Export Report" }: ExportButtonProps) {
  return (
    <div className="relative inline-block">
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group">
        <Download className="w-4 h-4 text-gray-600 group-hover:text-orange-500" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </button>
      <div className="hidden group-hover:block absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        <button
          onClick={() => onExport("csv")}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors rounded-t-lg"
        >
          Export as CSV
        </button>
        <button
          onClick={() => onExport("pdf")}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors rounded-b-lg"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
