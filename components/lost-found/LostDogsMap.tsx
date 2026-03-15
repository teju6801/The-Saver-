"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function LostDogsMap({ dogs }: any) {

  return (
    <div className="w-full h-[500px] mb-12 rounded-xl overflow-hidden">

      <MapContainer
        center={[19.0760, 72.8777]} // Mumbai
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {dogs.map((dog: any) => (
          <Marker
            key={dog.id}
            position={[dog.lat || 19.0760, dog.lng || 72.8777]}
          >
            <Popup>
              <strong>{dog.dogName}</strong>
              <br />
              {dog.location}
              <br />
              {dog.type === "lost" ? "Lost Dog" : "Found Dog"}
            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}