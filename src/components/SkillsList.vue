<template>
  <v-row>
    <v-dialog v-model="showDialog" width="unset">
      <SkillDialog :skill="skill" />
    </v-dialog>
    <v-col>
      <h3>ops</h3>
      <v-list rounded>
        <v-list-item
          v-for="skill in groups.ops.sort((s1, s2) => s2.r - s1.r)"
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
      <h3>databases</h3>
      <v-list rounded>
        <v-list-item
          v-for="skill in groups.database.sort((s1, s2) => s2.r - s1.r)"
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
      <template v-if="$vuetify.breakpoint.xsOnly">
        <h3>web</h3>
        <v-list rounded>
          <v-list-item
            v-for="skill in groups.web.sort((s1, s2) => s2.r - s1.r)"
            :key="`${skill.title}-list-item`"
            @click="openDialog(skill)"
          >
            <v-list-item-avatar size="50" style="border: 1px solid grey">
              <v-img alt="" :src="skill.path" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ skill.display }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ skill.proficiency }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-col>
    <v-col>
      <h3>tools</h3>
      <v-list rounded>
        <v-list-item
          v-for="skill in groups.env.sort((s1, s2) => s2.r - s1.r)"
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
      <h3>languages</h3>
      <v-list rounded>
        <v-list-item
          v-for="skill in groups.language.sort((s1, s2) => s2.r - s1.r)"
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
      <h3>user interface</h3>
      <v-list rounded>
        <v-list-item
          v-for="skill in groups.ui.sort((s1, s2) => s2.r - s1.r)"
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
      <template v-if="$vuetify.breakpoint.xsOnly">
        <h3>agile</h3>
        <v-list rounded>
          <v-list-item
            v-for="skill in groups.agile.sort((s1, s2) => s2.r - s1.r)"
            :key="`${skill.title}-list-item`"
            @click="openDialog(skill)"
          >
            <v-list-item-avatar size="50" style="border: 1px solid grey">
              <v-img alt="" :src="skill.path" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ skill.display }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ skill.proficiency }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-col>
    <v-col v-if="$vuetify.breakpoint.smAndUp">
      <h3>web</h3>
      <v-list rounded>
        <v-list-item
          v-for="skill in groups.web.sort((s1, s2) => s2.r - s1.r)"
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
      <h3>agile</h3>
      <v-list rounded>
        <v-list-item
          v-for="skill in groups.agile.sort((s1, s2) => s2.r - s1.r)"
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

export default {
  components: {
    SkillDialog,
  },

  data: () => ({
    groups: {},
    skill: {},
    showDialog: false,
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
</style>
