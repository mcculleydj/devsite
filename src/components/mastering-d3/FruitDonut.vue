<template>
  <v-container>
    <v-row style="max-width: 800px">
      <v-col>
        This is a simple donut chart visualization, however there is some hidden
        complexity. D3 can handle some transitions without intervention from the
        developer, but reactivity in a pie or donut chart is one of many cases
        where <i>attrTween()</i> and <i>interpolate()</i> are required to define
        how the SVG should tranistion from one rendered state to another. Select
        the different fruits to see these transitions in action.
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto mr-10">
        <v-row justify="center">
          <v-col class="pt-0" cols="auto">
            <v-radio-group
              v-model="fruit"
              @change="toggleFruit()"
              row
              class="mt-0"
            >
              <v-radio label="Apples" value="apples" />
              <v-radio label="Oranges" value="oranges" />
              <v-radio label="Lemons" value="lemons" />
            </v-radio-group>
          </v-col>
        </v-row>
        <div id="donut-svg-container"></div>
      </v-col>
      <v-col style="border-left: 1px solid lightgray" class="pl-10">
        <h4 class="mb-3">SOURCE DATA</h4>
        <pre>{{ chartData[fruit] }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { readData, drawCanvas, updateChart } from '@/d3/donut'

export default {
  data: () => ({
    fruit: 'apples',
    chartData: [],
    chart: null,
  }),

  async mounted() {
    this.chartData = await readData()
    this.chart = drawCanvas()
    updateChart(this.chart, this.chartData, this.fruit)
  },

  methods: {
    toggleFruit() {
      updateChart(this.chart, this.chartData, this.fruit)
    },
  },
}
</script>

<style></style>
