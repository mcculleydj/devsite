<template>
  <v-app>
    <v-main id="main">
      <v-container class="hidden-sm-and-up">
        <v-row>
          <v-col>
            Sorry, but this site is not mobile friendly. My goal was to get
            something online quickly ahead of job applications that hiring teams
            could review at their desk. Eventually, I will support smaller
            viewports, but it was not a first priority. That said, this site is
            still responsive. If you are seeing this on laptop or desktop,
            simply increase the size of your window.
          </v-col>
        </v-row>
      </v-container>
      <router-view class="hidden-xs-only" />
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
