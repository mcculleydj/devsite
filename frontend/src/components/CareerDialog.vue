<template>
  <v-card>
    <v-card-text style="font-size: 1.1rem" class="py-0">
      <v-row class="py-3">
        <v-col
          cols="auto"
          class="pl-0 py-0"
          style="border-right: 1px solid rgba(0, 0, 0, 0.2)"
        >
          <v-list class="py-0">
            <v-list-item
              v-for="(experience, i) in experiences"
              :key="experience.name"
              @click="selected = i"
              :input-value="selected === i"
              color="primary"
            >
              <v-list-item-avatar>
                <v-img :src="experience.path" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ experience.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ experience.years }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col v-html="selectedExperience.description" />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { experiences } from '@/common/constants'

export default {
  computed: {
    selectedExperience() {
      return this.selected >= 0 ? experiences[this.selected] : {}
    },
  },

  data: () => ({
    selected: 0,
    experiences,
  }),
}
</script>
