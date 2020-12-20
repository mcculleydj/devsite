<template>
  <v-row class="list-container">
    <v-dialog v-model="showDialog" width="unset">
      <SkillDialog :skill="skill" />
    </v-dialog>
    <v-col v-for="list in lists" :key="list.name" cols="auto">
      <span class="ml-6 header">{{ list.name }}</span>
      <v-list rounded width="250">
        <v-list-item
          v-for="skill in groups[list.group].sort((s1, s2) => s2.r - s1.r)"
          :key="`${skill.title}-list-item`"
          @click="openDialog(skill)"
        >
          <v-list-item-avatar size="50" style="border: 1px solid grey">
            <v-img alt="" :src="skill.path" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ skill.display }}</v-list-item-title>
            <v-list-item-subtitle>{{ skill.proficiency }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import SkillDialog from '@/components/SkillDialog'
import { skills } from '@/common/constants'

// TODO: replace bubble view button with a message when contraction occurs in list view
//       below min width for visualization

export default {
  components: {
    SkillDialog,
  },

  data: () => ({
    groups: {},
    skill: {},
    showDialog: false,
    lists: [
      { name: 'web', group: 'web' },
      { name: 'ops', group: 'ops' },
      { name: 'databases', group: 'database' },
      { name: 'tools', group: 'env' },
      { name: 'languages', group: 'language' },
      { name: 'user interface', group: 'ui' },
      { name: 'agile', group: 'agile' },
    ],
  }),

  created() {
    // transform skills into separate lists based on group
    skills.forEach(s => {
      const extended = {
        ...s,
        proficiency:
          s.r === 45 ? 'Proficient' : s.r === 35 ? 'Comfortable' : 'Familiar',
      }
      if (this.groups[s.group]) {
        this.groups[s.group].push(extended)
      } else {
        this.groups[s.group] = [extended]
      }
    })
  },

  methods: {
    openDialog(skill) {
      this.skill = skill
      this.showDialog = true
    },
  },
}
</script>

<style scoped>
h3 {
  color: gray;
  text-decoration: underline;
  margin-top: 12px;
  margin-left: 12px;
}

.header {
  color: gray;
  font-size: 18px;
}

.list-container {
  overflow-y: auto;
  height: calc(100vh - 140px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
