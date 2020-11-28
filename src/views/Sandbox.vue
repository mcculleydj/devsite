<template>
  <v-container>
    <h1>Sandbox</h1>
    <div id="svg-container"></div>
  </v-container>
</template>

<script>
import { init, drawCanvas } from '@/d3/force'

export default {
  mounted() {
    init()
    drawCanvas()
  },
}
</script>

<style scoped>
#svg-container {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
