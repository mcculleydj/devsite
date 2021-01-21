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
          style="max-width: 250px"
        />
      </v-col>
    </v-row>
    <v-row>
      <div id="supreme-court-svg-container" />
    </v-row>
    <v-row>
      <v-col>
        <pre>{{ selectedNominee }}</pre>
      </v-col>
    </v-row>
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
        { text: 'All Years', value: 1860 },
        { text: 'Past Century', value: 1920 },
        { text: 'Past 50 Years', value: 1970 },
        { text: 'Past 30 Years', value: 1990 },
      ],
      selectedNominee: null,
      callbacks: {
        selectNominee: this.selectNominee,
      },
    }
  },

  async mounted() {
    this.plotData = await readData()
    this.plot = drawCanvas()
    updatePlot(this.plot, this.plotData, this.minimumYear, this.callbacks, true)
  },

  methods: {
    selectNominee(nominee) {
      this.selectedNominee = nominee
    },

    updateRange() {
      const nomineeData = this.plotData.filter(d => d.year >= this.minimumYear)
      updatePlot(this.plot, nomineeData, this.minimumYear, this.callbacks)
    },
  },
}
</script>
