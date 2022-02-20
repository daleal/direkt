<template>
  <v-card
    color="pink darken-1"
    dark
  >
    <v-card-title class="text-h5">
      {{ direction.owner }}
    </v-card-title>

    <v-card-subtitle>
      <strong>{{ direction.direction }}</strong> {{ departmentText }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="black"
        @click="remove"
      >
        Remove
      </v-btn>
      <v-btn
        text
        @click="maps"
      >
        Open in Maps
      </v-btn>
      <v-btn
        text
        @click="share"
      >
        Share
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Direction } from '../models/direction';
import { geo } from '../services/maps';

export default {
  props: {
    direction: {
      type: Direction,
      required: true,
    },
  },
  computed: {
    departmentText() {
      return this.direction.department ? `- ${this.direction.department}` : '';
    },
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
    maps() {
      const mode = (
        ('standalone' in window.navigator) && window.navigator.standalone
          ? '_top'
          : '_blank'
      );
      const map = window.open(geo(this.direction.direction), mode);
      map.focus();
    },
    share() {
      const encoded = Buffer.from(this.direction.toQueryParams()).toString('base64');
      if (navigator.share) {
        navigator.share({
          title: `Direkt - ${this.direction.owner}`,
          url: `${window.location.origin}/share/${encoded}`,
        });
      } else {
        console.log(`${window.location.origin}/share/${encoded}`);
      }
    },
  },
};
</script>
