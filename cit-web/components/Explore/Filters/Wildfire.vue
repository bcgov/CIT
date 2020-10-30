<template>
  <div>
    <v-checkbox
      v-for="(wf, index) in wildfireZones"
      :key="index"
      v-model="wf.state"
      :label="wf.title"
      hide-details
      class="pa-0 ma-0 mt-3 mb-3"
    >
    </v-checkbox>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import MenuFilter from '~/components/Explore/Filters/MenuFilter'
@Component({
  MenuFilter,
})
export default class Wildfire extends Vue {
  @Prop({ default: false, type: Boolean }) disabled
  title = 'Wildfire Zone'
  active = false

  reset() {
    this.title = 'Wildfire Zone'
    this.active = false
    this.wildfireZones.map((wfz) => (wfz.state = null))
  }

  wildfireZones = [
    {
      value: 'null',
      title: 'N/A',
      state: null,
    },
    {
      value: 1,
      title: '1 (low)',
      state: null,
    },
    {
      value: 2,
      title: '2',
      state: null,
    },
    {
      value: 3,
      title: '3',
      state: null,
    },
    {
      value: 4,
      title: '4',
      state: null,
    },
    {
      value: 5,
      title: '5 (extreme)',
      state: null,
    },
  ]

  get numChecked() {
    const checked = this.wildfireZones.filter((wf) => wf.state === true)
    return checked.length
  }

  get checked() {
    return this.wildfireZones.filter((wf) => wf.state === true)
  }

  getParams() {
    if (this.numChecked === 0) {
      return []
    }

    const checked = this.checked
    const temp = []
    checked.map((c) => temp.push(c.value))
    const params = {
      wildfire_zone: temp.join(','),
    }
    return [params]
  }
}
</script>
