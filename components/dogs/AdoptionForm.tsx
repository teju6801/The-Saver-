"use client";

import { useState } from "react";
import { createAdoptionRequest } from "@/lib/adoptions";

export default function AdoptionForm({ dogName }: { dogName: string }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createAdoptionRequest({
      dogName,
      name,
      email,
      phone,
      message
    });

    alert("Adoption request sent!");

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl p-12 lg:p-16">
      <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">

        <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 text-center mb-2">
          Apply to Adopt {dogName}
        </h2>

        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
          Tell us a little about yourself and why you'd be a great home for {dogName}.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <input
            className="input-field"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <input
            className="input-field"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            className="lg:col-span-2 input-field"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <textarea
          className="input-field resize-vertical min-h-[160px] lg:min-h-[200px]"
          placeholder="Why do you want to adopt this dog? Tell us about your living situation, experience with pets, and what makes you the perfect match."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button 
          type="submit" 
          className="btn-primary w-full text-2xl py-10 font-semibold"
          disabled={false}
        >
          Submit Adoption Request
        </button>

      </form>
    </div>
  );
}