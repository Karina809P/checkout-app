// src/lib/orsApi.ts

const API_KEY = process.env.NEXT_PUBLIC_ORS_API_KEY;
if (!API_KEY) throw new Error("ORS API key missing");

export const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
  const res = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(address)}`);
  if (!res.ok) return null;
  const data = await res.json();
  const coords = data?.features?.[0]?.geometry?.coordinates;
  return coords ? [coords[0], coords[1]] : null;
};

export const reverseGeocode = async (
  coords: [number, number]
): Promise<string | null> => {
  const apiKey = process.env.NEXT_PUBLIC_ORS_API_KEY;
  if (!apiKey) throw new Error("ORS API key missing");

  const [lat, lng] = coords; // ORS вимагає lat, lon

  // Додаємо параметр lang=en для англійської мови
  const url = `https://api.openrouteservice.org/geocode/reverse?api_key=${apiKey}&point.lat=${lat}&point.lon=${lng}&lang=en`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  const feature = data?.features?.[0];
  if (!feature) return null;

  // Повертаємо англомовну адресу
  const address = feature.properties.label;
  return address || null;
};

export const getRouteDistance = async (coordinates: [number, number][]): Promise<number> => {
  if (coordinates.length < 2) throw new Error("At least two coordinates are required.");
  const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
    method: 'POST',
    headers: {
      Authorization: API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coordinates, instructions: false }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error("ORS route error: " + error);
  }
  const data = await res.json();
  const dist = data?.features?.[0]?.properties?.summary?.distance;
  if (typeof dist !== 'number') throw new Error("Route distance not found in response.");
  return dist / 1000;
};

