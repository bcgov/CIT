<template>
  <div>
    <v-card>
      <Compare
        :loader="false"
        :pid="report.cpid"
        :rid="rid"
        init-mode="Regional Districts"
        height="1000"
        width="400"
      ></Compare>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Compare from '~/components/Compare'
@Component({ Compare })
export default class DetailCompareSetion extends Vue {
  @Prop({ default: null, type: Object }) report
  @Prop({ default: null, type: Number }) rid
}
</script>
