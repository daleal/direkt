import type { Direction } from '@/types';

const generateMapsUrl = (direction: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURI(direction)}`;

export const handleMaps = (direction: Direction) => {
  const mode = ('standalone' in window.navigator) && window.navigator.standalone ? '_top' : '_blank';
  const map = window.open(generateMapsUrl(direction.direction), mode);
  map?.focus();
};
