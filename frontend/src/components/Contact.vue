<template>
  <v-container style="max-width: 800px" class="ml-0">
    <v-row align="center">
      <v-col class="banner">
        Let's Connect!
      </v-col>
      <v-col cols="auto">
        <v-btn
          icon
          large
          color="primary"
          href="https://www.linkedin.com/in/darenmcculley/"
          target="blank"
        >
          <v-icon>mdi-linkedin</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          color="primary"
          href="https://github.com/mcculleydj"
          target="blank"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Name" v-model="name" outlined hide-details />
      </v-col>
      <v-col>
        <v-text-field label="Email" v-model="email" outlined hide-details />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea label="Message" v-model="message" outlined hide-details />
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto" class="pt-0">
        <v-btn
          text
          x-large
          color="primary"
          :disabled="disabled"
          @click="sendMail()"
        >
          <v-icon>mdi-send</v-icon>
          <span>Send</span>
        </v-btn>
      </v-col>
    </v-row>
    <div class="button-container"></div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

// TODO: include twitter, linkedin, and github
export default {
  computed: {
    disabled() {
      return !this.name || !this.email || !this.message
    },
  },

  data: () => ({
    name: '',
    email: '',
    message: '',
  }),

  methods: {
    ...mapActions({
      dispatchSendMail: 'sendMail',
    }),

    sendMail() {
      this.dispatchSendMail({
        name: this.name,
        email: this.email,
        message: this.message,
      })

      this.name = ''
      this.email = ''
      this.message = ''
    },
  },
}
</script>

<style scoped>
.banner {
  color: #1976d2;
  font-size: 1.8rem;
}
</style>
