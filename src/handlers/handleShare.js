import $store from '../store';
import { Direction } from '../models/direction';

export const handleShare = (to, from, next) => {
  const decoded = Buffer.from(to.params.data, 'base64').toString('ascii');
  const data = Object.fromEntries(
    decoded.split('&').map(
      (param) => (param.split('=').map((fragment) => decodeURI(fragment))),
    ),
  );
  const direction = new Direction(data);
  $store.dispatch('directions/addDirection', direction);
  next({ name: 'Home' });
};
