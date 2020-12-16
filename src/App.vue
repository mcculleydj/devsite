<template>
  <v-app>
    <v-main id="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  watch: {
    $route() {
      if (this.$route.name === 'vuerx') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    },
  },
}
</script>
