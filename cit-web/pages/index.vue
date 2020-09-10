<template>
  <div class="landing-page-container">
    <h1 class="text-h3 font-weight-bold">
      Welcome to the Community Information Tool
    </h1>
    <h6 class="text-h6 font-weight-regular mt-10 mb-10">
      Explore B.C. communities and analyze data from a community lens.
    </h6>
    <div class="landing-page-content d-flex align-top">
      <div class="landing-page-info">
        <p>
          Interested in a specific community?<br />
          Search for it below to get details.
        </p>

        <CommSearch :outlined="true" label=""></CommSearch>

        <p class="explore-communities">
          Interested in building a community profile to generate a list of
          matching B.C. communities?
        </p>

        <v-btn
          color="primary"
          to="/explore"
          class="btn text-capitalize explore-button"
          target="_blank"
          depressed
          width="225"
          height="40"
          >Explore B.C. Communities</v-btn
        >
      </div>

      <div class="landing-page-illustration text-right">
        <v-img
          :src="require(`~/assets/images/logo.svg`)"
          aspect-ratio="1"
          width="400"
          class="d-inline-block"
          contain
        />
      </div>
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
</style>
