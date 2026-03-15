"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function DonationQR() {
  const [amount, setAmount] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    const upiLink = `upi://pay?pa=thesaver@upi&pn=TheSaver&am=${amount}&cu=INR`;
    const qrCode = await QRCode.toDataURL(upiLink);
    setQr(qrCode);
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-6">

      <h1 className="text-3xl font-bold">Donate</h1>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <button
        onClick={generateQR}
        className="bg-orange-500 text-white px-6 py-3 rounded"
      >
        Generate QR
      </button>

      {qr && (
        <div className="mt-6">
          <img src={qr} alt="UPI QR" className="mx-auto w-64" />
        </div>
      )}

    </div>
  );
}