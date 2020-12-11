<template>
  <div>
    <div id="projects-svg-container" />
  </div>
</template>

<script>
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
import { initCanvas, updateCanvas } from '@/d3/projects'
import { sleep } from '@/common/functions'

export default {
  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(1000),
      tap(() => {
        const imageWidth = document.getElementById('sketch').clientWidth
        const imageHeight = document.getElementById('sketch').clientHeight
        updateCanvas(imageWidth, imageHeight)
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

      const imageWidth = document.getElementById('sketch').clientWidth
      const imageHeight = document.getElementById('sketch').clientHeight
      updateCanvas(imageWidth, imageHeight)
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
</style>
