<template>
  <div>
    <div id="projects-svg-container" />
    <transition name="fade">
      <div
        v-if="showText"
        class="text-area"
        :style="{
          width: `${radius}px`,
          height: `${0.65 * radius}px`,
          transform: `translate(-${0.5 * radius}px, -${0.2 * radius}px)`,
        }"
      >
        <div
          class="text-area-text"
          :style="{
            width: `${radius}px`,
            height: `${0.65 * radius}px`,
          }"
        >
          {{ project.description }}
        </div>
        <v-row v-if="project.description !== ''" justify="center">
          <v-tooltip bottom v-if="project.link">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                color="primary"
                :href="project.link"
                target="_blank"
                v-on="on"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </template>
            <span>Demo</span>
          </v-tooltip>
          <v-tooltip bottom v-if="project.github">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                color="primary"
                :href="project.github"
                target="_blank"
                v-on="on"
              >
                <v-icon>mdi-github</v-icon>
              </v-btn>
            </template>
            <span>Code</span>
          </v-tooltip>
          <v-tooltip bottom v-if="project.youtube">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                color="primary"
                :href="project.youtube"
                target="_blank"
                v-on="on"
              >
                <v-icon>mdi-youtube</v-icon>
              </v-btn>
            </template>
            <span>Video</span>
          </v-tooltip>
        </v-row>
      </div>
    </transition>
    <v-btn
      fixed
      bottom
      text
      x-large
      color="primary"
      @click="showDialog = true"
      style="z-index: 13"
    >
      <v-icon>mdi-hammer-wrench</v-icon>
      <span style="text-transform: lowercase">current projects</span>
    </v-btn>
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title style="font-size: 1.3rem">Current Projects</v-card-title>
        <v-card-text style="font-size: 1.1rem">
          <p>I am currently working on...</p>
          <ul>
            <li>
              a
              <a
                href="https://www.udemy.com/course/advanced-css-and-sass/"
                target="blank_"
                >course</a
              >
              on Advanced CSS and SASS
            </li>
            <li>
              freelance data visualization projects for an online news startup
              using D3
            </li>
            <li>
              building a Redis clone from scratch using Go inspired by
              <a href="https://codecrafters.io/" target="blank_"
                >this brilliant idea</a
              >
              to replace HackerRank with real world coding challenges
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
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
    radius: 0,
    hasViewed: false,
    hasResized: false,
    showDialog: false,
  }),

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      tap(() => {
        this.hasResized = true
      }),
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
      this.radius = updateCanvas(imageWidth, imageHeight, this.onClick)
    },

    onClick(project, radius) {
      this.project = project
      this.radius = radius
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
      if (this.tab === 2 && this.hasViewed && this.hasResized) {
        await this.waitForContainerDimensions()
        this.updateCanvas()
      } else if (this.tab !== 2) {
        this.hasResized = false
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

.text-area-text {
  overflow-y: scroll;
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
