<template>
  <div>
    <v-container class="mt-6">
      <v-row dense>
        <v-col cols="12">
          <Direction
            v-for="(direction, index) in directions"
            :key="index"
            :direction="direction"
            @remove="() => remove(index)"
            class="mb-3"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Direction from '../components/Direction.vue';

export default {
  name: 'Home',
  components: {
    Direction,
  },
  data: () => ({
    formOpened: true,
  }),
  computed: {
    ...mapGetters('directions', {
      directions: 'filteredDirections',
    }),
  },
  methods: {
    remove(index) {
      this.$store.dispatch('directions/removeDirection', index);
    },
  },
};
</script>
