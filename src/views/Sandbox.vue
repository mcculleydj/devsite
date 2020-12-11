<template>
  <div class="terminal-comment">
    {{ source }}
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
</template>

<script>
import { sources, comments, masks } from '@/common/constants'

export default {
  computed: {
    comments() {
      return this.sourceIndex >= 0 ? comments[this.sourceIndex] : undefined
    },

    source() {
      return this.sourceIndex >= 0 ? sources[this.sourceIndex] : undefined
    },
  },

  data: () => ({
    masks,
    lines: [],
    displayedLines: new Array(15).fill(null).map(() => []),
    sourceIndex: 1,
  }),

  mounted() {
    this.setLines()
    this.changeLines()
  },

  methods: {
    changeLines() {
      // 15 lines => open comment; 3 comment lines; 10 picture lines; close comment
      for (let i = 0; i < 15; i++) {
        const governingLength = Math.max(
          this.displayedLines[i].length,
          this.lines[i].length,
        )
        for (let j = 0; j < governingLength; j++) {
          if (j < this.lines[i].length) {
            this.displayedLines[i].splice(j, 1, this.lines[i][j])
          } else {
            // TODO: trim these spaces after the cursor has passed over them
            this.displayedLines[i].splice(j, 1, ' ')
          }

          if (j + 1 < governingLength) {
            this.displayedLines[i].splice(j + 1, 1, '▕')
          }
        }
      }
      this.$emit('complete')
    },

    setLines() {
      const first = [['/', '*', '*']]
      const prefix = [' ', '*', ' ']
      const last = [[' ', '*', '/']]

      // an array of arrays where each member is either an img URL
      // or a single asterisk character based on the mask
      const rows = masks[this.sourceIndex].map((row, i) =>
        row
          .split('')
          .map((c, j) =>
            c === '*' ? '·' : `intro/${this.source}-${i}-${j}.jpg`,
          ),
      )

      this.lines = first
        .concat(this.comments.map(comment => prefix.concat(comment.split(''))))
        .concat(rows.map(r => prefix.concat(r)))
        .concat(last)
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
