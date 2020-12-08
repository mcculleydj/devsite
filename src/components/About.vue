<template>
  <div>
    <div id="banner">
      <div>Welcome to my interactive self-promotion.</div>
      <div>Check out skills and projects to see what I can do.</div>
      <div>
        Or hang out here to learn more about me and my take on coding.
      </div>
    </div>
    <v-row>
      <v-col
        class="terminal-container mx-3"
        :style="{ 'min-height': terminalHeight + 'px' }"
      >
        <Terminal :terminalHeight="terminalHeight" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
import Terminal from '@/components/Terminal'

export default {
  components: {
    Terminal,
  },

  data: () => ({
    terminalHeight: 0,
  }),

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(500),
      tap(() => {
        const bannerHeight = document.getElementById('banner').clientHeight
        this.terminalHeight = window.innerHeight - 1.2 * bannerHeight
      }),
    )

    return { resize$ }
  },

  mounted() {
    const bannerHeight = document.getElementById('banner').clientHeight
    this.terminalHeight = window.innerHeight - 1.2 * bannerHeight - 45
  },
}
</script>

<style scope>
#banner {
  color: #1976d2;
  font-size: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.terminal-container {
  border: 1px solid lightgray;
}
</style>
