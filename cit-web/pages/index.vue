<template>
  <div class="landing-page-container">
    <div class="d-flex justify-space-between">
      <div>
        <h1 class="text-h3 font-weight-bold index-title">
          Welcome to the Community Information Tool
        </h1>
        <h6 class="text-h6 font-weight-regular mt-10 mb-10">
          Explore B.C. communities and analyze data from a community lens.
        </h6>
      </div>
      <div>
        <client-only>
          <div v-if="showImage" class="landing-page-illustration text-right">
            <v-img
              :src="require(`~/assets/images/logo.svg`)"
              aspect-ratio="1"
              :width="imageWidth"
              :max-width="imageMaxWidth"
              class="d-inline-block"
              contain
            />
          </div>
        </client-only>
      </div>
    </div>

    <div class="main-card-container">
      <v-card width="500" height="300" class="elevation-5 pa-10 rounded-lg">
        <v-card-title>Go to a specific community</v-card-title>
        <v-card-subtitle
          >Interested in a specific community? Search for it below to get
          details</v-card-subtitle
        >
        <v-card-text>
          <CommSearch :outlined="true" label=""></CommSearch>
        </v-card-text>
      </v-card>

      <v-card width="500" height="300" class="elevation-5 pa-10 rounded-lg">
        <v-card-title>Find communities by criteria</v-card-title>
        <v-card-subtitle
          >Find communities that meet a customized set of
          criteria</v-card-subtitle
        >
        <v-card-text>
          <v-btn
            to="/explore?tab=Map"
            target="_blank"
            color="yellow darken-3"
            class="elevation-5 text-capitalize"
            >Explore B.C. Communities</v-btn
          >
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import CommSearch from '~/components/CommSearch.vue'
import { getCommunityList } from '~/api/cit-api'
@Component({
  CommSearch,
})
export default class Index extends Vue {
  get showImage() {
    return !(this.$vuetify.breakpoint.width < 760)
  }

  get imageWidth() {
    return this.$vuetify.breakpoint.width < 1050 ? '100%' : '400px'
  }

  get imageMaxWidth() {
    return this.$vuetify.breakpoint.width < 1050 ? '300px' : '400px'
  }

  async fetch({ store }) {
    try {
      const response = await getCommunityList()
      const { status } = response
      if (status === 200) {
        const communities = response.data
        if (communities) {
          store.commit('communities/setCommunities', communities)
        }
      }
    } catch (e) {
      store.commit('communities/setCommunities', [])
    }
  }
}
</script>
<style lang="scss" scoped>
.landing-page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5em;
}

.landing-page-content > div {
  flex: 1 1 0;
}

.landing-page-info {
  margin-bottom: 3em;
}

.explore-communities {
  margin-top: 5em;
}

.landing-page-illustration {
  margin-top: -75px;
}

.explore-button {
  letter-spacing: 0;
  font-size: 16px;
}

.main-card-container {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 1050px) {
  .landing-page-container {
    padding: 3em 2em;
  }

  .v-application .text-h3.index-title {
    font-size: 2.5rem !important;
  }

  .landing-page-illustration {
    margin-top: -25px;
    text-align: center !important;
  }
}

@media screen and (max-width: 600px) {
  .v-application .text-h3.index-title {
    font-size: 1.5rem !important;
  }

  .landing-page-container {
    padding: 1.5em 1em;
  }
}
</style>
