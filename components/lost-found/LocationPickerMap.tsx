"use client";

import dynamic from 'next/dynamic';

interface Props {
  setPosition: (pos: { lat: number; lng: number }) => void;
  center?: [number, number];
}

export default dynamic({
  loader: async () => {
    const leaflet = await import('leaflet');
    if (typeof window !== 'undefined') {
      // Add leaflet.css to head dynamically
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
      
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    }

    const { MapContainer, TileLayer, Marker, useMapEvents } = await import('react-leaflet');
    
    function ClickHandler({ setPosition }: { setPosition: (pos: { lat: number; lng: number }) => void }) {
      useMapEvents({
        click: (e: any) => setPosition({ lat: e.latlng.lat, lng: e.latlng.lng })
      });
      return null;
    }

    function LocationPickerMap({ setPosition, center }: Props) {
      return (
        <div className='relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl border'>
          <MapContainer 
            center={center || [20.5937, 78.9629]} 
            zoom={14} 
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <ClickHandler setPosition={setPosition} />
            {center && <Marker position={center} />}
          </MapContainer>
        </div>
      );
    }

    return LocationPickerMap;
  },
  ssr: false,
  loading: () => <div className='h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center'><p>Loading map...</p></div>,
});

