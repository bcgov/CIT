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
      <v-checkbox
        v-model="urban"
        hide-details
        value="Urban"
        label="Urban"
        class="ma-0 pa-0"
      ></v-checkbox>
      <v-checkbox
        v-model="indigenous"
        hide-details
        value="Indigenous"
        label="Indigenous"
        class="pa-0 mb-3 mt-3"
      ></v-checkbox>
      <v-checkbox
        v-model="rural"
        hide-details
        value="Rural"
        label="Rural"
        class="ma-0 pa-0"
      ></v-checkbox>
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

  urban = null
  rural = null
  indigenous = null

  handleSave() {
    this.$refs.menuFilter.hide()
    if (!this.isValid) {
      this.title = 'Community Type'
      this.active = false
    } else if (this.numValid > 1) {
      this.title = `${this.numValid} Community Types`
      this.active = true
    } else {
      let title = ''
      if (this.urban) {
        title = 'Urban'
      } else if (this.rural) {
        title = 'Rural'
      } else if (this.indigenous) {
        title = 'Indigenous'
      }
      this.title = `${title}`
      this.active = true
    }
    this.$emit('filter')
  }

  handleClear() {
    this.urban = null
    this.indigenous = null
    this.rural = null
  }

  get isValid() {
    return this.urban || this.indigenous || this.rural
  }

  get numValid() {
    let counter = 0
    if (this.urban) {
      counter++
    }
    if (this.indigenous) {
      counter++
    }
    if (this.rural) {
      counter++
    }
    return counter
  }

  getParams() {
    const temp = []
    if (!this.isValid) {
      return temp
    }

    if (this.urban) {
      temp.push('Urban')
    }

    if (this.indigenous) {
      temp.push('Indigenous')
    }

    if (this.rural) {
      temp.push('Rural')
    }

    const to = {
      community_type: temp.join(','),
    }
    console.log('TO', to)

    return [to]
  }
}
</script>
