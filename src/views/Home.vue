<template>
  <v-container>
    <v-btn @click="clearStorage()">clear</v-btn>
    <h1>Home</h1>
    <router-link :to="{ name: 'projects' }">projects</router-link>
  </v-container>
</template>

<script>
export default {
  methods: {
    clearStorage() {
      localStorage.clear()
    },
  },
}
</script>

<style></style>
