<template>
  <!-- <div class="terminal-comment">
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
  </div> -->
  <div id="svg-container"></div>
</template>

<script>
// import { sources, comments, masks } from '@/common/constants'

// export default {
//   computed: {
//     comments() {
//       return this.sourceIndex >= 0 ? comments[this.sourceIndex] : undefined
//     },

//     source() {
//       return this.sourceIndex >= 0 ? sources[this.sourceIndex] : undefined
//     },
//   },

//   data: () => ({
//     masks,
//     lines: [],
//     displayedLines: new Array(15).fill(null).map(() => []),
//     sourceIndex: 6,
//   }),

//   mounted() {
//     this.setLines()
//     this.changeLines()
//   },

//   methods: {
//     changeLines() {
//       // 15 lines => open comment; 3 comment lines; 10 picture lines; close comment
//       for (let i = 0; i < 15; i++) {
//         const governingLength = Math.max(
//           this.displayedLines[i].length,
//           this.lines[i].length,
//         )
//         for (let j = 0; j < governingLength; j++) {
//           if (j < this.lines[i].length) {
//             this.displayedLines[i].splice(j, 1, this.lines[i][j])
//           } else {
//             // TODO: trim these spaces after the cursor has passed over them
//             this.displayedLines[i].splice(j, 1, ' ')
//           }

//           if (j + 1 < governingLength) {
//             this.displayedLines[i].splice(j + 1, 1, '▕')
//           }
//         }
//       }
//       this.$emit('complete')
//     },

//     setLines() {
//       const first = [['/', '*', '*']]
//       const prefix = [' ', '*', ' ']
//       const last = [[' ', '*', '/']]

//       // an array of arrays where each member is either an img URL
//       // or a single asterisk character based on the mask
//       const rows = masks[this.sourceIndex].map((row, i) =>
//         row
//           .split('')
//           .map((c, j) =>
//             c === '*' ? '·' : `intro/${this.source}-${i}-${j}.jpg`,
//           ),
//       )

//       this.lines = first
//         .concat(this.comments.map(comment => prefix.concat(comment.split(''))))
//         .concat(rows.map(r => prefix.concat(r)))
//         .concat(last)
//     },
//   },
// }

import * as d3 from 'd3'

const hexPoints = [
  { x: 899.5, y: 279.6923788646684 },
  { x: 1029.403810567666, y: 354.6923788646684 },
  { x: 1029.403810567666, y: 504.6923788646684 },
  { x: 899.5, y: 579.6923788646684 },
  { x: 769.5961894323342, y: 504.6923788646684 },
  { x: 769.5961894323342, y: 354.6923788646684 },
  { x: 899.5, y: 279.6923788646684 },
]

export default {
  mounted() {
    const svg = d3
      .select('#svg-container')
      .append('svg')
      .attr('width', 2000)
      .attr('height', 2000)

    console.log(hexPoints.map(v => [v.x, v.y].join(',')).join(' '))

    svg
      .append('defs')
      .append('pattern')
      .attr('id', 'my-img')
      .attr('width', 1)
      .attr('height', 1)
      .append('svg:image')
      .attr('xlink:href', 'd3.png')
      .attr('width', 290)
      .attr('height', 290)
      .attr('x', -12)

    svg
      .append('polygon')
      .attr('stroke', 'rgba(0, 0, 0, 0.2')
      .attr('points', hexPoints.map(v => [v.x, v.y].join(',')).join(' '))
      .attr('fill', 'url(#my-img)')
  },
}
</script>

<style scoped>
/* .terminal-comment {
  font-family: monospace;
  color: grey;
  font-size: 24px;
  word-wrap: break-word;
  white-space: pre-wrap;
  height: 100%;
} */

#svg-container {
  position: fixed;
  top: 72px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 12;
}
</style>
