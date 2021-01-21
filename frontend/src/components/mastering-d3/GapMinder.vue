<template>
  <v-container class="mt-5">
    <v-row style="max-width: 800px">
      <v-col>
        <p>
          This is a reproduction of a
          <a href="https://www.youtube.com/watch?v=jbkSRLYSojo" target="_blank"
            >famous data visualization</a
          >
          that uses four dimensions to explain how the quality of life has
          changed in each country over the past two centuries. Life expectancy
          and income are on the axes. Population is represented by the area of
          the circle and geographic location by the color. The state necessary
          to play, pause, and reset are maintained by the containing Vue
          component. You can click on a country to highlight it and follow its
          progress over time.
        </p>
        <p>
          An important lesson learned while building this is how easy it would
          be to misconstrue the data. Failure to make it clear to the reader
          that the x-axis is logarithmic results in thinking that the income gap
          between Somalia and the US is much smaller than it actually is.
          Similarly, it is less complex to relate population to the radius,
          however the human brain constrasts circles by area and area scales
          with r<sup>2</sup> not r.
        </p>
      </v-col>
    </v-row>
    <v-row style="max-width: 800px" align="center" class="mb-8">
      <v-col cols="auto">
        <v-btn @click="play ? pauseFn() : playFn()" color="primary" outlined>
          <v-icon>{{ play ? 'mdi-pause' : 'mdi-play' }}</v-icon>
          {{ play ? 'Pause' : 'Play' }}
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="reset()" color="primary" outlined>
          <v-icon>mdi-refresh</v-icon>
          Reset
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-select
          v-model="selectedContinent"
          :items="continentItems"
          @change="applyContinentFilter()"
          dense
          outlined
          label="Continent"
          style="width: 200px"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row style="max-width: 800px">
      <v-col>
        <v-slider
          v-model="year"
          thumb-label="always"
          min="1800"
          max="2014"
          @mousedown="pauseFn()"
          @end="setYear($event)"
        />
      </v-col>
    </v-row>
    <v-row v-if="loading" justify="center" align="center">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mt-12"
        size="40"
      />
    </v-row>
    <v-row v-show="!loading">
      <div id="gap-minder-svg-container" />
    </v-row>
  </v-container>
</template>

<script>
import { readData, drawCanvas, updatePlot, updateInfo } from '@/d3/gap-minder'

export default {
  data: () => ({
    interval: null,
    plotData: null,
    plot: null,
    continentItems: [
      { text: 'All', value: 'all' },
      { text: 'Africa', value: 'africa' },
      { text: 'Americas', value: 'americas' },
      { text: 'Asia', value: 'asia' },
      { text: 'Europe', value: 'europe' },
    ],
    play: true,
    index: 0,
    year: 1800,
    selectedCountry: null,
    selectedCountryEl: null,
    selectedContinent: 'all',
    loading: false,
  }),

  async mounted() {
    this.loading = true
    this.plotData = await readData()
    this.loading = false
    this.plot = drawCanvas()
    this.playFn()
  },

  beforeDestroy() {
    clearInterval(this.interval)
  },

  methods: {
    selectCountry(country, el, previousColor) {
      this.selectedCountry = country

      if (!this.play) {
        // set fill and update incase visualization is paused
        if (this.selectedCountryEl) {
          this.selectedCountryEl.el.setAttribute(
            'fill',
            this.selectedCountryEl.previousColor,
          )
        }
        el.setAttribute('fill', 'gold')
        this.selectedCountryEl = { el, previousColor }

        updateInfo(
          this.plot,
          this.plotData[this.index].countries,
          this.selectedCountry,
        )
      }
    },

    playFn() {
      this.interval = setInterval(() => {
        // restart at 1800
        if (this.index >= this.plotData.length - 1) {
          this.index = 0
        }

        updatePlot(
          this.plot,
          this.plotData[this.index++],
          this.selectedCountry,
          this.selectedContinent,
          { selectCountry: this.selectCountry },
        )

        updateInfo(
          this.plot,
          this.plotData[this.index].countries,
          this.selectedCountry,
        )

        this.year = 1800 + this.index - 1
      }, 300)

      this.play = true
    },

    pauseFn() {
      clearInterval(this.interval)
      this.play = false
    },

    reset() {
      clearInterval(this.interval)
      this.index = 0
      this.selectedContinent = 'all'
      this.selectedCountry = null
      this.playFn()
    },

    applyContinentFilter() {
      // determine if selected country is still visible after the filter
      if (this.selectedCountry) {
        const country = this.plotData[this.index].countries.find(
          c => c.country === this.selectedCountry,
        )
        if (
          this.selectedContinent !== 'all' &&
          country.continent !== this.selectedContinent
        ) {
          this.selectedCountry = null
        }
      }

      // handle update if visualization is paused
      if (!this.play) {
        updatePlot(
          this.plot,
          this.plotData[this.index],
          this.selectedCountry,
          this.selectedContinent,
          { selectCountry: this.selectCountry },
        )

        updateInfo(
          this.plot,
          this.plotData[this.index].countries,
          this.selectedCountry,
        )
      }
    },

    setYear() {
      this.index = this.year - 1800
      updatePlot(
        this.plot,
        this.plotData[this.index],
        this.selectedCountry,
        this.selectedContinent,
        { selectCountry: this.selectCountry },
      )

      updateInfo(
        this.plot,
        this.plotData[this.index].countries,
        this.selectedCountry,
      )
    },
  },
}
</script>
