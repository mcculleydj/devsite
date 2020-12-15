<template>
  <div
    class="terminal-container mt-8 pa-3"
    :style="{ height: terminalHeight + 'px' }"
  >
    <div class="terminal">
      <template v-if="!introComplete">
        <template v-for="(line, i) in displayedLines">
          <div :key="`line-${i}`">{{ line }}</div>
        </template>
        <div>{{ line }}</div>
      </template>
      <div v-else>
        <div>{{ sigtermReceived ? exitText : method }}</div>
        <TerminalImage :sourceIndex="sourceIndex" @complete="next()" />
      </div>
    </div>
  </div>
</template>

<script>
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
import TerminalImage from '@/components/TerminalImage'
import { lines, methods } from '@/common/constants'

// TODO: add a progress bar

export default {
  components: {
    TerminalImage,
  },

  props: ['exitSignal'],

  computed: {
    linePrompt() {
      // lines requiring the standard '>' prompt
      const promptIndices = [0, 7, 10]
      return promptIndices.includes(this.displayedLines.length) ? '> ' : '... '
    },

    line() {
      const cursor = this.cursorState || this.isTyping ? '█' : ' '
      const line = this.sigtermReceivedLine
        ? '.exit'.slice(0, this.characterIndex)
        : lines[this.lineIndex].slice(0, this.characterIndex)
      return this.linePrompt + line + cursor
    },

    method() {
      const cursor = this.cursorState || this.isTyping ? '█' : ' '

      if (!this.cycleInitialized) {
        return '> ' + 'daren.'.slice(0, this.characterIndex) + cursor
      }

      const partialMethod = methods[this.methodIndex].slice(
        0,
        this.characterIndex,
      )
      return '> daren.' + partialMethod + cursor
    },
  },

  subscriptions() {
    // listen for and handle resize events
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(500),
      tap(() => {
        this.terminalHeight = window.innerHeight - 170
      }),
    )

    return { resize$ }
  },

  data: () => ({
    terminalHeight: 0,
    cursorState: true,
    interval: null,
    timeout: null,
    lineIndex: 0,
    characterIndex: 0,
    isTyping: false,
    displayedLines: [],
    methodIndex: 0,
    introComplete: false,
    cycleInitialized: false,
    sourceIndex: -1,
    isPaused: false,
    exitText: '',
    sigtermReceived: false,
    sigtermReceivedLine: false,
  }),

  mounted() {
    this.terminalHeight = window.innerHeight - 170
    this.blink()
    this.timeout = setTimeout(() => this.typeLine(), 1000)
  },

  beforeDestroy() {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  },

  methods: {
    next() {
      if (this.methodIndex === methods.length - 1) {
        setTimeout(this.exit, 3000)
        return
      }
      this.timeout = setTimeout(this.deleteMethod, 3000)
    },

    blink() {
      this.interval = setInterval(() => {
        this.cursorState = !this.cursorState
      }, 500)
    },

    typeLine() {
      let delay = Math.random() * 100 + 50

      // set isTyping and stop blink on first call
      if (this.characterIndex === 0) {
        this.lineIndex++
        clearInterval(this.interval)
        this.isTyping = true
        delay = Math.random() * 500 + 1000
      }

      // base case
      const lineLength = this.sigtermReceivedLine
        ? 6 // .exit
        : lines[this.lineIndex].length
      if (this.characterIndex === lineLength) {
        if (this.sigtermReceivedLine) {
          this.timeout = setTimeout(() => {
            this.$emit('shutdown')
          }, 1000)
          return
        }
        this.isTyping = false
        this.blink()

        if (this.lineIndex < lines.length - 1) {
          this.displayedLines.push(this.linePrompt + lines[this.lineIndex])
          this.characterIndex = 0
          this.sigtermReceivedLine = this.sigtermReceived
          // for closing } and )
          const shortDelayIndices = [5, 6, 9]
          const delay = shortDelayIndices.includes(this.lineIndex)
            ? 50
            : Math.random() * 200 + 500
          this.timeout = setTimeout(this.typeLine, delay)
        } else {
          // done with intro
          this.timeout = setTimeout(() => {
            this.displayedLines = []
            this.lineIndex = 0
            this.characterIndex = 0
            this.typeMethod()
          }, 750)
        }

        return
      }

      // recursive case
      this.timeout = setTimeout(() => {
        this.characterIndex++
        this.typeLine()
      }, delay)
    },

    typeMethod() {
      if (this.sigtermReceived && this.methodIndex !== methods.length - 1) {
        this.introComplete = true
        this.shutdown(0)
        return
      }

      if (!this.introComplete) {
        this.timeout = setTimeout(() => {
          this.introComplete = true
          this.typeMethod()
        }, 1000)
        return
      }

      // set isTyping and stop blink on first call
      if (this.characterIndex === 0) {
        this.isTyping = true
        clearInterval(this.interval)
      }

      // base case
      if (!this.cycleInitialized && this.characterIndex === 6) {
        // "daren." is a string of length 6
        this.isTyping = false
        this.blink()
        this.timeout = setTimeout(() => {
          this.characterIndex = 0
          this.cycleInitialized = true
          this.typeMethod()
        }, 1000)
        return
      } else if (this.characterIndex === methods[this.methodIndex].length) {
        this.isTyping = false
        this.blink()
        this.sourceIndex = this.methodIndex
        return
      }

      // recursive case
      this.timeout = setTimeout(() => {
        this.characterIndex++
        this.typeMethod()
      }, Math.random() * 50 + 100)
    },

    deleteMethod() {
      clearInterval(this.interval)

      // base case
      if (this.characterIndex === 0) {
        this.blink()
        this.methodIndex++
        this.timeout = setTimeout(() => {
          this.typeMethod()
        }, 2000)
        return
      }

      // recursive case
      this.timeout = setTimeout(() => {
        this.characterIndex--
        this.deleteMethod()
      }, Math.random() * 200 + 300)
    },

    exit(index) {
      if (index === undefined) {
        this.exitText = this.method.slice(0, index)
        this.sigtermReceived = true
        clearInterval(this.interval)
        clearTimeout(this.timeout)
        this.exit(this.method.length)
        return
      }

      // base case
      if (index === 1) {
        this.interval = setInterval(() => {
          this.exitText = this.exitText === '> ' ? '> █' : '> '
        }, 500)
        this.timeout = setTimeout(this.shutdown(0), 1500)
        return
      }

      // recursive case
      this.timeout = setTimeout(() => {
        this.exitText = this.method.slice(0, index)
        this.exit(--index)
      }, Math.random() * 100 + 50)
    },

    shutdown(index) {
      if (index === 0) {
        clearInterval(this.interval)
        this.exitText = '> █'
      }

      // base case
      if (index === 6) {
        this.timeout = setTimeout(() => {
          this.$emit('shutdown')
        }, 1000)
        return
      }

      // recursive case
      this.timeout = setTimeout(() => {
        this.exitText = '> .exit'.slice(0, index + 2) + '█'
        this.shutdown(++index)
      }, Math.random() * 100 + 50)
    },
  },

  watch: {
    exitSignal() {
      if (this.introComplete) {
        this.exit()
      } else {
        this.sigtermReceived = true
      }
    },
  },
}
</script>

<style scoped>
.terminal-container {
  border: 1px solid lightgray;
  overflow-y: scroll;
}

.terminal {
  font-family: monospace;
  color: #1976d2;
  font-size: 24px;
  word-wrap: break-word;
  white-space: pre-wrap;
  height: 100%;
}
</style>
