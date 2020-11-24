<template>
  <v-app>
    <v-main id="main">
      <transition name="slide-fade">
        <Terminal v-if="terminalRunning" @shutdown="shutdown()" />
      </transition>
      <router-view v-if="!terminalRunning" />
    </v-main>
  </v-app>
</template>

<script>
import Terminal from '@/views/Terminal'

export default {
  components: {
    Terminal,
  },

  data: () => ({
    terminalRunning: true,
  }),

  created() {
    this.terminalRunning = !localStorage.getItem('shutdown')
  },

  methods: {
    shutdown() {
      this.terminalRunning = false
      localStorage.setItem('shutdown', '1')
    },
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translate(100%, 100%) scale(0.3);
}
</style>
