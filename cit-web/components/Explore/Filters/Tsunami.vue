<template>
  <div>
    <v-checkbox
      v-for="(tz, index) in tsunamiZones"
      :key="index"
      v-model="tz.state"
      :label="tz.title"
      hide-details
      class="pa-0 ma-0 mt-3 mb-3"
    >
    </v-checkbox>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class Tsunami extends Vue {
  @Prop({ default: false, type: Boolean }) disabled

  title = 'Tsunami Zone'
  active = false

  reset() {
    this.title = 'Tsunami Zone'
    this.active = false
    this.tsunamiZones.map((tsz) => (tsz.state = null))
  }

  tsunamiZones = [
    {
      value: 'null',
      title: 'N/A',
      state: null,
    },
    {
      value: 'A',
      title: 'A (moderate)',
      state: null,
    },
    {
      value: 'B',
      title: 'B (moderate)',
      state: null,
    },
    {
      value: 'C',
      title: 'C (moderate)',
      state: null,
    },
    {
      value: 'D',
      title: 'D (low)',
      state: null,
    },
    {
      value: 'E',
      title: 'E (low)',
      state: null,
    },
  ]

  get numChecked() {
    const checked = this.tsunamiZones.filter((tz) => tz.state === true)
    return checked.length
  }

  get checked() {
    return this.tsunamiZones.filter((tz) => tz.state === true)
  }

  handleClear() {
    this.tsunamiZones.map((tz) => (tz.state = null))
  }

  handleSave() {
    this.$refs.menuFilter.hide()
    if (this.numChecked === 0) {
      this.title = 'Tsunami Zone'
      this.active = false
    } else if (this.numChecked === 1) {
      this.title = `Tsunami Zone: ${this.checked[0].title}`
      this.active = true
    } else {
      this.title = `${this.numChecked} Tsunami Zone`
      this.active = true
    }
    this.$emit('filter')
  }

  getParams() {
    if (this.numChecked === 0) {
      return []
    }

    const checked = this.checked
    const temp = []
    checked.map((c) => temp.push(c.value))
    const params = {
      tsunami_zone: temp.join(','),
    }
    return [params]
  }
}
</script>
