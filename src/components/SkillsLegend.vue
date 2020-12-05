<template>
  <div />
</template>

<script>
import { Subject, fromEvent, from, interval, concat } from 'rxjs'
import { exhaustMap, map, tap, debounceTime, zip } from 'rxjs/operators'
import {
  retrieveData,
  initCanvas,
  updateCanvas,
  initSimulation,
  pause,
  play,
  addNode,
} from '@/d3/skills-legend'

const ready$ = new Subject()

export default {
  subscriptions() {
    const data = retrieveData()

    const node$ = ready$.pipe(
      exhaustMap(() =>
        concat(
          from([data[0]]),
          interval(1000).pipe(
            zip(from(data.slice(1))),
            map(a => a[1]),
          ),
        ).pipe(
          tap(skill => {
            addNode(skill)
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
    initSimulation(this.complete)
    ready$.next()
  },

  methods: {
    updateCanvas() {
      const sketch = document.getElementById('sketch')
      updateCanvas(sketch.clientWidth, sketch.clientHeight)
    },

    complete() {
      this.$emit('complete')
    },
  },
}
</script>
