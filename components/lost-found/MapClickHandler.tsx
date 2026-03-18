"use client";

import { useMapEvents } from 'react-leaflet';

interface Props {
  setPosition: (pos: { lat: number; lng: number }) => void;
}

export default function MapClickHandler({ setPosition }: Props) {
  useMapEvents({
    click: (e) => {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

