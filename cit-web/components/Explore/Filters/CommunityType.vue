<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      title="Community Type"
      @save="handleSave"
      @clear="handleClear"
    >
      <v-radio-group v-model="radioGroup">
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
    this.$emit('filter')
  }

  handleClear() {
    this.radioGroup = null
  }

  getParams() {
    const index = this.radioGroup
    return index === null ? {} : this.queries[index]
  }
}
</script>
