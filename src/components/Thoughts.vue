<template>
  <div>
    <div id="banner">
      <div>Welcome to my interactive self-promotion.</div>
      <div>Check out skills and projects to see what I can do.</div>
      <div>
        Or hang out here to learn more about me and my take on coding.
      </div>
    </div>
    <div class="sub-text">
      During an interview I ask certain questions to learn about a candidate's
      approach to building software. They tend to be more philosophical than
      technical in nature, but on the job experience correlates with the quality
      of the responses. Here are ten "takes" on writing code based on questions
      I've been asked as a candidate or questions I like to ask as an
      interviewer intended to give you a sense of where I stand.
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
                selected > -1 ? 2 * i : 10 * i
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
        <i>{{ thought.quote }}</i>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
import { thoughts } from '@/common/constants'

// TODO: circular overlay to prevent click events in image
// TODO: below certain dimensions could just be a v-dialog

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
  max-width: 800px;
  border-left: 5px solid #1976d2;
  padding-left: 16px;
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
  position: fixed;
  top: 0px;
  left: 0px;
  width: 800px !important;
  transform: translate(12px, 244px) rotate(0deg);
}

.selected:hover {
  background-color: white;
  cursor: default;
}
</style>
