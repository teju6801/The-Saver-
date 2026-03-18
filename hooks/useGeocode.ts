interface GeocodeResult {
  lat: number;
  lon: number;
  display_name: string;
}

export async function geocodeLocation(query: string): Promise<GeocodeResult | null> {
  if (!query || query.length < 2) return null;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=in`
    );
    
    if (!response.ok) return null;

    const data = await response.json() as any[];
    
    if (data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      display_name: data[0].display_name,
    };
  } catch (error) {
    console.error('Geocoding failed:', error);
    return null;
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeocodeResult | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1&countrycodes=in`
    );
    
    if (!response.ok) return null;

    const data = await response.json() as any;
    
    if (!data || !data.display_name) return null;

    return {
      lat,
      lon,
      display_name: data.display_name,
    };
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return null;
  }
}

