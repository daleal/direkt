import type { Direction } from '@/types';
import * as z from 'zod';
import * as radar from '@/constants/radar';

const AddressSchema = z.object({
  addressLabel: z.string(),
  number: z.string().optional(),
  street: z.string(),
  city: z.string(),
  county: z.string(),
  stateCode: z.string(),
  state: z.string(),
  countryCode: z.string(),
  country: z.string(),
  formattedAddress: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  confidence: z.enum(['exact', 'interpolated', 'fallback']),
});

const RadarGeocodeResponseSchema = z.object({
  addresses: z.array(AddressSchema),
});

type Address = z.infer<typeof AddressSchema>;

const selectBestAddress = (addresses: Array<Address>) => addresses.find((a) => a.confidence === 'exact')
  ?? addresses.find((a) => a.confidence === 'interpolated')
  ?? addresses.find((a) => a.confidence === 'fallback')
  ?? null;

const geocode = async (query: string) => {
  const url = `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: radar.PUBLISHABLE_API_KEY,
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const { addresses } = RadarGeocodeResponseSchema.parse(data);

    return selectBestAddress(addresses);
  } catch (error) {
    return null;
  }
};

const generateUberUrl = (originalQuery: string, address: Address | null) => {
  if (address) {
    const dropoff = JSON.stringify({
      latitude: address.latitude,
      longitude: address.longitude,
      addressLine1: address.addressLabel,
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
