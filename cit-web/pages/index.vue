<template>
  <div class="landing-page-container">
    <div class="d-flex justify-space-between">
      <div>
        <h1 class="text-h3 font-weight-bold index-title">
          Welcome to the Community Information Tool
        </h1>
        <h6 class="text-h6 font-weight-regular mt-10 mb-10 index-subtitle">
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
    <client-only>
      <div class="main-card-container">
        <v-card height="300" class="elevation-5 rounded-lg main-index-card">
          <v-card-title
            class="text-h6 mb-5 font-weight-bold main-index-card-title"
            >Go to a specific community</v-card-title
          >
          <v-card-subtitle class="text-body-1"
            >Interested in a specific community? Search for it below to get
            details</v-card-subtitle
          >
          <v-card-text>
            <CommSearch :outlined="true" label=""></CommSearch>
          </v-card-text>
        </v-card>

        <v-card height="300" class="elevation-5 rounded-lg main-index-card">
          <v-card-title
            class="text-h6 mb-5 font-weight-bold main-index-card-title"
            >Find communities by criteria</v-card-title
          >
          <v-card-subtitle class="text-body-1"
            >Find communities that meet a customized set of
            criteria</v-card-subtitle
          >
          <v-card-text>
            <v-btn
              height="44"
              to="/explore"
              color="yellow darken-3"
              class="elevation-5 text-capitalize font-weight-bold text-body-1"
              >Explore B.C. Communities</v-btn
            >
          </v-card-text>
        </v-card>
      </div>
    </client-only>

    <div class="mt-12">
      <v-container fluid>
        <IntroSectionHeader
          title="How does the CIT work?"
          subtitle="Option 1: View a specific community"
        ></IntroSectionHeader>
        <IntroSection :elements="optionOne" class="mt-10"></IntroSection>
        <IntroSectionHeader
          subtitle="Option 2: Find communities by criteria"
        ></IntroSectionHeader>
        <IntroSection :elements="optionTwo" class="mt-10"></IntroSection>
      </v-container>
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
  optionOne = [
    {
      title: 'Search for the community by name to navigate to its detail page.',
      image: '1-step1.svg',
    },
    {
      title:
        'Review some basic information, view a community map, and click on the reports to see more.',
      image: '1-step2.svg',
    },
    {
      title:
        'Within the reports, compare this community to other communities or regional districts.',
      image: '1-step3.svg',
    },
  ]

  optionTwo = [
    {
      title: 'Click the yellow button to navigate to the Explore B.C. page.',
      image: '2-step1.svg',
    },
    {
      title:
        'Select criteria to filter for a list of matching communities and regional districts, and review the selection results in the map.',
      image: '2-step2.svg',
    },
    {
      title: 'View reports and interact with the data charts.',
      image: '2-step3.svg',
    },
  ]

  get showImage() {
    return !(this.$vuetify.breakpoint.width < 760)
  }

  get imageWidth() {
    return this.$vuetify.breakpoint.width < 1050 ? '100%' : '400px'
  }

  get imageMaxWidth() {
    return this.$vuetify.breakpoint.width < 1050 ? '300px' : '400px'
  }

  async fetch() {
    try {
      const response = await getCommunityList()
      this.$store.commit('communities/setCommunities', response.data)
    } catch (e) {
      console.error(e)
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

.main-index-card {
  width: 500px;
  padding: 40px;
}
@media screen and (max-width: 1200px) {
  .main-index-card {
    width: 450px;
  }
}

@media screen and (max-width: 1100px) {
  .main-index-card {
    width: 400px;
  }
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

  .main-index-card {
    width: 450px;
  }
}

@media screen and (max-width: 1000px) {
  .main-card-container {
    flex-direction: column;
    align-items: center;
  }

  .main-index-card {
    width: 500px;
    margin: 2em 0;
  }
}

@media screen and (max-width: 600px) {
  .v-application .text-h3.index-title {
    font-size: 1rem !important;
    line-height: 1.5;
  }

  .v-application .index-subtitle {
    margin-top: 0 !important;
    font-size: 1rem !important;
    line-height: 1.5;
    margin-bottom: 20px !important;
  }

  .landing-page-container {
    padding: 1.5em 1em;
  }

  .main-index-card {
    width: 100%;
    max-width: 500px;
    padding: 10px;
    margin: 0 0;
    margin-bottom: 2em;
    height: 250px !important;
  }
}

@media screen and (max-width: 359px) {
  .main-index-card-title {
    font-size: 1rem !important;
    margin-bottom: 0 !important;
  }
}
</style>
