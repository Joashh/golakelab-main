"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function LakeBarChart({ data }: { data: any[] }) {
  
  return (
    <div className="w-full h-[420px] bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Fish Species per Lake
        </h2>
        <p className="text-sm text-slate-500">
          Comparison of biodiversity across lakes
        </p>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
                
              }}
            />

            <Bar dataKey="fishSpecies" radius={[10, 10, 0, 0]} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}