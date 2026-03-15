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

    const upiLink = `upi://pay?pa=yoursaver@upi&pn=Dog Rescue&am=${donationAmount}&cu=INR`;

    const qrCode = await QRCode.toDataURL(upiLink);

    setQr(qrCode);
    setAmount(donationAmount.toString());
  };

  // Save donation
  const saveDonation = async () => {
    if (!name.trim() || !amount || !utr.trim()) {
      alert("Please fill Name, Amount, UTR to submit");
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
      <div className="page-container flex flex-col items-center space-y-16 lg:space-y-20">
  
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent mb-6">
            Support Dog Rescue
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every donation saves a life. Join hundreds of supporters giving stray dogs hope.
          </p>
        </div>

        {/* Progress Card */}
        <div className="card w-full max-w-2xl text-center p-10 lg:p-12">
          <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            ₹{totalRaised.toLocaleString()}
          </div>
          <p className="text-lg text-gray-600 mb-8">
            of ₹{goal.toLocaleString()} goal
          </p>
          <div className="progress-bar mb-4">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-lg font-semibold text-gray-700">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Main Donation Form */}
        <div className="card w-full max-w-lg p-10 lg:p-12 text-center space-y-8">
          
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Donate via UPI
            </h2>
            <p className="text-xl text-gray-600">
              Scan QR code with your UPI app (GPay, PhonePe, Paytm)
            </p>
          </div>

          {/* Donor Name */}
          <input
            type="text"
            className="form-input text-center"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Quick Donate Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => generateQR(100)} className="btn-primary h-14 text-lg font-semibold">₹100</button>
            <button onClick={() => generateQR(500)} className="btn-primary h-14 text-lg font-semibold">₹500</button>
            <button onClick={() => generateQR(1000)} className="btn-primary h-14 text-lg font-semibold">₹1000</button>
          </div>

          {/* Custom Amount */}
          <input
            type="number"
            min="10"
            className="form-input text-center text-2xl"
            placeholder="Custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* UTR */}
          <div>
            <input
              type="text"
              className="form-input text-center"
              placeholder="Transaction ID / UTR (required after payment)"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Find UTR in your UPI app payment history
            </p>
          </div>

          <button
            onClick={() => generateQR()}
            disabled={!amount}
            className="w-full btn-primary text-lg h-14"
          >
            {amount ? `Generate ₹${Number(amount).toLocaleString()} QR` : 'Enter Amount'}
          </button>

          {/* QR + Submit */}
          {qr && (
            <div className="card p-8 space-y-6">
              <div className="w-72 h-72 mx-auto bg-white p-4 rounded-2xl shadow-xl">
                <img src={qr} alt="UPI QR Code" className="w-full h-full" />
              </div>
              <p className="text-lg text-gray-700 font-medium">
                Scan to pay ₹{Number(amount).toLocaleString()}
              </p>
              <button
                onClick={saveDonation}
                disabled={!name.trim() || !utr.trim()}
                className="w-full btn-success text-lg h-14"
              >
                ✅ Submit Donation Details
              </button>
            </div>
          )}

        </div>

        {/* Recent Donors */}
        <div className="card w-full max-w-2xl p-10 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
            ❤️ Recent Supporters
          </h3>
          <div className="divide-y divide-gray-100">
            {donors.map((donor, i) => (
              <div key={i} className="flex justify-between items-center py-4">
                <span className="text-lg font-semibold text-gray-900">
                  {donor.donorName || "Anonymous"}
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                  +₹{donor.amount?.toLocaleString()}
                </span>
              </div>
            ))}
            {donors.length === 0 && (
              <p className="text-center py-12 text-xl text-gray-500">
                Be our first supporter today! 🐶❤️
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
