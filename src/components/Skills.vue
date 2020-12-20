<template>
  <div>
    <template v-if="startVisualization">
      <div v-show="hasSpace && !showListView" id="skills-svg-container" />
      <SkillsVisualization :showListView="showListView" />
    </template>
    <SkillsList v-if="!hasSpace || showListView" />
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
    <v-btn v-if="!hasSpace" disabled text x-large fixed bottom>
      <v-icon>mdi-arrow-expand-all</v-icon>
      <span class="lowercase">expand window</span>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { fromEvent } from 'rxjs'
import { tap, debounceTime, filter } from 'rxjs/operators'
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

  computed: {
    ...mapGetters(['tab']),
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
      filter(() => this.tab === 1),
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
        this.dispatchSetShowSketch(this.hasSpace && !this.showListView)
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

  watch: {
    tab() {
      if (this.tab === 1) {
        this.dispatchSetShowSketch(this.hasSpace && !this.showListView)
      }
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
