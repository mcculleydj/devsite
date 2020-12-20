<template>
  <v-container fluid class="py-0 terminal">
    <v-row>
      <v-col>
        <template v-if="!introComplete">
          <template v-for="(line, i) in displayedLines">
            <div :key="`line-${i}`">{{ line }}</div>
          </template>
          <div>{{ line }}</div>
        </template>
        <div v-else-if="!sigtermReceived">
          <div>{{ method }}</div>
          <transition name="fade">
            <v-img v-if="source" :src="source" height="400" class="my-2" />
          </transition>
          <transition name="fade">
            <div v-if="source">{{ comment }}</div>
          </transition>
        </div>
        <div v-else>
          {{ exitText }}
        </div>
      </v-col>
    </v-row>
    <div class="footer">
      <span v-if="sigtermReceived">SIGTERM Received</span>
      <template v-else>
        <span class="highlight">⌥X</span>
        <span>{{ ' Exit  ' }} </span>
        <span class="highlight">⌥P</span>
        <span>{{ isPaused ? ' Play  ' : ' Pause  ' }} </span>
        <span class="highlight">⌥M</span>
        <span>{{ ' Matrix' }} </span>
      </template>
    </div>
  </v-container>
</template>

<script>
import { lines, methods, sources, comments } from '@/common/constants'

export default {
  computed: {
    linePrompt() {
      // lines for which we want the standard '>' prompt
      const promptIndices = [0, 8, 11]
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

    source() {
      if (this.sourceIndex < 0) return
      return sources[this.sourceIndex]
    },

    comment() {
      if (this.sourceIndex < 0) return
      return comments[this.sourceIndex]
    },
  },

  data: () => ({
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
    keySubmitHandler: () => {},
  }),

  mounted() {
    this.blink()
    this.timeout = setTimeout(() => this.typeLine(), 2000)
    this.keySubmitHandler = e => {
      if (e.altKey && e.keyCode === 88) {
        if (this.introComplete) {
          this.exit()
        } else {
          this.sigtermReceived = true
        }
      }
    }
    document.body.addEventListener('keydown', this.keySubmitHandler)
  },

  beforeDestroy() {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
    document.body.removeEventListener('keydown', this.keySubmitHandler)
  },

  methods: {
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
          this.timeout = setTimeout(this.typeLine, Math.random() * 750 + 750)
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
        this.timeout = setTimeout(this.deleteMethod, 5000)
        return
      }

      // recursive case
      this.timeout = setTimeout(() => {
        this.characterIndex++
        this.typeMethod()
      }, Math.random() * 50 + 100)
    },

    nextMethod() {
      if (this.methodIndex === methods.length - 1) {
        this.methodIndex = 0
      } else {
        this.methodIndex++
      }
    },

    deleteMethod() {
      clearInterval(this.interval)

      // base case
      if (this.characterIndex === 0) {
        this.blink()
        this.nextMethod()
        this.sourceIndex = -1
        this.timeout = setTimeout(() => {
          this.typeMethod()
        }, 2000)
        return
      }

      // recursive case
      this.timeout = setTimeout(() => {
        this.characterIndex--
        this.deleteMethod()
      }, Math.random() * 500 + 300)
    },

    exit(index) {
      if (index === undefined) {
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
}
</script>

<style scoped>
.terminal {
  font-family: monospace;
  color: rgb(0, 255, 0);
  font-size: 36px;
  word-wrap: break-word;
  white-space: pre-wrap;
  height: 100%;
  background-color: black;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 3;
  background-color: black;
}

.footer span {
  white-space: pre;
}

.highlight {
  background-color: rgb(0, 255, 0);
  color: black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
