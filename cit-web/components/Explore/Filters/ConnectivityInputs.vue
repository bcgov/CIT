<template>
  <div>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col sm="4">
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
        <v-col :sm="yesnoCols">
          <div>
            <v-select
              v-model="yesno"
              class="ml-2 mr-2"
              dense
              hide-details
              :items="chooseTypes"
              item-text="title"
              item-value="value"
              label="Type"
              placeholder="Yes"
              return-object
            ></v-select>
          </div>
        </v-col>
        <v-col v-if="isAdvanced" sm="3">
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
              @update:search-input="handleComboBox"
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
  yesno = null
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

  chooseTypes = [
    {
      value: 'no',
      title: 'No',
    },
    {
      value: 'yes',
      title: 'Yes',
    },
    {
      value: 'noadvanced',
      title: 'Less Than % (Advanced)',
    },
    {
      value: 'yesadvanced',
      title: 'More Than % (Advanced)',
    },
  ]

  operator = {
    no: '__lt',
    yes: '__gte',
    noadvanced: '__lt',
    yesadvanced: '__gte',
  }

  percentage = null
  suggestedPercentage = [10, 20, 25, 50, 75]

  rules = [(input) => Number.isInteger(Number(input))]

  reset() {
    this.speed = null
    this.yesno = null
    this.percentage = null
  }

  handleComboBox(data) {
    if (!data) {
      this.percentage = null
    } else {
      this.percentage = data
    }
  }

  get isValid() {
    if (this.isBasic) {
      return this.speed && this.yesno
    }

    if (this.isAdvanced) {
      return this.speed && this.yesno && this.percentage
    }
  }

  get yesnoCols() {
    return this.isAdvanced === true ? 5 : 8
  }

  get isAdvanced() {
    if (!this.yesno) {
      return false
    }
    return (
      this.yesno.value === 'noadvanced' || this.yesno.value === 'yesadvanced'
    )
  }

  get isBasic() {
    if (!this.yesno) {
      return true
    }
    return this.yesno.value === 'yes' || this.yesno.value === 'no'
  }

  getParams() {
    if (!this.isValid) {
      return []
    }

    if (this.isBasic) {
      const prop = `${this.speed.value}${this.operator[this.yesno.value]}`
      const percentage = (this.yesno.value === 'yes' ? 75 : 10) / 100
      const temp = {}
      temp[prop] = percentage
      return [temp]
    }

    if (this.isAdvanced) {
      const prop = `${this.speed.value}${this.operator[this.yesno.value]}`
      const percentage = this.percentage / 100
      const temp = {}
      temp[prop] = percentage
      return [temp]
    }
  }

  get text() {
    // e.g. 50mbps < 10%
    if (this.isBasic) {
      return `${this.speed.title} ${this.yesno.value === 'yes' ? '>' : '<'} ${
        this.yesno.value === 'yes' ? '75%' : '10%'
      }`
    }

    if (this.isAdvanced) {
      return `${this.speed.title} ${
        this.yesno.value === 'yesadvanced' ? '>' : '<'
      } ${this.percentage}%`
    }
  }

  getText() {
    return this.text
  }

  handleClear() {
    this.speed = null
    this.percentage = null
    this.yesno = null
  }
}
</script>
