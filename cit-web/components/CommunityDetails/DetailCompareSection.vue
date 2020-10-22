<template>
  <div>
    <v-card>
      <v-container fluid>
        <v-row class="mb-5">
          <v-col col="12">
            <h4 class="text-center text-h4 font-weight-bold primary--text">
              Comparing Education Data:
            </h4>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col md="6" sm="12" cols="12">
            <v-sheet
              height="180"
              color="primary"
              class="d-flex justify-center align-center px-10"
            >
              <CompareInfo type="large"></CompareInfo>
            </v-sheet>
            <v-container fluid>
              <v-row no-gutters>
                <v-col cols="12">
                  <Report
                    :page-name="report.cpid"
                    :cids="[cid.toString()]"
                    height="1000"
                    width="400"
                  ></Report>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <Compare
              :loader="false"
              :pid="report.cpid"
              :rid="rid"
              height="1000"
              width="400"
            ></Compare>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component()
export default class DetailCompareSetion extends Vue {
  @Prop({ default: null, type: Object }) report
  @Prop({ default: null, type: Number }) rid
  @Prop({ default: null, type: Number }) cid
  @Prop({ default: null, type: String }) regionName
}
</script>
