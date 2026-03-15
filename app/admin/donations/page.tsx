"use client";

import { useEffect, useState } from "react";
import DonationChart from "@/app/admin/DonationChart";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

export default function AdminDonationsPage() {

  const [donations, setDonations] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
 
  const chartData = donations.map((d) => {

  const date = d.createdAt
    ? new Date(d.createdAt.seconds * 1000)
    : new Date();

  return {
    date: date.toLocaleDateString(),
    amount: d.amount
  };

});




  useEffect(() => {

    const donationsQuery = query(
      collection(db, "donations"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(donationsQuery, (snapshot) => {

      let list: any[] = [];
      let sum = 0;

      snapshot.forEach((docItem) => {

        const data = docItem.data();

        sum += data.amount || 0;

        list.push({
          id: docItem.id,
          ...data
        });

      });

      setDonations(list);
      setTotal(sum);

    });

    return () => unsubscribe();

  }, []);

  

  const deleteDonation = async (id: string) => {
    await deleteDoc(doc(db, "donations", id));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">

      <h1 className="text-3xl font-bold mb-8">
        Donations Dashboard
      </h1>

      {/* Total Donations */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <p className="text-gray-600">
          Total Raised
        </p>

        <p className="text-3xl font-bold text-orange-500">
          ₹{total.toLocaleString()}
        </p>

      </div>

      {/* Donation Chart */}

<DonationChart data={chartData} />

      {/* Donation Table */}

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b">

              <th className="py-2">Donor</th>
              <th>Amount</th>
              <th>UTR</th>
              <th>Method</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {donations.map((donation) => (

              <tr key={donation.id} className="border-b">

                <td className="py-2">
                  {donation.donorName}
                </td>

                <td>
                  ₹{donation.amount}
                </td>

                <td className="font-mono text-sm max-w-xs truncate" title={donation.utr}>
                  {donation.utr ? `${donation.utr.slice(0,15)}...` : 'N/A'}
                </td>

                <td>
                  {donation.paymentMethod}
                </td>

                <td>

                  <button
                    onClick={() => deleteDonation(donation.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}