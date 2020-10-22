<template>
  <v-row no-gutters>
    <v-col v-if="title" cols="12">
      <h4 class="text-h4 font-weight-bold">{{ title }}</h4>
    </v-col>
    <v-col cols="12" class="mt-10">
      <h6 class="text-h5 font-weight-bold">
        {{ subtitle }}
      </h6>
    </v-col>
  </v-row>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: String }) subtitle
}
</script>
