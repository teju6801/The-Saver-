"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminPage() {

  const [dogCount, setDogCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [lostCount, setLostCount] = useState(0);
  const [donationTotal, setDonationTotal] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {

    const fetchData = async () => {

      const dogsSnapshot = await getDocs(collection(db, "dogs"));
      setDogCount(dogsSnapshot.size);

      const requestsSnapshot = await getDocs(collection(db, "adoptions"));
      setRequestCount(requestsSnapshot.size);

      const lostSnapshot = await getDocs(collection(db, "lost-found"));
      setLostCount(lostSnapshot.size);

      const blogSnapshot = await getDocs(collection(db, "blog-posts"));
      setBlogCount(blogSnapshot.size);

      const donationSnapshot = await getDocs(collection(db, "donations"));

      let total = 0;
      donationSnapshot.forEach((doc) => {
        const data = doc.data();
        total += data.amount || 0;
      });

      setDonationTotal(total);

    };

    fetchData();

  }, []);

  return (
    <div className="page-container py-12">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

        {/* Dogs */}

        <Link href="/admin/dogs">
          <div className="card p-8">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4 p-3 bg-primary-100 rounded-2xl">🐕</span>
              <h2 className="text-xl font-bold text-gray-900">Manage Dogs</h2>
            </div>

            <p className="text-4xl font-bold text-orange-600 mb-3">
              {dogCount}
            </p>

            <p className="text-lg text-gray-600">
              View and add dogs
            </p>
          </div>
        </Link>

        {/* Adoption Requests */}

        <Link href="/admin/requests">
          <div className="card p-8">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">❤️</span>
              <h2 className="text-xl font-bold text-gray-900">Adoption Requests</h2>
            </div>

            <p className="text-4xl font-bold text-orange-600 mb-3">
              {requestCount}
            </p>

            <p className="text-lg text-gray-600">
              Manage requests
            </p>
          </div>
        </Link>

        {/* Lost & Found */}

        <Link href="/admin/lost-found">
          <div className="card p-8">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">📍</span>
              <h2 className="text-xl font-bold text-gray-900">Lost & Found</h2>
            </div>

            <p className="text-4xl font-bold text-orange-600 mb-3">
              {lostCount}
            </p>

            <p className="text-lg text-gray-600">
              Review reports
            </p>
          </div>
        </Link>

        {/* Donations */}

        <Link href="/admin/donations">
          <div className="card p-8">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">💰</span>
              <h2 className="text-xl font-bold text-gray-900">Donations</h2>
            </div>

            <p className="text-4xl font-bold text-orange-600 mb-3">
              ₹{donationTotal.toLocaleString()}
            </p>

            <p className="text-lg text-gray-600">
              Track contributions
            </p>
          </div>
        </Link>

        {/* Blog */}

        <Link href="/admin/blog">
          <div className="card p-8 lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">📝</span>
              <h2 className="text-xl font-bold text-gray-900">Blog</h2>
            </div>

            <p className="text-4xl font-bold text-orange-600 mb-3">
              {blogCount}
            </p>

            <p className="text-lg text-gray-600">
              Manage posts
            </p>
          </div>
        </Link>

      </div>

      <div className="text-center text-gray-500 text-sm">
        Click cards to navigate or use sidebar
      </div>

    </div>
  );
}