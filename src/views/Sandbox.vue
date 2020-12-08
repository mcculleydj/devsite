<template>
  <div>
    <div
      v-for="(div, i) in divs"
      class="box"
      :key="div.title"
      :style="rotate(i, div)"
    >
      <h3>{{ div.title }}</h3>
      <p>{{ div.text }}</p>
    </div>
    <v-card
      v-for="(div, i) in divs"
      width="600"
      class="card"
      :key="'card' + div.title"
      :style="rotateCard(i, div)"
    >
      <v-card-title>{{ div.title }}</v-card-title>
      <v-card-text>{{ div.text }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    divs: [
      {
        color: 'red',
        title: 'foo',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        color: 'blue',
        title: 'bar',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        color: 'green',
        title: 'baz',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
  }),

  methods: {
    rotate(i, div) {
      return {
        transform: `rotate(${10 * i}deg)`,
        'transform-origin': 'center right',
        'z-index': this.divs.length - i,
        'background-color': div.color,
      }
    },
    rotateCard(i) {
      return {
        transform: `rotate(${10 * i}deg)`,
        'transform-origin': 'center right',
        'z-index': this.divs.length - i,
      }
    },
  },
}
</script>

<style scoped>
.box {
  position: fixed;
  top: 400px;
  left: 400px;
  width: 600px;
}

.card {
  position: fixed;
  top: 400px;
  left: 400px;
}
</style>
