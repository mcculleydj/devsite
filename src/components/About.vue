<template>
  <div>
    <transition name="minimize-fade">
      <Terminal
        v-if="showTerminal"
        :exitSignal="exitSignal"
        @shutdown="quitTerminal()"
      />
    </transition>
    <Thoughts v-if="showThoughts" />
    <v-btn
      v-if="showTerminal"
      fixed
      bottom
      text
      x-large
      color="primary"
      @click="exitSignal = true"
      :loading="exitSignal"
    >
      <v-icon>mdi-close</v-icon>
      <span class="lowercase">exit</span>
    </v-btn>
    <v-btn
      v-else
      fixed
      bottom
      text
      x-large
      color="primary"
      @click="openTerminal()"
    >
      <v-icon>mdi-console</v-icon>
      <span class="lowercase">whoami</span>
    </v-btn>
    <v-btn
      fixed
      bottom
      text
      x-large
      color="primary"
      style="left: 170px"
      @click="showInfoDialog = true"
    >
      <v-icon>mdi-information-outline</v-icon>
      <span class="lowercase">site info</span>
    </v-btn>
    <v-dialog v-model="showInfoDialog" max-width="800">
      <InfoDialog />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Thoughts from '@/components/Thoughts'
import Terminal from '@/components/Terminal'
import InfoDialog from '@/components/InfoDialog'

export default {
  components: {
    Thoughts,
    Terminal,
    InfoDialog,
  },

  computed: {
    ...mapGetters(['tab']),
  },

  data: () => ({
    showThoughts: true,
    showTerminal: false,
    exitSignal: false,
    timeout: null,
    showInfoDialog: false,
  }),

  beforeDestroy() {
    clearTimeout(this.timeout)
  },

  methods: {
    ...mapActions({
      dispatchSetSketchSource: 'setSketchSource',
    }),

    openTerminal() {
      this.showTerminal = true
      this.showThoughts = false
      this.dispatchSetSketchSource('sketch.png')
      this.exitSignal = false
    },

    quitTerminal() {
      this.dispatchSetSketchSource('sketch-outlined.png')
      this.showTerminal = false
      this.timeout = setTimeout(() => {
        this.showThoughts = true
      }, 300)
    },
  },

  watch: {
    tab() {
      if (this.tab !== 0) {
        this.showTerminal = false
        this.timeout = setTimeout(() => {
          this.showThoughts = true
        }, 300)
      }
    },
  },
}
</script>

<style scoped>
.lowercase {
  text-transform: lowercase;
  margin-left: 8px;
}

.minimize-fade-enter-active,
.minimize-fade-leave-active {
  transition: all 0.3s ease;
}

.minimize-fade-enter,
.minimize-fade-leave-to {
  transform: translateX(50vw) translateY(50vh);
  opacity: 0;
}
</style>
