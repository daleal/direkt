/* eslint-disable no-param-reassign, no-shadow */

import { loadDirections, saveDirections } from '../services/directions';

export const state = () => ({
  directions: loadDirections(),
  search: '',
});

export const getters = {
  filteredDirections(state) {
    if (state.search.trim() === '') {
      return state.directions;
    }
    return state.directions.filter(
      (direction) => (
        direction.owner.toLowerCase().includes(state.search.toLowerCase())
        || direction.direction.toLowerCase().includes(state.search.toLowerCase())
      ),
    );
  },
};

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
  updateSearch(state, { content }) {
    state.search = content;
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
  updateSearch({ commit }, content) {
    commit('updateSearch', { content });
  },
};

export const namespaced = true;
