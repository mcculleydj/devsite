<template>
  <v-container class="mt-5">
    <v-row style="max-width: 800px">
      <v-col>
        <i>WORK IN PROGRESS</i>
        <p>
          A freelance data visualization project that examines the history of
          Supreme Court nominations and how long it takes to fill the job.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="minimumYear"
          :items="minimumYears"
          outlined
          @change="updateRange()"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="legend pt-0">
        <v-row>
          <v-col>
            <div class="legend__header">White House and Senate</div>
            <div class="legend__item">
              <div class="legend__circle legend__circle--same"></div>
              <div class="legend__text">
                Same Party
              </div>
            </div>
            <div class="legend__item">
              <div class="legend__circle legend__circle--different"></div>
              <div class="legend__text">
                Different Party
              </div>
            </div>
          </v-col>
          <v-col>
            <div class="legend__header">Outcome</div>
            <div class="legend__item">
              <div class="legend__circle legend__circle--confirmed"></div>
              <div class="legend__text">
                Confirmed
              </div>
            </div>
            <div class="legend__item">
              <div class="legend__circle legend__circle--rejected"></div>
              <div class="legend__text">
                Rejected
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <div class="nominee">
          <transition name="fade">
            <div v-if="showNominee">{{ displayedNominee }}</div>
          </transition>
        </div>
      </v-col>
    </v-row>
    <!-- svg container -->
    <div id="supreme-court-svg-container" />
  </v-container>
</template>

<script>
import { readData, drawCanvas, updatePlot } from '@/d3/supreme-court'

export default {
  data: function() {
    return {
      plotData: null,
      plot: null,
      minimumYear: 1860,
      minimumYears: [
        { text: '1860 to Present', value: 1860 },
        { text: 'Past Century', value: 1920 },
        { text: 'Past 50 Years', value: 1970 },
        { text: 'Past 30 Years', value: 1990 },
      ],
      displayedNominee: '',
      showNominee: false,
      callbacks: {
        displayNominee: this.displayNominee,
      },
    }
  },

  async mounted() {
    this.plotData = await readData()
    this.plot = drawCanvas()
    updatePlot(this.plot, this.plotData, this.minimumYear, this.callbacks, true)
  },

  methods: {
    displayNominee(nominee) {
      if (!nominee) {
        this.showNominee = false
        return
      }
      this.showNominee = true
      this.displayedNominee = `${nominee.nominee} | Nominated: ${nominee.nominationDate} | ${nominee.result}: ${nominee.voteDate}`
    },

    updateRange() {
      const nomineeData = this.plotData.filter(d => d.year >= this.minimumYear)
      updatePlot(this.plot, nomineeData, this.minimumYear, this.callbacks)
    },
  },
}
</script>

<style scoped>
#supreme-court-svg-container {
  display: inline-block;
  width: 100%;
}

.legend {
  text-align: center;
}

.legend__header {
  font-weight: 700;
  text-transform: uppercase;
}

.legend__item {
  padding: 10px;
  display: inline-block;
  position: relative;
  border-top: 1px solid #999;
}

.legend__item:not(:last-child) {
  padding-right: 16px;
}

.legend__circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.legend__circle--same {
  border-color: coral;
}

.legend__circle--different {
  border-color: #779ecb;
}

.legend__circle--confirmed {
  border-color: gray;
}

.legend__circle--rejected {
  border-color: gray;
  background-color: gray;
}

.legend__text {
  display: inline-block;
  margin-left: 10px;
}

.nominee {
  height: 16px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
