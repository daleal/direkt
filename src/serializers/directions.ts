import type { Direction } from '@/types';

export const deserializeFromStore = (data: string) => JSON.parse(data) as Array<Direction>;

export const serializeForStore = (directions: Array<Direction>) => JSON.stringify(directions);

export const serializeForUrl = (direction: Direction) => Object.entries(direction).map(([key, value]) => `${key}=${value}`).join('&');
