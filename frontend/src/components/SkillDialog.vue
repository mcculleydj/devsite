<template>
  <v-card max-width="800">
    <v-list-item>
      <v-list-item-avatar size="50" style="border: 1px solid grey">
        <v-img alt="" :src="skill.path" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title style="font-size: 24px">
          {{ skill.display }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ skill.years }} years experience | {{ proficiency }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text style="font-size: 18px" v-html="skill.description" />
  </v-card>
</template>

<script>
export default {
  props: ['skill'],

  computed: {
    proficiency() {
      if (this.skill.r === 25) return 'Familiar'
      else if (this.skill.r === 35) return 'Comfortable'
      else return 'Proficient'
    },
  },
}
</script>
