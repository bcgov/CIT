<template>
  <div class="landing-page-container">
    <h1>Welcome to the Community Information Tool</h1>
    <p>Explore BC communities and analyze data from a community lens.</p>
    <div class="landing-page-content">
      <div class="landing-page-info">
        <p>
          Interested in a specific community?<br />
          Search for it below to view details.
        </p>

        <CommunityList></CommunityList>

        <p class="explore-communities">
          Interested in looking at multiple communities which share specific
          attributes?
        </p>
        <nuxt-link to="/explore" class="btn" target="_blank"
          >Explore BC Communities</nuxt-link
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
import CommunityList from '~/components/CommunityList.vue'
@Component({ CommunityList })
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
.landing-page-container {
  max-width: 1280px;
  margin: 1rem auto 0;
  padding: 0;
}

h1 {
  font-size: 2.5rem;
  margin-top: 2rem;
}

.landing-page-content {
  display: grid;
  grid-template-columns: 3fr 2fr;
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

.buttons {
  margin-top: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 2rem;
  background-color: #073366;
  color: white !important;
  text-decoration: none !important;
  margin: 0.5rem 0;
  border-radius: 5px;
}

.explore-communities {
  margin-top: 4rem;
}
</style>
