<template>
  <v-container fluid>
    <v-tabs v-model="tab">
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
        <About />
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
      src="main-alt3.png"
      max-width="33%"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default {
  components: {
    About,
    Skills,
    Projects,
    Contact,
  },

  computed: {
    ...mapGetters(['showSketch']),
  },

  data: () => ({
    tab: 0,
  }),
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
