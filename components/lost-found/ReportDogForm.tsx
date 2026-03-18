"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import LocationPickerMap from "./LocationPickerMap";

export default function ReportDogForm() {

const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [dogName, setDogName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");


  const handleMapPosition = (pos: { lat: number; lng: number }) => {
    setLat(pos.lat);
    setLng(pos.lng);
    setMapCenter([pos.lat, pos.lng]);
  };

// LIVE LOCATION WITH REVERSE GEOCODE
  const handleUseMyLocation = async () => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLat(latitude);
        setLng(longitude);
        setMapCenter([latitude, longitude]);

        // Get readable address
        const { reverseGeocode } = await import('@/hooks/useGeocode');
        const result = await reverseGeocode(latitude, longitude);
        if (result) {
          setLocation(result.display_name);
        } else {
          setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
        }

      },
      (error) => {
        console.error(error);
        alert("Unable to get your location. Please allow access.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let uploadImageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.ok) uploadImageUrl = data.url;
      }

      await addDoc(collection(db, "lost-found"), {
        dogName,
        location,
        description,
        contact,
        imageUrl: uploadImageUrl,
        lat,
        lng,
        type: 'lost', // default
        status: "active",
        createdAt: Date.now(),
      });

      alert("Report submitted successfully!");
      setDogName("");
      setLocation("");
      setDescription("");
      setContact("");
      setLat(null);
      setLng(null);
      setImageFile(null);
      setImageUrl('');
    } catch (error) {
      alert("Error submitting report: " + (error as Error).message);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <button
        type="button"
        onClick={handleUseMyLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        📍 Use My Current Location
      </button>

      <LocationPickerMap
        setPosition={handleMapPosition}
        center={mapCenter}
      />

      {lat && lng && (
        <p className="text-sm text-gray-600">
          Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
        </p>
      )}

      <input
        type="text"
        placeholder="Dog name"
        value={dogName}
        onChange={(e) => setDogName(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="text"
        placeholder="Location name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />

<input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) setImageFile(e.target.files[0]);
        }}
        className="w-full border p-3 rounded"
      />

      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-3 rounded-lg w-full"
        disabled={!dogName || !location || !description || !contact || !lat || !lng}
      >
        Submit Report
      </button>


    </form>
  );
}