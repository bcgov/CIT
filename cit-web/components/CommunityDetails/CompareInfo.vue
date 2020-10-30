<template>
  <div
    class="white--text"
    :class="{ 'text-h6': type === 'large', 'text-body-1': type !== 'large' }"
  >
    <p v-if="compareMode === 'Average Of B.C.'" class="pa-0 ma-0 ml-2">
      <span>Comparing</span>
      <span class="font-weight-bold">{{ compareMode }}</span>
    </p>
    <p v-else class="pa-0 ma-0 ml-2 compare-paragraph">
      <span>Comparing</span>
      <span>{{ compareMode }}:</span>
      <span v-if="compare.length < 3" class="font-weight-bold">{{
        compare.join(', ')
      }}</span>
      <span v-else class="font-weight-bold">
        <span v-if="compareMode === 'Average Of Regional Districts'">
          {{ compare.length }} Selected Regional Districts
        </span>
        <span v-else-if="compareMode === 'Average Of Communities'">
          {{ compare.length }} Selected Communities
        </span>
      </span>
    </p>
  </div>
</template>

<script>
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
const compareStore = namespace('compare')
@Component
export default class CompareInfo extends Vue {
  @compareStore.Getter('getCompare') compare
  @compareStore.Getter('getCompareMode') compareMode
  @Prop({ default: null, type: String }) type
}
</script>
<style scoped>
@media screen and (max-width: 700px) {
  .compare-paragraph {
    font-size: 12px !important;
  }
}
</style>
