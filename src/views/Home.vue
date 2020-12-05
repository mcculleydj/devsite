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
    <Skills v-if="imageRendered" />
    <div id="svg-container" />
    <v-img id="sketch" src="main.png" @load="checkDimensions()" />
  </v-container>
</template>

<script>
import Skills from '@/components/Skills'
import { sleep } from '@/common/functions'

export default {
  components: {
    Skills,
  },

  data: () => ({
    tab: 0,
    imageRendered: false,
  }),

  methods: {
    async checkDimensions() {
      const sketch = document.getElementById('sketch')
      // need the DOM to provide image dimensions prior to rendering visualizations
      if (!sketch.clientWidth) {
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
