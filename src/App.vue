<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from './components/layout/NavBar.vue';
import Footer from './components/layout/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
};
</script>
