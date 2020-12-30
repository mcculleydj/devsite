<template>
  <div class="terminal-comment">
    <v-row v-for="(line, i) in displayedLines" :key="`line-${i}`" no-gutters>
      <template v-for="(s, j) in line">
        <img
          v-if="s.length > 1"
          :key="`image-piece-${i}-${j}`"
          :src="s"
          class="image-piece"
          width="14.41px"
          height="35.56px"
        />
        <div v-else :key="`character-${i}-${j}`">{{ s }}</div>
      </template>
    </v-row>
  </div>
  <!-- <div id="svg-container"></div> -->
</template>

<script>
import Vue from 'vue'
import { methods, comments, masks } from '@/common/constants'

export default {
  computed: {
    comments() {
      return this.sourceIndex >= 0 ? comments[this.sourceIndex] : undefined
    },

    source() {
      return this.sourceIndex >= 0
        ? methods[this.sourceIndex].slice(0, -2)
        : undefined
    },
  },

  data: () => ({
    sourceIndex: 9,
    masks,
    lines: [],
    displayedLines: new Array(16).fill(null).map(() => []),
  }),

  mounted() {
    this.sourceIndex++
  },

  methods: {
    async changeLines() {
      // 16 lines => open comment; 3 comment lines; 10 picture lines; progress; close comment
      for (let i = 0; i < 16; i++) {
        const trimmedLength =
          i < 3
            ? this.displayedLines[i].join('').trimEnd().length
            : this.displayedLines[i].length
        const governingLength = Math.max(
          // remove trailing spaces from consideration
          trimmedLength,
          this.lines[i].length,
        )
        for (let j = 0; j < governingLength; j++) {
          if (j < this.lines[i].length) {
            this.displayedLines[i].splice(j, 1, this.lines[i][j])
          } else {
            // TODO: trim these spaces after the cursor has passed over them
            // so that we don't have " ", " " for the shorter strings
            this.displayedLines[i].splice(j, 1, ' ')
          }

          if (j + 1 < governingLength) {
            this.displayedLines[i].splice(j + 1, 1, '▕')
          }
        }
        if (i > 0 && i < 4) {
          const displayedLine = this.displayedLines[i]
            .join('')
            .trimEnd()
            .split('')
          Vue.set(this.displayedLines, i, displayedLine)
        }
      }
      // setTimeout(() => {
      //   this.sourceIndex++
      // }, 2000)
    },

    setLines() {
      const first = [['/', '*', '*']]
      const prefix = [' ', '*', ' ']
      const progress = new Array(this.sourceIndex + 1)
        .fill('#')
        .concat(new Array(methods.length - this.sourceIndex - 1).fill(' '))
      let progressLine = [` * progress [${progress.join('')}]`.split('')]
      
      if (this.sourceIndex === 10) {
        progressLine[0].push(...' - Thanks for your attention!'.split(''))
      }

      const last = [[' ', '*', '/']]

      // an array of arrays where each member is either an img URL
      // or a single asterisk character based on the mask
      const rows = masks[this.sourceIndex].map((row, i) =>
        row
          .split('')
          .map((c, j) =>
            c !== ' ' ? c : `intro/${this.source}-${i}-${j}.jpg`,
          ),
      )

      this.lines = first
        .concat(this.comments.map(comment => prefix.concat(comment.split(''))))
        .concat(rows.map(r => prefix.concat(r)))
        .concat(progressLine)
        .concat(last)
    },
  },

  watch: {
    sourceIndex() {
      this.setLines()
      this.changeLines()
    },
  },
}
</script>

<style scoped>
.terminal-comment {
  font-family: monospace;
  color: grey;
  font-size: 24px;
  word-wrap: break-word;
  white-space: pre-wrap;
  height: 100%;
}
</style>
