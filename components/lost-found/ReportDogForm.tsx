"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import LocationPickerMap from "./LocationPickerMap";

export default function ReportDogForm() {

  const [dogName, setDogName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState<"lost" | "found">("lost");

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Map click position
  const handleMapPosition = (position: { lat: number; lng: number }) => {
    setLat(position.lat);
    setLng(position.lng);
  };

  // Use current device location
  const handleUseMyLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {

        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        setLat(latitude);
        setLng(longitude);
        setMapCenter([latitude, longitude]);

      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  // Image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Upload via API route (server-side)
  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      return "https://placehold.co/600x400/orange/white?text=No+Image";
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || `Upload failed: ${res.status}`);
      }

      console.log("Upload success:", data.url);
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {

      const imageUrl = await uploadImage();

      await addDoc(collection(db, "lost-found"), {
        dogName,
        location,
        description,
        contact,
        type,
        lat: lat ?? null,
        lng: lng ?? null,
        status: "active",
        image: imageUrl,
        createdAt: Date.now()
      });

      setSuccess(true);

      // reset form
      setDogName("");
      setLocation("");
      setDescription("");
      setContact("");
      setType("lost");
      setLat(null);
      setLng(null);
      setMapCenter(undefined);
      setImageFile(null);
      setImagePreview(null);

      setTimeout(() => setSuccess(false), 3000);

    } catch (err: any) {

      setError(err.message || "Failed to submit report");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="card max-w-2xl mx-auto">

      {success && (
        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center font-semibold">
          ✅ Report submitted successfully!
        </div>
      )}

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-800 font-semibold">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        <button
          type="button"
          onClick={handleUseMyLocation}
          className="w-full btn-secondary"
        >
          📍 Use My Current Location
        </button>

        <div className="card p-6">
          <LocationPickerMap
            setPosition={handleMapPosition}
            center={mapCenter}
          />
        </div>

        {lat && lng && (
          <div className="card p-6 bg-primary-50 border-primary-100">
            <p className="font-semibold text-primary-800">
              📍 Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
            </p>
          </div>
        )}

        {/* Image upload */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900">
            🐕 Dog Photo <span className="text-xs text-gray-500 font-normal">(Max 5MB)</span>
          </label>
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input file:mr-4 file:rounded-xl file:bg-primary-50 file:text-primary-700 file:border-primary-200 file:font-medium file:backdrop-blur hover:file:bg-primary-100 file:px-4 file:py-2.5 transition-colors cursor-pointer flex-1"
            />
            
            {imagePreview && (
              <div className="flex-shrink-0 ring-2 ring-gray-200/50 rounded-2xl p-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-28 h-28 lg:w-36 lg:h-36 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Dog Name */}
        <div className="form-input" placeholder="Dog Name" value={dogName} onChange={(e) => setDogName(e.target.value)} required />

        {/* Location */}
        <input className="form-input" type="text" placeholder="Location name (e.g., Nashik Road)" value={location} onChange={(e) => setLocation(e.target.value)} required />

        {/* Description */}
        <textarea 
          className="form-textarea" 
          placeholder="Description (breed, color, size, distinctive features...)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        {/* Contact */}
        <input className="form-input" type="text" placeholder="Contact (phone or email)" value={contact} onChange={(e) => setContact(e.target.value)} required />

        {/* Type */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900">Report Type</label>
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value as "lost" | "found")}>
            <option value="lost">🐶 Lost Dog</option>
            <option value="found">🐕 Found Dog</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Submitting...
            </>
          ) : "Submit Report"}
        </button>

      </form>
    </div>
  );
}