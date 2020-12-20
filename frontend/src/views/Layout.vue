<template>
  <v-container fluid>
    <v-tabs v-model="tab" @change="handleTabChange">
      <v-tab>
        ABOUT
      </v-tab>
      <v-tab>
        SKILLS
      </v-tab>
      <v-tab>
        PROJECTS
      </v-tab>
      <v-tab>
        CONTACT
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <About v-if="sketchHasDimensions" />
      </v-tab-item>
      <v-tab-item>
        <Skills />
      </v-tab-item>
      <v-tab-item>
        <Projects />
      </v-tab-item>
      <v-tab-item>
        <Contact />
      </v-tab-item>
    </v-tabs-items>
    <v-img
      v-show="showSketch"
      id="sketch"
      :src="sketchSource"
      max-width="33%"
      @load="getDimensions()"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import { sleep } from '@/common/functions'

export default {
  components: {
    About,
    Skills,
    Projects,
    Contact,
  },

  computed: {
    ...mapGetters(['showSketch', 'sketchSource']),
  },

  data: () => ({
    tab: 0,
    sketchHasDimensions: false,
  }),

  methods: {
    ...mapActions({
      dispatchSetTab: 'setTab',
      dispatchSetShowSketch: 'setShowSketch',
      dispatchSetSketchSource: 'setSketchSource',
    }),

    async getDimensions() {
      const el = document.getElementById('sketch')
      if (!el || el.clientWidth === 0 || el.clientHeight === 0) {
        await sleep(100)
        this.getDimensions()
        return
      }
      this.sketchHasDimensions = true
    },

    handleTabChange(tab) {
      this.dispatchSetTab(tab)
      // list view may hide sketch
      if (tab !== 1) {
        this.dispatchSetShowSketch(true)
      }
      this.dispatchSetSketchSource(tab ? 'sketch.png' : 'sketch-outlined.png')
    },
  },
}
</script>

<style scoped>
#sketch {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 11;
  pointer-events: none;
}
</style>
