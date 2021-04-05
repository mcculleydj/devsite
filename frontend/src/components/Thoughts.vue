<template>
  <div>
    <div id="banner">
      <div>Hello, world!</div>
      <div>I am Daren McCulley, a humble coder.</div>
      <div>Welcome to my interactive self-promotion.</div>
    </div>
    <div class="sub-text" :style="{ width: 1.3 * cardWidth + 'px' }">
      Here are ten takes on writing code to give you a sense of where I stand.
      For a more personal introduction, please click on whoami. To learn about
      my past, please click on work exp. If you want to see what I can do today,
      check out skills and projects.
    </div>
    <v-card
      v-for="(thought, i) in thoughts"
      :key="`thought-${thought.title}`"
      :style="
        selected === i
          ? {
              'transform-origin': 'center right',
              'border-left': '5px solid #1976d2',
            }
          : {
              'border-left': '3px solid #1976d2',
              'transform-origin': 'center right',
              transform: `translate(${x}px, ${y}px) rotate(${
                selected > -1 ? 1.5 * i : 10 * i
              }deg)`,
              'z-index': thoughts.length - i,
            }
      "
      class="thought-card"
      :class="{ selected: selected === i }"
      :width="cardWidth"
      @mouseup="selected = i"
      :elevation="selected === i ? 0 : 5"
      tile
      :flat="selected === i"
    >
      <v-card-title style="font-size: 1.3rem" class="justify-space-between">
        <span>{{ thought.title }}</span>
        <v-btn
          v-if="selected === i"
          fab
          small
          color="primary"
          @click.stop="selected = -1"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text
        style="font-size: 1.1rem; line-height: 26.4px;"
        v-html="selected === i ? thought.text : thought.text.slice(0, 25)"
      />
      <v-card-text
        v-if="selected === i"
        style="font-size: 1.1rem; line-height: 26.4px;"
      >
        <i v-html="thought.quote" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fromEvent } from 'rxjs'
import { filter, tap, debounceTime } from 'rxjs/operators'
import { thoughts } from '@/common/constants'

// TODO: circular overlay to prevent click events in image
// TODO: below certain dimensions take cards could open as dialogs
//       or need to tell user that view port is not suppoted

export default {
  computed: {
    ...mapGetters(['tab']),

    cardWidth() {
      return 1.2 * this.imageWidth
    },
  },

  data: () => ({
    hasResized: false,
    thoughts,
    selected: -1,
    width: 0,
    height: 0,
    imageWidth: 0,
    imageHeight: 0,
    x: 0,
    y: 0,
  }),

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      filter(() => this.tab === 0),
      debounceTime(500),
      tap(() => {
        this.setGeometry()
      }),
    )

    return { resize$ }
  },

  mounted() {
    this.setGeometry()
  },

  methods: {
    setGeometry() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.imageWidth = document.getElementById('sketch').clientWidth
      this.imageHeight = document.getElementById('sketch').clientHeight
      this.x = window.innerWidth - this.cardWidth - 100
      this.y = window.innerHeight - 200
    },
  },

  watch: {
    async tab() {
      if (this.tab === 0) {
        this.setGeometry()
      }
    },
  },
}
</script>

<style scoped>
#banner {
  color: #1976d2;
  font-size: 1.8rem;
  padding-top: 1.8rem;
  padding-bottom: 1.8rem;
}

.sub-text {
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.1rem;
  margin-bottom: 1.3rem;
  max-width: 750px !important;
  border-left: 5px solid #1976d2;
  padding-left: 16px;
}

.thought-card {
  position: absolute;
  top: 0px;
  left: 0px;
  transition: all 0.75s ease;
}

.thought-card:hover {
  background-color: lightgray;
  cursor: pointer;
}

.selected {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 750px !important;
  transform: translate(12px, 244px) rotate(0deg);
}

.selected:hover {
  background-color: white;
  cursor: default;
}
</style>
