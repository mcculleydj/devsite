<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="Name" v-model="name" outlined />
      </v-col>
      <v-col>
        <v-text-field label="Email" v-model="email" outlined />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea label="Message" v-model="message" outlined />
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto">
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
