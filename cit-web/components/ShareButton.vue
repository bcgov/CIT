<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false" top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Share
        </v-btn>
      </template>

      <v-card width="300">
        <v-list color="primary" class="pa-0 ma-0">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="white--text font-weight-bold d-flex justify-space-between align-center"
                >Share
                <v-btn x-small icon fab color="white" @click="menu = false">
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card-text ref="cardText">
          <client-only>
            <input v-show="false" v-model="url" type="text" />
            <code class="d-block">{{ url }}</code>
            <v-btn small color="primary" class="mt-3" @click="copy">
              Copy To Clipboard
            </v-btn>
          </client-only>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class ReportTraverse extends Vue {
  menu = false

  location = null

  get url() {
    return this.location?.href
  }

  copy() {
    console.log('Copy')
    this.$copyText(this.url, this.$refs.cardText).then(
      function (e) {},
      function (e) {
        console.error(e)
      }
    )
  }

  mounted() {
    this.location = window.location
  }
}
</script>
