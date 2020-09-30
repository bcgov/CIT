<template>
  <div>
    <v-card max-width="190" style="border: 0;" class="elevation-0 pa-0 ma-0">
      <v-list class="ma-0 pa-0">
        <v-list-item two-line class="ma-0 pa-0">
          <v-list-item-content>
            <v-list-item-title>Internet Speeds</v-list-item-title>
            <v-list-item-subtitle
              >50/10
              <div class="legend-icon" style="background-color: #8572d3;"></div
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              >25/5
              <div class="legend-icon" style="background-color: #ec67ad;"></div
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              >10/2
              <div class="legend-icon" style="background-color: #ff826f;"></div
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              >5/1
              <div class="legend-icon" style="background-color: #f7ba44;"></div
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'InternetSpeed',
})
export default class w extends Vue {}
</script>
<style lang="scss" scoped>
.legend-icon {
  height: 2px;
  float: right;
  width: 35px;
  margin-right: 50%;
  margin-top: 10px;
}
</style>
