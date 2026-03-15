"use client";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function RequestRow({ request }: { request: any }) {

  const approveRequest = async () => {
    try {

      console.log("Approving request:", request);

      // update firestore
      await updateDoc(doc(db, "adoptions", request.id), {
        status: "approved"
      });

      console.log("Firestore updated");

      // send email
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: request.email,
          dogName: request.dogName
        })
      });

      const data = await res.json();

      console.log("Email response:", data);

    } catch (error) {

      console.error("Approve error:", error);

    }
  };

  return (
    <tr>
      <td>{request.name}</td>
      <td>{request.email}</td>
      <td>{request.dogName}</td>

      <td>
        <button
          onClick={approveRequest}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Approve
        </button>
      </td>
    </tr>
  );
}