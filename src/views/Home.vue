<template>
  <v-container fluid>
    <v-tabs>
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
    <div id="svg-container"></div>
    <!-- <v-btn @click="clearStorage()">clear</v-btn> -->
    <v-img id="sketch" src="main.png" @load="updateCanvas(true)" />
  </v-container>
</template>

<script>
import { fromEvent, from, interval, Subject } from 'rxjs'
import { map, tap, debounceTime, exhaustMap, zip } from 'rxjs/operators'
import {
  fetchSkills,
  initCanvas,
  updateCanvas,
  initSimulation,
  pause,
  play,
  addNode,
} from '@/d3/skills'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const signal$ = new Subject()

export default {
  subscriptions() {
    const skill$ = signal$.pipe(
      exhaustMap(() =>
        from(fetchSkills()).pipe(
          exhaustMap(skills =>
            from(skills).pipe(
              zip(interval(500)),
              map(a => a[0]),
              tap(skill => {
                addNode(skill)
              }),
            ),
          ),
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
    return { resize$, skill$ }
  },

  async mounted() {
    await initCanvas()
  },

  methods: {
    async updateCanvas(onLoad) {
      const sketch = document.getElementById('sketch')
      if (!sketch.clientWidth) {
        await sleep(500)
        this.updateCanvas(onLoad)
        return
      }
      if (onLoad) {
        initSimulation()
        signal$.next()
      }
      updateCanvas(sketch.clientWidth, sketch.clientHeight, onLoad)
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
