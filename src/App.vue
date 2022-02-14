<template>
  <v-app>
    <NavBar />
    <v-main>
      <PWAPrompt />
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from './components/layout/NavBar.vue';
import Footer from './components/layout/Footer.vue';
import PWAPrompt from './components/layout/PWAPrompt.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    PWAPrompt,
  },
};
</script>
