<template>
  <div>
    <div id="projects-svg-container" />
    <transition name="fade">
      <div
        v-if="showText"
        class="text-area"
        :style="{
          width: `${sideLength * 2}px`,
          height: `${sideLength}px`,
          transform: `translate(-${sideLength}px, -${sideLength / 4}px)`,
        }"
      >
        <span>{{ project.description }}</span>
        <v-row v-if="project.description !== ''" justify="center" class="mt-3">
          <!-- TODO: this might be href not to -->
          <v-btn
            v-if="project.link"
            icon
            large
            color="primary"
            :to="project.link"
            target="_blank"
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <v-btn
            v-if="project.github"
            icon
            large
            color="primary"
            :href="project.github"
            target="_blank"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn
            v-if="project.youtube"
            icon
            large
            color="primary"
            :href="project.youtube"
            target="_blank"
          >
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
        </v-row>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fromEvent } from 'rxjs'
import { tap, debounceTime, delay, filter } from 'rxjs/operators'
import { initCanvas, updateCanvas } from '@/d3/projects'
import { sleep } from '@/common/functions'

export default {
  computed: {
    ...mapGetters(['tab']),
  },

  data: () => ({
    showText: true,
    project: {},
    sideLength: 0,
    hasViewed: false,
  }),

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      filter(() => this.tab === 2),
      tap(() => {
        this.showText = false
      }),
      debounceTime(1000),
      tap(() => {
        this.updateCanvas()
      }),
      delay(500),
      tap(() => {
        this.showText = true
      }),
    )

    return { resize$ }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const container = document.getElementById('projects-svg-container')

      if (!container || !container.clientWidth || !container.clientHeight) {
        await sleep(100)
        this.init()
        return
      }

      initCanvas()
      this.updateCanvas()

      this.hasViewed = true
    },

    updateCanvas() {
      const imageWidth = document.getElementById('sketch').clientWidth
      const imageHeight = document.getElementById('sketch').clientHeight
      this.sideLength = updateCanvas(imageWidth, imageHeight, this.onClick)
    },

    onClick(project, sideLength) {
      this.project = project
      this.sideLength = sideLength
    },

    async waitForContainerDimensions() {
      let container = document.getElementById('projects-svg-container')

      while (!container || !container.clientWidth || !container.clientHeight) {
        await sleep(100)
        container = document.getElementById('projects-svg-container')
      }
    },
  },

  watch: {
    async tab() {
      if (this.tab === 2 && this.hasViewed) {
        await this.waitForContainerDimensions()
        this.updateCanvas()
      }
    },
  },
}
</script>

<style scoped>
#projects-svg-container {
  position: fixed;
  top: 72px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 12;
}

.text-area {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 13;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
