import { importSharedDirection } from '@/handlers/share';

import type { NavigationGuard } from 'vue-router';

export const handleShare = ((to, _, next) => {
  importSharedDirection(to.params.data as string);
  next({ path: '/' });
}) satisfies NavigationGuard;
