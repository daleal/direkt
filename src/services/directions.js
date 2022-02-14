export const loadDirections = () => JSON.parse(localStorage.getItem('directions') || '[]');

export const saveDirections = (directions) => {
  localStorage.setItem('directions', JSON.stringify(directions));
};
