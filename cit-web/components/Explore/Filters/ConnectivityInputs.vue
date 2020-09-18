<template>
  <div>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col sm="6">
          <div>
            <v-select
              v-model="speed"
              dense
              hide-details
              :items="speedTypes"
              item-text="title"
              item-value="title"
              label="Internet Speed"
              placeholder="50/10 mbps"
              return-object
            ></v-select>
          </div>
        </v-col>
        <v-col sm="3">
          <div>
            <v-select
              v-model="operator"
              class="ml-2 mr-2"
              dense
              hide-details
              :items="operatorTypes"
              item-text="title"
              item-value="value"
              label="Constraint"
              placeholder="eg. (>)"
              return-object
            ></v-select>
          </div>
        </v-col>
        <v-col sm="3">
          <div>
            <v-combobox
              v-model="percentage"
              dense
              hide-details
              :items="suggestedPercentage"
              item-text="title"
              item-value="title"
              label="Percentange (%)"
              placeholder="eg. 75%"
              :rules="rules"
            ></v-combobox>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class ConnectivityInputs extends Vue {
  speed = null
  speedTypes = [
    {
      value: 'percent_50_10',
      title: '50/10 mbps',
    },
    {
      value: 'percent_25_5',
      title: '25/5 mbps',
    },
    {
      value: 'percent_10_2',
      title: '10/2 mbps',
    },
    {
      value: 'percent_5_1',
      title: '5/1 mbps',
    },
  ]

  operator = { value: '__lte', title: 'within' }
  operatorTypes = [
    {
      value: '__gt',
      title: 'not within',
    },
    {
      value: '__lte',
      title: 'within',
    },
  ]

  percentage = null
  suggestedPercentage = [10, 20, 25, 50, 75]

  rules = [(input) => Number.isInteger(Number(input))]

  isValid() {
    return this.speed && this.operator && this.percentage
  }

  getParams() {
    if (!this.isValid()) {
      return []
    }
    const prop = `${this.speed.value}${this.operator.value}`
    const percentage = this.percentage / 100
    const temp = {}
    temp[prop] = percentage
    return [temp]
  }

  get text() {
    const speed = this.speed?.title
    const operator = this.operator.value === '__gt' ? '>' : '≤'
    const percentage = `${this.percentage}%`
    return `${speed} ${operator} ${percentage}`
  }

  getText() {
    return this.text
  }

  handleClear() {
    this.speed = null
    this.operator = { value: '__lte', title: 'within' }
    this.percentage = null
  }
}
</script>
