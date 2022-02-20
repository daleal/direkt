<template>
  <v-row justify="center">
    <v-dialog
      v-model="open"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-form
          ref="form"
          v-model="formValid"
          lazy-validation
          @submit="save"
        >
          <v-card-title>
            <span class="text-h5">New Direction</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="content.owner"
                    label="Owner*"
                    :rules="validations.owner"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="content.direction"
                    label="Direction*"
                    :rules="validations.direction"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="content.department"
                    label="Department"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="pink accent-3"
              text
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="pink accent-3"
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { Direction } from '../models/direction';

export default {
  data: () => ({
    formValid: true,
    submittedOnce: false,
    content: Direction.baseData(),
  }),
  computed: {
    validations() {
      if (!this.submittedOnce) {
        return {};
      }
      return {
        owner: [
          (owner) => owner !== '' || 'Owner must not be empty',
        ],
        direction: [
          (direction) => direction !== '' || 'Direction must not be empty',
        ],
      };
    },
    directionObject() {
      return new Direction(this.content);
    },
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    empty() {
      this.formValid = true;
      this.submittedOnce = false;
      this.content = Direction.baseData();
    },
    save($event) {
      $event.preventDefault();
      this.submittedOnce = true;
      this.$nextTick(async () => {
        const valid = this.$refs.form.validate();
        if (valid) {
          this.$store.dispatch('directions/addDirection', this.directionObject);
          this.close();
        }
      });
    },
    close() {
      this.empty();
      this.$emit('close');
    },
  },
};
</script>
