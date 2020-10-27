<template>
  <div class="container footnotes">
    <h2>Data Footnotes and Assumptions</h2>

    <ol>
      <li
        id="northern-rockies"
        :class="{ selected: anchor === 'northern-rockies' }"
      >
        <h4>Northern Rockies</h4>
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
        <a href="#northern-rockies"><v-icon>mdi-link</v-icon> Permalink</a>
      </li>

      <li
        id="location-points"
        :class="{ selected: anchor === 'location-points' }"
      >
        <h4>Latitude/Longitude of Location Assets</h4>
        <p>
          The latitudes and longitudes of location assets are set to the
          latitudes and longitudes provided in the source data whenever
          available. When there is no latitude/longitude in the source data but
          a municipality field is present, if there is a community in our
          communities list matching the municipality field we set the location
          asset's latitude/longitude to that of the community.
        </p>
        <a href="#location-points"><v-icon>mdi-link</v-icon> Permalink</a>
      </li>

      <li
        id="distances-50km"
        :class="{ selected: anchor === 'distances-50km' }"
      >
        <h4>Distance Calculations</h4>
        <p>
          We calculated driving distances and driving times using the
          <a href="https://catalogue.data.gov.bc.ca/dataset/bc-route-planner"
            >BC Route Planner API</a
          >. We only calculate driving distances where the birds' eye distance
          is within 50 km between location assets and communities, OR the
          distances between the nearest location asset of each type for a
          community if none are within 50 km.
        </p>
        <a href="#distances-50km"><v-icon>mdi-link</v-icon> Permalink</a>
      </li>
      <li
        id="search-filters-distance"
        :class="{ selected: anchor === 'search-filters-distance' }"
      >
        <h4>Search Filters Distances</h4>
        <p>
          The search filters for local assets on the Explore page use driving
          distance or driving time (based on road information) when available.
          This means that some local assets might be excluded from the search
          results when searching by driving time, even if they "should" be
          within the selected range. This could happen if a local asset and a
          community are separated by a body of water (i.e. there are no
          connecting roads between them). However, when filtering by driving
          distance, the search will fall back to birds' eye (straight line)
          distances whenever driving distances are unavailable.

          <a href="#distances-50km">Read more about driving distances.</a>
          <a href="#location-points"
            >Read more about how the latitude/longitude of location assets is
            determined.</a
          >
        </p>
        <a href="#search-filters-distance"
          ><v-icon>mdi-link</v-icon> Permalink</a
        >
      </li>

      <li
        id="census-subdivisions"
        :class="{ selected: anchor === 'census-subdivisions' }"
      >
        <h4>Census Subdivisions</h4>
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
      <li
        id="explore-domestic-report"
        :class="{ selected: anchor === 'explore-domestic-report' }"
      >
        <h4>Domestic Report (Explore page)</h4>
        <ol>
          <li
            id="avg-dwellings-needing-major-repairs"
            :class="{
              selected: anchor === 'avg-dwellings-needing-major-repairs',
            }"
          >
            <p>
              The percentage of average number of dwellings needing repairs is
              calculated using the "Total - Private households by household size
              - 100% data" (2.1.2) field as the total.
            </p>
            <a href="#avg-dwellings-needing-major-repairs"
              ><v-icon>mdi-link</v-icon> Permalink</a
            >
          </li>
        </ol>
      </li>
      <li
        id="community-detail-asset-driving-distance"
        :class="{
          selected: anchor === 'community-detail-asset-driving-distance',
        }"
      >
        <h4>Transport Status (High Capacity Transport Services)</h4>
        <p>
          The distance filter for facilities uses driving distance based on road
          information when available, and falls back to birds' eye (straight
          line) distance otherwise. (For example, if a facility and a community
          are separated by a body of water, driving distance will not be
          available.)
        </p>
        <a href="#community-detail-asset-driving-distance"
          ><v-icon>mdi-link</v-icon> Permalink</a
        >
      </li>
      <li
        id="incomplete-census-data"
        :class="{
          selected: anchor === 'incomplete-census-data',
        }"
      >
        <h4>Incomplete Census Data</h4>
        <p>
          We import census data from the
          <a
            href="https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/index.cfm?Lang=E"
            >Statistics Canada 2016 Census Profile</a
          >. Census data is captured every 5 years and may be outdated, and may
          not be able to capture recent trends or seasonal variations.
        </p>
        <p>
          Communities whose corresponding Census Subdivisions that are missing
          more than 25% of the census fields that we use are flagged as having
          incomplete census data. The charts in the reports are calculated based
          on available data and some charts may be blank or may not represent
          all communities (if viewing aggregate reports in the Explore page). If
          all communities in the selection are missing over 25% of their census
          fields (or on the community detail page), some reports are hidden due
          to insufficient data.
        </p>
        <a href="#incomplete-census-data"
          ><v-icon>mdi-link</v-icon> Permalink</a
        >
      </li>
      <li
        id="connectivity-percentages"
        :class="{
          selected: anchor === 'connectivity-percentages',
        }"
      >
        <p>
          Connectivity estimates for regions are based on the percentage of
          roads with each bandwidth level, from
          <a
            href="https://open.canada.ca/data/en/dataset/00a331db-121b-445d-b119-35dbbe3eedd9"
            >National Broadband Data</a
          >. For communities that have no defined municipal boundary, a 25km
          circle is assumed as the area to consider served.
        </p>
        <a href="#connectivity-percentages"
          ><v-icon>mdi-link</v-icon> Permalink</a
        >
      </li>
      <li
        id="median-income"
        :class="{
          selected: anchor === 'median-income',
        }"
      >
        <p>
          Median income data from the Stats Canada web service are used to
          represent the income in communities enclosed in each census
          subdivision. When taken in aggregate on various reports, this means
          the average income shown is not the population-weighted average for
          all people included in the community (although that would be
          preferable). It is the average of median community incomes, loaded
          from
          <a
            href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110001201"
            >this field</a
          >.
        </p>
        <a href="#connectivity-percentages"
          ><v-icon>mdi-link</v-icon> Permalink</a
        >
      </li>

      <li id="project-dates" :class="{ selected: anchor === 'project-dates' }">
        <h4>Date fields in Projects Reports</h4>
        <p>
          The date fields (Start Date, Completion Date, and Last Updated Date)
          in the Projects reports are specified as quarterly dates in the source
          dataset (e.g. 2020-Q2). We have converted these quarterly dates to be
          the first day of the specified quarter (e.g. 2020-Q2 is 2020-04-01).
        </p>
        <a href="#project-dates">
          <v-icon>mdi-link</v-icon>
          Permalink</a
        >
      </li>
    </ol>
    <FeedbackButton></FeedbackButton>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import MainHeader from '~/components/MainHeader.vue'

@Component({
  MainHeader,
})
export default class DataFootnotes extends Vue {
  anchor = null

  @Watch('$route.hash', { immediate: true, deep: true })
  onUrlChange(newVal) {
    this.$nextTick(() => (this.anchor = newVal.replace('#', '')))
  }
}
</script>
<style lang="scss" scoped>
.container.footnotes {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5em;
}
.bright {
  background: yellow;
}
.footnotes li {
  padding-top: 25px;
}
.selected {
  background-color: #e5e8ec;
  padding: 0.5em;
}
.container > ol > li {
  margin-bottom: 20px;
}
</style>
