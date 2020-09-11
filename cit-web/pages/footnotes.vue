<template>
  <div class="container">
    <h2>Data Footnotes and Assumptions</h2>

    <ol>
      <li id="northern-rockies">
        <p>
          The Northern Rockies Regional Municipality is included in our data as
          a "Regional District," even though it is technically a regional
          municipality, and not a regional district. The shape of this "regional
          district" was imported from the
          <a
            href="https://catalogue.data.gov.bc.ca/dataset/current-census-division-boundaries"
            >Census Divisions</a
          >
          dataset from the BC Data Catalogue.
        </p>
        <a href="#northern-rockies">Permalink</a>
      </li>
      <li id="distances-50km">
        <p>
          We calculated driving distances and driving times using the
          <a href="https://catalogue.data.gov.bc.ca/dataset/bc-route-planner"
            >BC Route Planner API</a
          >. We only calculate driving distances where the birds' eye distance
          is within 50 km between location assets and communities, OR the
          distances between the nearest location asset of each type for a
          community if none are within 50 km.
        </p>
        <a href="#distances-50km">Permalink</a>
      </li>
      <li id="search-filters-distance">
        <p>
          The search filters on the Explore page use driving distance or driving
          time, not birds' eye distance. Thus, location assets will be excluded
          from the search results if they do not have driving distances (e.g. if
          they are not on a public road) even if they "should" be within the
          specified distance.
          <a href="#distances-50km">Read more about driving distances.</a>
        </p>
        <a href="#search-filters-distance">Permalink</a>
      </li>
      <li id="census-subdivisions">
        <p>
          Demographic data is sourced from Stats Canada at the subdivision
          level. This means that data from unincorporated communities may
          actually apply to surrounding area containing several other small
          communities.
        </p>
        <a href="#census-subdivisions">
          <v-icon>mdi-link</v-icon>
          Permalink</a
        >
      </li>
    </ol>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import MainHeader from '~/components/MainHeader.vue'

@Component({
  MainHeader,
})
export default class DataFootnotes extends Vue {}
</script>
<style lang="scss" scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 5em;
}
</style>
