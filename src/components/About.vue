<template>
  <div>
    <div id="banner">
      <div>Welcome to my interactive self-promotion.</div>
      <div>Check out skills and projects to see what I can do.</div>
      <div>
        Or hang out here to learn more about me and my take on coding.
      </div>
    </div>
    <v-row v-if="showTerminal">
      <v-col
        class="terminal-container mx-3"
        :style="{ height: terminalHeight + 'px' }"
      >
        <Terminal />
      </v-col>
    </v-row>
    <Thoughts v-else @intro="showIntro()" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
import Thoughts from '@/components/Thoughts'
import Terminal from '@/components/Terminal'

export default {
  components: {
    Thoughts,
    Terminal,
  },

  data: () => ({
    showTerminal: false,
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

  methods: {
    ...mapActions({
      dispatchSetSketchSource: 'setSketchSource',
    }),

    showIntro() {
      this.showTerminal = true
      this.dispatchSetSketchSource('sketch.png')
    },
  },
}
</script>

<style scope>
#banner {
  color: #1976d2;
  font-size: 1.8rem;
  padding-top: 1.8rem;
  padding-bottom: 1.8rem;
}

.terminal-container {
  border: 1px solid lightgray;
}
</style>
