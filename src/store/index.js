import Vue from 'vue';
import Vuex from 'vuex';

import * as directions from './directions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    directions,
  },
});
