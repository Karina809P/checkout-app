export const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
  const apiKey = process.env.NEXT_PUBLIC_ORS_API_KEY;
  if (!apiKey) throw new Error("ORS API key missing");

  const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.features && data.features.length > 0) {
    return data.features[0].geometry.coordinates; // [lon, lat]
  }
  return null;
};

export const getRouteDistance = async (coordinates: [number, number][]) => {
  const apiKey = process.env.NEXT_PUBLIC_ORS_API_KEY;
  if (!apiKey) throw new Error("ORS API key missing");

  const url = 'https://api.openrouteservice.org/v2/directions/driving-car';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coordinates }),
  });

  const data = await res.json();

  if (data.routes && data.routes.length > 0) {
    return data.routes[0].summary.distance / 1000; // км
  }

  throw new Error('Route not found');
};
