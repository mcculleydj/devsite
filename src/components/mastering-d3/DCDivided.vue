<template>
  <v-container class="mt-5">
    <v-row style="max-width: 800px">
      <v-col>
        Towards the end of Adam's course he asks you to go out and find a
        visualization he hasn't yet covered to reproduce on your own. I chose
        <a
          href="https://www.washingtonpost.com/graphics/2018/national/segregation-us-cities/"
          target="_blank"
          >this story</a
        >
        by Aaron Williams and Armand Emamdjomeh which appeared in the Washington
        Post and is demonstrated on
        <a
          href="https://observablehq.com/@aboutaaron/racial-demographic-dot-density-map"
          target="_blank"
          >Observable</a
        >. I found the census data online at
        <a href="https://ipums.org/" target="_blank">IPUMS</a> and processed it
        using Node and the
        <a href="https://turfjs.org/" target="_blank">Turf</a> library to reduce
        the complexity and client-side runtime of Aaron's implementation on
        Observable. I found shapefiles for DC with ward boundaries on the city's
        open data platform and converted them into GeoJSON.
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-select
          v-model="year"
          :items="yearItems"
          @change="update()"
          outlined
          :hint="loading"
          persistent-hint
          style="width: 250px"
        />
      </v-col>
      <v-col cols="auto">
        <v-select
          v-model="race"
          :items="raceItems"
          @change="update()"
          outlined
          :hint="loading"
          persistent-hint
          style="width: 250px"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div id="dc-svg-container"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { drawCanvas, updateMap } from '@/d3/dc'

export default {
  data: () => ({
    loading: '',
    year: '90',
    yearItems: [
      { text: '1990 Census', value: '90' },
      { text: '2000 Census', value: '00' },
      { text: '2010 Census', value: '10' },
      { text: '2012-2016 ACS Census', value: 'ACS' },
    ],
    race: 'All Races',
    raceItems: [
      'All Races',
      'Black',
      'Hispanic',
      'White',
      'Asian / Pacific Islander',
      'Other',
    ],
  }),

  async mounted() {
    this.loading = 'Loading...'
    await drawCanvas()
    await updateMap(this.year, this.race)
    this.loading = ''
  },

  methods: {
    async update() {
      this.loading = 'Loading...'
      await updateMap(this.year, this.race)
      this.loading = ''
    },
  },
}
</script>
