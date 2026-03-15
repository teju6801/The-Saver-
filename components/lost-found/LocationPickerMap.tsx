"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

interface LocationPickerMapProps {
  setPosition: (pos: { lat: number; lng: number }) => void;
  center?: [number, number];
}

function ChangeMapCenter({ center }: { center?: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);

  return null;
}

function LocationMarker({
  setPosition,
}: {
  setPosition: (pos: { lat: number; lng: number }) => void;
}) {
  const [position, setLocalPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocalPosition([lat, lng]);
      setPosition({ lat, lng });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function LocationPickerMap({
  setPosition,
  center = [19.076, 72.877],
}: LocationPickerMapProps) {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden mb-6">
      <MapContainer center={center} zoom={11} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapCenter center={center} />

        <LocationMarker setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}