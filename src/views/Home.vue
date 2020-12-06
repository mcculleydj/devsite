<template>
  <v-container fluid>
    <v-tabs v-model="tab">
      <v-tab>
        skills
      </v-tab>
      <v-tab>
        projects
      </v-tab>
      <v-tab>
        contact
      </v-tab>
    </v-tabs>
    <div
      v-if="startVisualization"
      v-show="showVisualization"
      id="svg-container"
    />
    <SkillsVisualization v-if="startVisualization && imageRendered" />
    <SkillsList v-show="!showVisualization" />
    <v-img
      v-if="showVisualization"
      id="sketch"
      src="main.png"
      @load="checkDimensions()"
      max-width="650"
      width="33%"
    />
    <v-snackbar v-model="showSnackbar" timeout="7000">
      <span>Expand the window to bring this list to life.</span>
      <v-icon class="ml-4">mdi-arrow-expand</v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
import SkillsVisualization from '@/components/SkillsVisualization'
import SkillsList from '@/components/SkillsList'
import { sleep } from '@/common/functions'

export default {
  components: {
    SkillsVisualization,
    SkillsList,
  },

  data: () => ({
    tab: 0,
    imageRendered: false,
    startVisualization: false,
    showVisualization: false,
    showSnackbar: false,
  }),

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      tap(() => {
        this.showVisualization =
          window.innerWidth * window.innerHeight > 1000000 &&
          window.innerWidth > 800 &&
          window.innerHeight > 700
        if (!this.startVisualization && this.showVisualization) {
          this.startVisualization = true
        }
      }),
    )

    return { resize$ }
  },

  mounted() {
    this.startVisualization =
      window.innerWidth * window.innerHeight > 1000000 &&
      window.innerWidth > 800 &&
      window.innerHeight > 700
    this.showVisualization = this.startVisualization
    if (!this.showVisualization) {
      this.showSnackbar = true
    }
  },

  methods: {
    async checkDimensions() {
      const sketch = document.getElementById('sketch')
      // need the DOM to provide image dimensions prior to rendering visualizations
      if (!sketch.clientWidth || !sketch.clientHeight) {
        await sleep(500)
        this.checkDimensions()
        return
      }
      this.imageRendered = true
    },
  },
}
</script>

<style scoped>
#sketch {
  position: fixed;
  bottom: 0;
  right: 0;
}

#svg-container {
  position: fixed;
  top: 72px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
}
</style>
