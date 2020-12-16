<template>
  <v-dialog v-model="showDialog" width="unset">
    <SkillDialog :skill="skill" />
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { fromEvent, interval, Subject } from 'rxjs'
import {
  filter,
  takeWhile,
  map,
  tap,
  debounceTime,
  exhaustMap,
} from 'rxjs/operators'
import SkillDialog from '@/components/SkillDialog'
import {
  initCanvas,
  updateCanvas,
  initLegendSimulation,
  initSkillSimulation,
  pause,
  play,
  addLegendNode,
  addSkillNode,
} from '@/d3/skills'
import { skillProficiencies, skills } from '@/common/constants'
import { sleep } from '@/common/functions'

const resizeReady$ = new Subject()
const legendReady$ = new Subject()
const skillsReady$ = new Subject()

export default {
  components: {
    SkillDialog,
  },

  props: ['showListView'],

  computed: {
    ...mapGetters(['tab']),
  },

  data: () => ({
    skill: {},
    showDialog: false,
    hasViewed: false,
  }),

  subscriptions() {
    const legendNode$ = legendReady$.pipe(
      exhaustMap(() =>
        interval(1000).pipe(
          takeWhile(i => i < skillProficiencies.length),
          map(i => skillProficiencies[i]),
          tap(addLegendNode),
        ),
      ),
    )

    // TODO: manually define the order so that sorting is unecessary
    //       and we don't launch 5 ops skils in a row
    const sortedSkills = skills.sort((s1, s2) => s1.r - s2.r)

    const skillNode$ = skillsReady$.pipe(
      exhaustMap(() =>
        interval(500).pipe(
          takeWhile(i => i < skills.length),
          map(i => sortedSkills[i]),
          tap(s => {
            addSkillNode(s, this.onClick)
          }),
        ),
      ),
    )

    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      filter(() => this.tab === 1 && !this.showListView),
      tap(() => {
        pause()
      }),
      debounceTime(1000),
      tap(() => {
        this.updateCanvas()
        play()
      }),
    )

    return { legendNode$, skillNode$, resize$ }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      resizeReady$.next()

      await this.waitForContainerDimensions()

      initCanvas()
      this.updateCanvas()
      initLegendSimulation(this.complete)
      legendReady$.next()

      this.hasViewed = true
    },

    updateCanvas(initSkills) {
      const sketch = document.getElementById('sketch')
      updateCanvas(sketch.clientWidth, sketch.clientHeight, initSkills)
    },

    complete() {
      this.updateCanvas(true)
      initSkillSimulation()
      skillsReady$.next()
    },

    onClick(skill) {
      this.skill = skill
      this.showDialog = true
    },

    async waitForContainerDimensions() {
      let container = document.getElementById('skills-svg-container')

      while (!container || !container.clientWidth || !container.clientHeight) {
        await sleep(100)
        container = document.getElementById('skills-svg-container')
      }
    },

    async waitForSketchDimensions() {
      let sketch = document.getElementById('skills-svg-container')

      while (!sketch || !sketch.clientWidth || !sketch.clientHeight) {
        await sleep(100)
        sketch = document.getElementById('skills-svg-container')
      }
    },
  },

  watch: {
    async tab() {
      if (this.tab === 1 && this.hasViewed) {
        await this.waitForContainerDimensions()
        this.updateCanvas()
        play()
      } else if (this.tab !== 1) {
        pause()
      }
    },

    async showListView(current, previous) {
      if (previous && !current) {
        await this.waitForSketchDimensions()
        this.updateCanvas()
        play()
      } else if (current) {
        pause()
      }
    },
  },
}
</script>
