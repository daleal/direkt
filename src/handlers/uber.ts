import type { Direction } from '@/types';
import * as z from 'zod';
import * as locationiq from '@/constants/locationiq';

const COUNTRY = 'cl';

const AddressSchema = z.object({
  display_name: z.string(),
  lat: z.coerce.number(),
  lon: z.coerce.number(),
  matchquality: z.object({
    matchcode: z.enum(['exact', 'fallback', 'approximate']),
  }).optional().default({ matchcode: 'approximate' }),
});

const LocationIqGeocodeResponseSchema = z.array(AddressSchema);

type Address = z.infer<typeof AddressSchema>;

const selectBestAddress = (addresses: Array<Address>) => addresses.find((a) => a.matchquality.matchcode === 'exact')
  ?? addresses.find((a) => a.matchquality.matchcode === 'fallback')
  ?? addresses.find((a) => a.matchquality.matchcode === 'approximate')
  ?? null;

const geocode = async (query: string) => {
  const params = new URLSearchParams({
    key: locationiq.ACCESS_TOKEN,
    q: query,
    countrycodes: COUNTRY,
    format: 'json',
    addressdetails: '1',
    normalizeaddress: '1',
    matchquality: '1',
  });

  const url = `https://us1.locationiq.com/v1/search?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const addresses = LocationIqGeocodeResponseSchema.parse(data);

    return selectBestAddress(addresses);
  } catch (error) {
    return null;
  }
};

const generateUberUrl = (originalQuery: string, address: Address | null) => {
  if (address) {
    const dropoff = JSON.stringify({
      latitude: address.lat,
      longitude: address.lon,
      addressLine1: address.display_name,
    });

    return `https://m.uber.com/looking?pickup=my_location&drop[0]=${encodeURIComponent(dropoff)}`;
  }

  const dropoff = JSON.stringify({ addressLine1: originalQuery, addressLine2: originalQuery });
  return `https://m.uber.com/looking?pickup=my_location&drop[0]=${encodeURIComponent(dropoff)}`;
};

export const handleUber = async (direction: Direction) => {
  const mode = ('standalone' in window.navigator) && window.navigator.standalone ? '_top' : '_blank';

  const uberWindow = window.open('', mode); // This to be opened immediately to avoid popup blockers

  const address = await geocode(direction.direction);
  const url = generateUberUrl(direction.direction, address);

  if (uberWindow) {
    uberWindow.location.href = url;
    uberWindow.focus();
  } else {
    window.open(url, mode)?.focus();
  }
};
