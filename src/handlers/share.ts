import { Buffer } from 'buffer';
import { serializeForUrl } from '@/serializers/directions';

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
