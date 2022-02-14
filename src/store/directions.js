/* eslint-disable no-param-reassign, no-shadow */

import { loadDirections, saveDirections } from '../services/directions';

export const state = () => ({
  directions: loadDirections(),
});

export const mutations = {
  addDirection(state, { direction }) {
    state.directions = [...state.directions, direction];
  },
  removeDirection(state, { index }) {
    state.directions = [
      ...state.directions.slice(0, index),
      ...state.directions.slice(index + 1),
    ];
  },
};

export const actions = {
  addDirection({ commit, state }, direction) {
    commit('addDirection', { direction });
    saveDirections(state.directions);
  },
  removeDirection({ commit, state }, index) {
    commit('removeDirection', { index });
    saveDirections(state.directions);
  },
};

export const namespaced = true;
