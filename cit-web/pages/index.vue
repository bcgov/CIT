<template>
  <div class="landing-page-container">
    <h1>Welcome to the Community Information Tool</h1>
    <p>Explore B.C. communities and analyze data from a community lens.</p>
    <div class="landing-page-content">
      <div class="landing-page-info">
        <p>
          Interested in a specific community?<br />
          Search for it below to view details.
        </p>

        <CommunitySearch class="community-search"></CommunitySearch>

        <p class="explore-communities">
          Interested in looking at multiple communities which share specific
          attributes?
        </p>
        <nuxt-link to="/explore" class="btn" target="_blank"
          >Explore B.C. Communities</nuxt-link
        >
      </div>

      <div class="landing-page-illustration">
        <img src="~/static/landing_page_illustration.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import CommunitySearch from '~/components/CommunitySearch.vue'
@Component({
  CommunitySearch,
})
export default class Index extends Vue {
  layout(context) {
    return 'landing'
  }

  mounted() {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (const registration of registrations) {
        registration.unregister()
      }
    })
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 2.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #073366;
  color: white !important;
  text-decoration: none !important;
  margin: 0.5rem 0;
  border-radius: 5px;
}

.landing-page-container {
  max-width: 960px;
  margin: 1rem auto 0;
  padding: 0;
}

.landing-page-content {
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-gap: 1rem;
  margin-top: 3rem;
}

.landing-page-info {
  margin-top: 2rem;
}

.landing-page-illustration {
  img {
    width: 100%;
  }
}

.explore-communities {
  margin-top: 5rem;
  margin-bottom: 1.5rem;
}

.community-search {
  margin-top: 0.5rem;
}
</style>
