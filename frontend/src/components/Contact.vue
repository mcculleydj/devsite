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
  </v-container>
</template>

<script>
// TODO: include twitter, linkedin, and github
export default {
  data: () => ({
    name: '',
    email: '',
    message: '',
  }),
}
</script>
