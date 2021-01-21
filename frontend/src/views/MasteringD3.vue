<template>
  <v-container>
    <v-navigation-drawer permanent app>
      <h1 class="pa-4">Mastering D3</h1>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :input-value="component === item.component"
          @click="component = item.component"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <component class="mt-10" :is="component" />
  </v-container>
</template>

<script>
import Cryptocurrency from '@/components/mastering-d3/Cryptocurrency'
import GapMinder from '@/components/mastering-d3/GapMinder'
import FruitDonut from '@/components/mastering-d3/FruitDonut'
import DCDivided from '@/components/mastering-d3/DCDivided'
import Dashboard from '@/components/mastering-d3/Dashboard'
import SupremeCourt from '@/components/mastering-d3/SupremeCourt'

export default {
  data: () => ({
    component: SupremeCourt,
    items: [
      {
        title: 'Awaiting Justice',
        component: SupremeCourt,
        icon: 'mdi-gavel',
      },
      {
        title: 'Cryptocurrency',
        component: Cryptocurrency,
        icon: 'mdi-chart-line',
      },
      {
        title: 'Gap Minder',
        component: GapMinder,
        icon: 'mdi-chart-scatter-plot',
      },
      {
        title: 'Fruit Donut',
        component: FruitDonut,
        icon: 'mdi-chart-arc',
      },
      { title: 'DC Divided', component: DCDivided, icon: 'mdi-map' },
      { title: 'Dashboard', component: Dashboard, icon: 'mdi-view-dashboard' },
    ],
  }),
}
</script>
