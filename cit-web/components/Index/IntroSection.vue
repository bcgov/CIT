<template>
  <v-row>
    <v-col v-for="(el, index) in elements" :key="index" cols="12" sm="6" md="4">
      <v-img
        :src="require(`~/assets/images/index/${el.image}`)"
        contain
        max-width="245"
        max-height="175"
        aspect-ratio="1"
        class="mx-auto"
      ></v-img>
      <v-sheet max-width="225" class="mx-auto mt-5">
        <p class="text-center">
          {{ el.title }}
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {
  @Prop({ default: null, type: Array }) elements
}
</script>
