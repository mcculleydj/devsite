<template>
  <div>
    <v-dialog v-model="showDialog" width="unset">
      <SkillDialog :skill="skill" />
    </v-dialog>
  </div>
</template>

<script>
import { fromEvent, from, interval } from 'rxjs'
import { map, tap, debounceTime, exhaustMap, zip } from 'rxjs/operators'
import SkillDialog from '@/components/SkillDialog'
import {
  fetchSkills,
  initCanvas,
  updateCanvas,
  initSimulation,
  pause,
  play,
  addNode,
} from '@/d3/skills'

export default {
  components: {
    SkillDialog,
  },

  data: () => ({
    skill: {},
    showDialog: false,
  }),

  subscriptions() {
    const node$ = from(fetchSkills()).pipe(
      exhaustMap(skills =>
        from(skills).pipe(
          zip(interval(500)),
          map(z => z[0]),
          tap(skill => {
            addNode(skill, this.onClick)
          }),
        ),
      ),
    )

    const resize$ = fromEvent(window, 'resize').pipe(
      tap(() => {
        pause()
      }),
      debounceTime(300),
      tap(() => {
        this.updateCanvas()
        play()
      }),
    )
    return { resize$, node$ }
  },

  mounted() {
    initCanvas()
    this.updateCanvas()
    initSimulation()
  },

  methods: {
    updateCanvas() {
      const sketch = document.getElementById('sketch')
      updateCanvas(sketch.clientWidth, sketch.clientHeight)
    },

    onClick(skill) {
      this.skill = skill
      this.showDialog = true
    },
  },
}
</script>
