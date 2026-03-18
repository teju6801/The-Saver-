"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

type Donation = {
  donorName?: string;
  amount?: number;
  utr?: string;
};

import Navbar from "@/components/Navbar";

export default function DonatePage() {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(""); 

  const [utr, setUtr] = useState("");
  const [qr, setQr] = useState("");

  const [totalRaised, setTotalRaised] = useState(0);
  const [donors, setDonors] = useState<Donation[]>([]);

  const goal = 50000;

  // Generate QR
  const generateQR = async (value?: number) => {

    const donationAmount = value ?? Number(amount);

    if (!donationAmount) return;

    const upiLink =
      `upi://pay?pa=yoursaver@upi&pn=Dog Rescue&am=${donationAmount}&cu=INR`;

    const qrCode = await QRCode.toDataURL(upiLink);

    setQr(qrCode);
    setAmount(donationAmount.toString());
  };

  // Save donation
  const saveDonation = async () => {

    if (!name.trim() || !amount || !utr.trim()) {
      alert("Please fill Name, Amount, and UTR");
      return;
    }

    await addDoc(collection(db, "donations"), {
      donorName: name,
      amount: Number(amount),
      utr: utr,
      paymentMethod: "UPI",
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("Donation submitted for verification ❤️");

    setName("");
    setAmount("");
    setQr("");
    setUtr("");

    fetchDonations();
  };

  // Fetch donations
  const fetchDonations = async () => {

    const snapshot = await getDocs(collection(db, "donations"));

    let sum = 0;
    const donorList: Donation[] = [];

    snapshot.forEach((doc) => {

      const data = doc.data() as Donation;

      sum += data.amount || 0;

      donorList.push({
        donorName: data.donorName,
        amount: data.amount,
      });

    });

    setTotalRaised(sum);
    setDonors(donorList.slice(0, 5));
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const progress = Math.min((totalRaised / goal) * 100, 100);

  return (
    <section className="section py-28">

      <div className="page-container flex flex-col items-center space-y-16">

        {/* Title */}
        <div className="text-center max-w-3xl">

          <h1 className="heading-1 mb-6">
            Support Dog Rescue
          </h1>

          <p className="body-primary text-gray-600">
            Every donation helps save stray dogs.
          </p>

        </div>

        {/* Progress */}
        <div className="card w-full max-w-xl text-center p-8">

          <div className="text-3xl font-bold">
            ₹{totalRaised.toLocaleString()}
          </div>

          <p className="text-gray-600 mb-6">
            of ₹{goal.toLocaleString()} goal
          </p>

          <div className="w-full bg-gray-200 h-3 rounded-full mb-3">

            <div
              className="bg-orange-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />

          </div>

          <p>{Math.round(progress)}% complete</p>

        </div>

        {/* Donation Card */}
        <div className="card w-full max-w-lg p-8 space-y-6 text-center">

          <h2 className="text-2xl font-bold">
            Donate via UPI
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="form-input text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Quick Amount */}
          <div className="grid grid-cols-3 gap-3">

            <button
              onClick={() => generateQR(100)}
              className="btn-primary"
            >
              ₹100
            </button>

            <button
              onClick={() => generateQR(500)}
              className="btn-primary"
            >
              ₹500
            </button>

            <button
              onClick={() => generateQR(1000)}
              className="btn-primary"
            >
              ₹1000
            </button>

          </div>

          <input
            type="number"
            min="10"
            className="form-input text-center"
            placeholder="Custom Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={() => generateQR()}
            disabled={!amount}
            className="btn-primary w-full"
          >
            Generate QR
          </button>

          {/* QR */}
          {qr && (

            <div className="space-y-4">

              <img
                src={qr}
                alt="UPI QR"
                className="w-64 mx-auto"
              />

              <p>
                Scan to pay ₹{Number(amount).toLocaleString()}
              </p>

            </div>

          )}

          {/* UTR */}
          <input
            type="text"
            placeholder="Transaction ID / UTR"
            className="form-input text-center"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
          />

          <button
            onClick={saveDonation}
            disabled={!name.trim() || !utr.trim()}
            className="btn-success w-full"
          >
            Submit Donation Details
          </button>

        </div>

        {/* Recent Donors */}
        <div className="card w-full max-w-xl p-8">

          <h3 className="text-2xl font-bold text-center mb-6">
            ❤️ Recent Supporters
          </h3>

          {donors.map((donor, i) => (

            <div
              key={i}
              className="flex justify-between py-3"
            >

              <span>
                {donor.donorName || "Anonymous"}
              </span>

              <span>
                ₹{donor.amount?.toLocaleString()}
              </span>

            </div>

          ))}

          {donors.length === 0 && (
            <p className="text-center text-gray-500">
              Be the first supporter ❤️
            </p>
          )}

        </div>

      </div>

    </section>
  );
}