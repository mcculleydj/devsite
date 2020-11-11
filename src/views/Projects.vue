<template>
  <v-container>
    <h1>Projects</h1>
    <v-list>
      <v-list-item
        v-for="project in projects"
        :key="project.name"
        :to="project.link"
      >
        <v-list-item-content>
          <v-list-item-title>{{ project.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'Projects',

  data: () => ({
    projects: [{ name: 'Mastering D3', link: '/' }],
  }),
}
</script>
