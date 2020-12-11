<template>
  <div>
    <template v-if="startVisualization">
      <div v-show="showVisualization" id="skills-svg-container" />
      <SkillsVisualization />
    </template>
    <template v-if="!showVisualization">
      <SkillsList />
      <v-snackbar v-model="showSnackbar" timeout="7000">
        <span>Expand the window to bring this list to life.</span>
        <v-icon class="ml-4">mdi-arrow-expand</v-icon>
      </v-snackbar>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
import SkillsVisualization from '@/components/SkillsVisualization'
import SkillsList from '@/components/SkillsList'

// below these thresholds show the list view instead
const minArea = 1000000
const minWidth = 800
const minHeight = 700

export default {
  components: {
    SkillsVisualization,
    SkillsList,
  },

  data: () => ({
    startVisualization: false,
    showVisualization: false,
    showSnackbar: false,
  }),

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(500),
      tap(() => {
        // decide to show visualization or list
        this.showVisualization =
          window.innerWidth * window.innerHeight > minArea &&
          window.innerWidth > minWidth &&
          window.innerHeight > minHeight

        // handle case where you start with the list and expand the viewport
        if (!this.startVisualization) {
          this.startVisualization = this.showVisualization
        }

        // hide the sketch image in list view
        this.dispatchSetShowSketch(this.showVisualization)
      }),
    )

    return { resize$ }
  },

  mounted() {
    this.startVisualization =
      window.innerWidth * window.innerHeight > minArea &&
      window.innerWidth > minWidth &&
      window.innerHeight > minHeight
    this.showVisualization = this.startVisualization
    this.showSnackbar = !this.showVisualization

    this.dispatchSetShowSketch(this.showVisualization)
  },

  methods: {
    ...mapActions({ dispatchSetShowSketch: 'setShowSketch' }),
  },
}
</script>

<style scoped>
#skills-svg-container {
  position: fixed;
  top: 72px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 12;
}
</style>
