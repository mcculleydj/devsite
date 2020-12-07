<template>
  <v-dialog v-model="showDialog" width="unset">
    <SkillDialog :skill="skill" />
  </v-dialog>
</template>

<script>
import { concat, fromEvent, from, interval, Subject } from 'rxjs'
import { map, tap, debounceTime, exhaustMap, zip } from 'rxjs/operators'
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

const legendReady$ = new Subject()
const skillsReady$ = new Subject()

export default {
  components: {
    SkillDialog,
  },

  data: () => ({
    skill: {},
    showDialog: false,
  }),

  subscriptions() {
    const legendNode$ = legendReady$.pipe(
      exhaustMap(() =>
        concat(
          from([skillProficiencies[0]]),
          from(skillProficiencies.slice(1)).pipe(
            zip(interval(1000)),
            map(z => z[0]),
          ),
        ).pipe(
          tap(node => {
            addLegendNode(node)
          }),
        ),
      ),
    )

    const skillNode$ = skillsReady$.pipe(
      exhaustMap(() =>
        from(skills.sort((s1, s2) => s1.r - s2.r)).pipe(
          zip(interval(500)),
          map(z => z[0]),
          tap(skill => {
            addSkillNode(skill, this.onClick)
          }),
        ),
      ),
    )

    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
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
      const container = document.getElementById('svg-container')

      if (!container || !container.clientWidth || !container.clientHeight) {
        await sleep(100)
        this.init()
        return
      }

      initCanvas()
      this.updateCanvas()
      initLegendSimulation(this.complete)
      legendReady$.next()
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
  },
}
</script>
