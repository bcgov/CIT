<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Community Type'"
      :active="active"
      :card-width="200"
      @save="handleSave"
      @clear="handleClear"
    >
      <v-radio-group v-model="radioGroup" class="ma-0 pa-0" hide-details>
        <v-radio
          v-for="(type, index) in communityTypes"
          :key="index"
          :label="type.title"
        ></v-radio>
      </v-radio-group>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import MenuFilter from '~/components/Explore/Filters/MenuFilter'
@Component({
  MenuFilter,
})
export default class CommunityType extends Vue {
  radioGroup = null
  title = 'Community Type'
  active = false

  communityTypes = [
    {
      title: 'Indigenous',
    },
    {
      title: 'Rural',
    },
    {
      title: 'Urban',
    },
  ]

  queries = [
    {
      community_type: 'Indigenous',
    },
    {
      community_type: 'Rural',
    },
    {
      community_type: 'Urban',
    },
  ]

  handleSave() {
    this.$refs.menuFilter.hide()
    const index = this.radioGroup
    if (index === null) {
      this.title = 'Community Type'
      this.active = false
    } else {
      this.title = this.communityTypes[index].title
      this.active = true
    }
    this.$emit('filter')
  }

  handleClear() {
    this.radioGroup = null
  }

  getParams() {
    const index = this.radioGroup
    return index === null ? [] : [this.queries[index]]
  }
}
</script>
