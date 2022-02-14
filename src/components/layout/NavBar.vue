<template>
  <v-app-bar
    color="pink darken-1"
    app
  >
    <v-toolbar-title>direkt</v-toolbar-title>

    <v-spacer></v-spacer>

    <NewDirectionForm :open="formOpened" @close="closeForm" />
    <v-btn icon @click="openForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import NewDirectionForm from '../NewDirectionForm.vue';

export default {
  data: () => ({
    formOpened: false,
  }),
  components: {
    NewDirectionForm,
  },
  methods: {
    openForm() {
      this.formOpened = true;
    },
    closeForm() {
      this.formOpened = false;
    },
  },
};
</script>
