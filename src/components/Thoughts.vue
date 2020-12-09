<template>
  <div>
    <div class="sub-text">
      lorem ipsum
      <v-btn @click="$emit('intro')">Show Intro</v-btn>
    </div>
    <v-card
      v-for="(thought, i) in thoughts"
      :key="`thought-${thought.title}`"
      :style="
        selected === i
          ? {
              'transform-origin': 'center right',
            }
          : {
              'transform-origin': 'center right',
              transform: `translate(${x}px, ${y}px) rotate(${10 * i}deg)`,
              'z-index': thoughts.length - i,
            }
      "
      class="thought-card"
      :class="{ selected: selected === i }"
      :width="cardWidth"
      @mouseup="selected = i"
      elevation="5"
    >
      <v-card-title>{{ thought.title }}</v-card-title>
      <v-card-text style="font-size: 1.1rem">
        {{ selected === i ? thought.text : thought.text.slice(0, 25) }}
      </v-card-text>
      <v-card-actions v-if="selected === i" class="justify-end">
        <v-btn
          fab
          small
          color="primary"
          style="transform: rotate(45deg)"
          @click.stop="selected = -1"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
import { thoughts } from '@/common/constants'

// circular overlay to prevent click events in image

export default {
  computed: {
    cardWidth() {
      return 1.3 * this.imageWidth
    },
  },

  data: () => ({
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
}
</script>

<style scoped>
.sub-text {
  color: slategray;
  font-size: 1.3rem;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
}

.thought-card {
  position: absolute;
  top: 0px;
  left: 0px;
  -webkit-transition: all 0.75s ease;
  -moz-transition: all 0.75s ease;
  -o-transition: all 0.75s ease;
  -ms-transition: all 0.75s ease;
  transition: all 0.75s ease;
}

.thought-card:hover {
  background-color: lightgray;
  cursor: pointer;
}

.selected {
  position: absolute;
  top: 0px;
  left: 0px;
  transform: translate(0px, 160px) rotate(0deg);
}

.selected:hover {
  background-color: white;
  cursor: default;
}
</style>
