import { Direction } from '../models/direction';

export const loadDirections = () => {
  const rawDirections = JSON.parse(localStorage.getItem('directions') || '[]');
  return rawDirections.map((rawDirection) => new Direction(rawDirection));
};

export const saveDirections = (directions) => {
  const rawDirections = directions.map((rawDirection) => rawDirection.serialize());
  localStorage.setItem('directions', JSON.stringify(rawDirections));
};
