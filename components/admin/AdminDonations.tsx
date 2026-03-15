"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import DonationChart from "@/app/admin/DonationChart";

export default function AdminDonations() {
  const [stats, setStats] = useState({ total: 0, count: 0, recent: [] as any[], chartData: [] as any[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const donationsQuery = query(
      collection(db, "donations"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(donationsQuery, (snapshot) => {
      let total = 0;
      let recent: any[] = [];
      const list: any[] = [];
      const dateMap = new Map();

      snapshot.forEach((docItem) => {
        const data = docItem.data();
        const date = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
        const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

        total += data.amount || 0;
        list.push({
          id: docItem.id,
          ...data
        });

        // Aggregate for chart
        if (dateKey) {
          if (dateMap.has(dateKey)) {
            dateMap.set(dateKey, dateMap.get(dateKey) + (data.amount || 0));
          } else {
            dateMap.set(dateKey, data.amount || 0);
          }
        }
      });

      // Recent 3 donations
      recent = list.slice(0, 3);

      // Chart data (last 7 days or available)
      const chartData = Array.from(dateMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(-7)
        .map(([date, amount]) => ({ date, amount }));

      setStats({ total, count: list.length, recent, chartData });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-500">Loading donations...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            💰 Donations
          </h2>
          <p className="text-lg text-gray-600 mt-1">
            {stats.count} donations • ₹{stats.total.toLocaleString()}
          </p>
        </div>
        <Link
          href="/admin/donations"
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 font-medium"
        >
          View All
        </Link>
      </div>

      {/* Stats + Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Total + Chart */}
        <div>
          {/* Total Raised Card */}
          <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
            <p className="text-gray-600 font-medium mb-2">Total Raised</p>
            <p className="text-3xl font-bold text-orange-600">
              ₹{stats.total.toLocaleString()}
            </p>
          </div>

          {/* Donation Chart */}
          {stats.chartData.length > 0 ? (
            <DonationChart data={stats.chartData} />
          ) : (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center text-gray-500">
              Add donations to see chart
            </div>
          )}
        </div>

        {/* Right: Recent Table */}
        <div>
          {stats.recent.length > 0 ? (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200 h-full">
              <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
              <div className="overflow-hidden rounded-xl">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Donor</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">UTR</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.recent.map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 font-medium text-sm">{donation.donorName || "Anonymous"}</td>
                        <td className="px-4 py-4 font-semibold text-orange-600 text-sm">
                          ₹{donation.amount?.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 font-mono text-xs text-gray-500 max-w-xs truncate" title={donation.utr}>
                          {donation.utr ? `${donation.utr.slice(0,12)}...` : 'N/A'}
                        </td>
                        <td className="px-4 py-4 text-gray-600 text-sm">{donation.paymentMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center text-gray-500 h-full flex items-center justify-center">
              No donations yet. Make a test donation via{' '}
              <Link href="/donate" className="text-orange-500 hover:underline ml-1">/donate</Link>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
