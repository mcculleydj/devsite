<template>
  <div>
    <template v-if="startVisualization">
      <div v-show="hasSpace && !showListView" id="skills-svg-container" />
      <SkillsVisualization />
    </template>
    <template v-if="!hasSpace || showListView">
      <SkillsList />
      <v-snackbar v-model="showSnackbar" timeout="7000">
        <span>Expand the window to bring this list to life.</span>
        <v-icon class="ml-4">mdi-arrow-expand</v-icon>
      </v-snackbar>
    </template>
    <v-btn
      v-if="hasSpace && !showListView"
      fixed
      bottom
      text
      x-large
      color="primary"
      @click="toggleListView()"
      style="z-index: 13"
    >
      <v-icon>mdi-view-list</v-icon>
      <span class="lowercase">list view</span>
    </v-btn>
    <v-btn
      v-if="hasSpace && showListView"
      fixed
      bottom
      text
      x-large
      color="primary"
      @click="toggleListView()"
      style="z-index: 13"
    >
      <v-icon>mdi-chart-bubble</v-icon>
      <span class="lowercase">bubble view</span>
    </v-btn>
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
    hasSpace: false,
    showSnackbar: false,
    showListView: false,
  }),

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(500),
      tap(() => {
        // decide to show visualization or list
        this.hasSpace =
          window.innerWidth * window.innerHeight > minArea &&
          window.innerWidth > minWidth &&
          window.innerHeight > minHeight

        // handle case where you start with the list and expand the viewport
        if (!this.startVisualization) {
          this.startVisualization = this.hasSpace
        }

        // hide the sketch image in list view
        this.dispatchSetShowSketch(this.hasSpace)
      }),
    )

    return { resize$ }
  },

  mounted() {
    this.startVisualization =
      window.innerWidth * window.innerHeight > minArea &&
      window.innerWidth > minWidth &&
      window.innerHeight > minHeight
    this.hasSpace = this.startVisualization
    this.showSnackbar = !this.hasSpace

    this.dispatchSetShowSketch(this.hasSpace)
  },

  methods: {
    ...mapActions({ dispatchSetShowSketch: 'setShowSketch' }),

    toggleListView() {
      this.showListView = !this.showListView
      this.dispatchSetShowSketch(!this.showListView)
    },
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

.lowercase {
  text-transform: lowercase;
  margin-left: 8px;
}
</style>
