<template>
  <div>
    <div class="d-flex align-center pl-10 pt-5">
      <div>
        <h3 class="text-h4 font-weight-bold">{{ placeName }} {{ name }}</h3>
        <p style="max-width: 400px;" class="mt-5">{{ description }}</p>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-img
          :src="require(`~/assets/images/reports/headers/${image}`)"
          contain
          width="376"
          max-height="190"
          aspect-ratio="1"
        ></v-img>
      </div>
    </div>
    <v-divider class="pa-0 ma-0"></v-divider>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ReportHeader extends Vue {
  @Prop({ default: null, type: String }) name
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: String }) description
  @Prop({ default: null, type: String }) image
}
</script>
