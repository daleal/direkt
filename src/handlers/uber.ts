import type { Direction } from '@/types';

type GeocodeResult = {
  lat: string;
  lon: string;
  display_name?: string;
};

const geocode = async (query: string): Promise<GeocodeResult | null> => {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as GeocodeResult[];
    return data[0] ?? null;
  } catch {
    return null;
  }
};

const generateUberUrl = (address: string, lat?: string, lon?: string, displayName?: string) => {
  if (lat && lon) {
    const dropoff = JSON.stringify({
      latitude: Number(lat),
      longitude: Number(lon),
      addressLine1: address,
      addressLine2: displayName ?? address,
    });

    return `https://m.uber.com/looking?pickup=my_location&drop[0]=${encodeURIComponent(dropoff)}`;
  }

  // Fallback: still open Uber, but prefill may be unreliable without coordinates.
  const dropoff = JSON.stringify({ addressLine1: address, addressLine2: address });
  return `https://m.uber.com/looking?pickup=my_location&drop[0]=${encodeURIComponent(dropoff)}`;
};

export const handleUber = async (direction: Direction) => {
  const mode = ('standalone' in window.navigator) && window.navigator.standalone ? '_top' : '_blank';

  const uberWindow = window.open('', mode); // This to be opened immediately to avoid popup blockers

  const geo = await geocode(direction.direction);
  const url = generateUberUrl(direction.direction, geo?.lat, geo?.lon, geo?.display_name);

  if (uberWindow) {
    uberWindow.location.href = url;
    uberWindow.focus();
  } else {
    window.open(url, mode)?.focus();
  }
};
