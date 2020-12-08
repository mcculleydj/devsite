<template>
  <div>
    {{ width }} {{ cardWidth }} {{ thoughts.length }}
    <v-card
      v-for="(thought, i) in thoughts"
      :key="`thought-${thought.title}`"
      :style="
        selected === i
          ? {}
          : {
              position: 'absolute',
              top: '0px',
              left: '0px',
              'transform-origin': 'center right',
              transform: `translate(${x}px, ${y}px) rotate(${10 * i}deg)`,
              'z-index': selected === i ? '15' : thoughts.length - i,
            }
      "
      class="thought-card"
      :width="cardWidth"
      @click="selected = i"
      elevation="5"
    >
      <v-card-title>{{ thought.title }}</v-card-title>
      <v-card-text>
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

// circular overlay to prevent click events
// animate card selection and return
// replace click with something else

export default {
  computed: {
    cardWidth() {
      return this.width / 2 > 600
        ? 600
        : this.width / 2 < 400
        ? 400
        : this.width / 2
    },
  },

  data: () => ({
    thoughts,
    selected: -1,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  }),

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(500),
      tap(() => {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.x = window.innerWidth - 100 - this.cardWidth
        this.y = window.innerHeight - 190
      }),
    )

    return { resize$ }
  },

  mounted() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.x = window.innerWidth - 100 - this.cardWidth
    this.y = window.innerHeight - 190
  },
}
</script>

<style scoped>
.thought-card:hover {
  background-color: lightgray;
}
</style>
