<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
        <v-col md="6" sm="12" cols="12">
          <Report
            :page-name="pid"
            :cids="[cid.toString()]"
            height="1000"
            width="400"
          ></Report>
        </v-col>
        <v-col md="6" sm="12" cols="12" class="border-column">
          <Report
            :page-name="cpid"
            :cids="[cid.toString()]"
            height="1000"
            width="400"
          ></Report>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component()
export default class DetailedReports extends Vue {
  @Prop({ default: null, type: String }) pid
  @Prop({ default: null, type: String }) cpid
  @Prop({ default: null, type: Number }) cid
}
</script>
<style lang="scss" scoped>
.border-column {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
