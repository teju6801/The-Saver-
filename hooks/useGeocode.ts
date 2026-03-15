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
