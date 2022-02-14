<template>
  <v-row justify="center">
    <v-dialog
      v-model="shown"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title class="text-h5">
          Add app to home screen?
        </v-card-title>
        <v-card-text>Add this application to your home screen for easier usage!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink accent-3"
            text
            @click="dismissPrompt"
          >
            No, thanks
          </v-btn>
          <v-btn
            color="pink accent-3"
            text
            @click="installPWA"
          >
            OK!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    shown: false,
  }),
  beforeMount() {
    window.addEventListener('beforeinstallprompt', ($event) => {
      $event.preventDefault();
      this.installEvent = $event;
      this.shown = true;
    });
  },
  methods: {
    dismissPrompt() {
      this.shown = false;
    },
    async installPWA() {
      await this.installEvent.prompt();
      this.dismissPrompt();
    },
  },
};
</script>
