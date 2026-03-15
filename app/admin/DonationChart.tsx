"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function DonationChart({ data }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">

      <h2 className="text-lg font-semibold mb-4">
        Donations This Month
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#f97316"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}