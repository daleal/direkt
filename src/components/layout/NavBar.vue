<template>
  <v-app-bar
    color="pink darken-1"
    app
  >
    <div v-if="!searching">
      <v-toolbar-title>direkt</v-toolbar-title>

      <v-spacer></v-spacer>
    </div>

    <v-text-field
      v-if="searching"
      v-model="searchText"
      label="Search..."
      ref="searchInput"
      solo
      flat
      class="my-auto"
    />

    <NewDirectionForm :open="formOpened" @close="closeForm" />
    <v-btn icon @click="toggleSearch">
      <v-icon>{{ searchIcon }}</v-icon>
    </v-btn>
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
    searching: false,
    searchText: '',
  }),
  components: {
    NewDirectionForm,
  },
  computed: {
    searchIcon() {
      return this.searching ? 'mdi-close' : 'mdi-magnify';
    },
  },
  methods: {
    openForm() {
      this.closeSearch();
      this.formOpened = true;
    },
    closeForm() {
      this.formOpened = false;
    },
    toggleSearch() {
      if (this.searching) {
        this.closeSearch();
      } else {
        this.openSearch();
      }
    },
    openSearch() {
      this.searching = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    closeSearch() {
      this.searching = false;
      this.searchText = '';
    },
  },
  watch: {
    searchText() {
      this.$store.dispatch('directions/updateSearch', this.searchText);
    },
  },
};
</script>
