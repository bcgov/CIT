<template>
  <div class="landing-page-container">
    <h1>Welcome to the Community Information Tool</h1>
    <div class="landing-page-content">
      <div class="landing-page-info">
        <p>Explore BC communities and analyze data from a community lens.</p>

        <ul>
          <li>Search BC communities</li>
          <li>View Reports</li>
          <li>Drill down to specific communities</li>
        </ul>

        <div class="buttons">
          <nuxt-link to="/community" class="btn" target="_blank"
            >Choose a specific community</nuxt-link
          >
          <p class="btn-spacer">or</p>
          <nuxt-link to="/explore" class="btn" target="_blank"
            >Explore BC Communities by attributes</nuxt-link
          >
        </div>
      </div>

      <div class="landing-page-illustration">
        <img src="~/static/landing_page_illustration.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { Vue } from 'nuxt-property-decorator'
export default class Index extends Vue {
  layout(context) {
    return 'default'
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
  font-size: 3rem;
  margin: 2rem 0;
}

.landing-page-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  padding: 0.5rem 1rem;
  background-color: #073366;
  color: white !important;
  text-decoration: none !important;
  border-radius: 5px;
  margin: 0.5rem 0;
}

p.btn-spacer {
  margin-bottom: 0;
}
</style>
