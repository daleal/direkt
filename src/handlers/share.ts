import { Buffer } from 'buffer';
import { useDirections } from '@/stores/directions';
import { deserializeFromUrl, serializeForUrl } from '@/serializers/directions';

import type { Direction } from '@/types';

export const shareDirection = (direction: Direction) => {
  const encoded = Buffer.from(serializeForUrl(direction)).toString('base64');
  if (navigator.share) {
    navigator.share({
      title: `Direkt - ${direction.owner}`,
      url: `${window.location.origin}/share/${encoded}`,
    });
  } else {
    // eslint-disable-next-line no-console
    console.log(`${window.location.origin}/share/${encoded}`);
  }
};

export const importSharedDirection = (encoded: string) => {
  const { addDirection } = useDirections();

  const decoded = Buffer.from(encoded, 'base64').toString('ascii');
  const data = deserializeFromUrl(decoded);

  addDirection(data);
};
