<template>
  <div class="community-new-container">
    <div
      v-if="$fetchState.pending"
      class="d-flex align-center flex-column mt-10"
    >
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <h6 class="mt-10 text-body-1 font-weight-bold">Loading Community</h6>
    </div>
    <div v-else>
      <CommunityDetailReportModal
        :show="!!report"
        :place-name="placeName"
        :community-details="communityDetails"
        :region-name="regionalDistrictName"
        :report="report"
        @traverse="reportOpen"
        @close="reportClose"
      >
      </CommunityDetailReportModal>

      <CommunityDetailsRawData
        :grouped-census="groupedCensus"
        :place-name="placeName"
        :show="showRawData"
        @close="showRawData = false"
      ></CommunityDetailsRawData>

      <div v-if="error" class="pt-10">
        <v-alert type="info" class="primary--text elevation-5">
          Oops, something went wrong! {{ error.message }}
        </v-alert>
      </div>

      <div v-else>
        <div v-if="!isMobile">
          <div v-if="isCommunityEmpty" class="d-flex pt-10 justify-center">
            <v-alert type="info" class="primary--text elevation-5">
              Sorry, we could not find a community with that ID.
            </v-alert>
          </div>
          <div v-else>
            <v-container fluid>
              <CommunityDetailsHeader
                :rid="communityDetails.regional_district"
                :regional-district="regionalDistrictName"
                :census-data="censusSubdivision"
                :community-details="communityDetails"
                :place-name="placeName"
                class="py-8"
                @go="viewReports"
              ></CommunityDetailsHeader>
            </v-container>

            <v-container v-if="parentCommunity" fluid>
              <v-alert type="info" class="primary--text">
                This community is within {{ parentCommunity.name }}'s boundary.
                Consider
                <nuxt-link
                  :to="`/community/${parentCommunity.id}`"
                  class="font-weight-bold"
                  >viewing the {{ parentCommunity.name }} page
                  instead.</nuxt-link
                >
              </v-alert>
            </v-container>
            <v-container v-if="!incorporated" fluid class="mt-2">
              <v-alert type="info" class="primary--text">
                This is an unincorporated community, so demographic information
                is only available for the containing census subdivision.
              </v-alert>
            </v-container>

            <div class="comm-details-content">
              <v-container fluid>
                <v-row no-gutters>
                  <v-col cols="12">
                    <CommunityDetailsSectionHeader
                      :title="`${placeName} Map`"
                      subtitle="Choose a report to view community data within that topic,
                    and compare to the average for the regional district, or all
                    of BC."
                    ></CommunityDetailsSectionHeader>
                  </v-col>
                </v-row>
              </v-container>
              <v-container fluid>
                <v-row no-gutters>
                  <v-col :cols="12" class="elevation-5">
                    <div class="map-container">
                      <Sidebar
                        :district="regionalDistrictName"
                        :place-name="placeName"
                        :grouped-locations="filteredLocations"
                        :grouped-census="groupedCensus"
                        :rid="communityDetails.regional_district"
                        @panel="handlePanelChange"
                        @viewReports="viewReports"
                      >
                        <div class="pl-4 pr-4">
                          <div class="mt-5">
                            <h6
                              class="pa-0 ma-0 text-subtitle-1 font-weight-bold my-5"
                              style="line-height: 0;"
                            >
                              Show facilities by
                            </h6>
                            <div>
                              <v-radio-group
                                v-model="assetMode"
                                class="pa-0 ma-0"
                              >
                                <v-radio
                                  value="driving"
                                  label="Driving Distance"
                                ></v-radio>
                                <v-radio
                                  value="boundary"
                                  label="Municial Boundary"
                                ></v-radio>
                              </v-radio-group>
                            </div>
                          </div>
                          <p class="text-center pa-0 ma-0 text-body-1 mt-3">
                            {{ assetModeText }}
                            <a
                              v-if="assetMode === 'driving'"
                              href="/footnotes#community-detail-asset-driving-distance"
                              target="_blank"
                              >*</a
                            >
                          </p>
                          <AssetSlider
                            v-if="assetMode === 'driving'"
                            @mouseup="handleEnd"
                          ></AssetSlider>
                        </div>
                      </Sidebar>
                      <CommunityDetailsMap
                        :place-name="placeName"
                        :community-details="communityDetails"
                      ></CommunityDetailsMap>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="12">
                    <div class="mt-10">
                      <CommunityDetailsSectionHeader
                        :title="`${placeName} Reports`"
                        subtitle="Choose a report to view community data within that topic,
                    and compare to the average for the regional district, or all
                    of BC."
                      ></CommunityDetailsSectionHeader>

                      <v-alert
                        v-if="hasHiddenReports"
                        type="info"
                        dismissible
                        class="primary--text elevation-5"
                      >
                        This community has incomplete census data. The charts in
                        the reports reflect available census data and some
                        reports have been hidden.
                        <a
                          href="/footnotes#incomplete-census-data"
                          target="_blank"
                          >Learn more.</a
                        >
                      </v-alert>
                    </div>
                  </v-col>
                </v-row>

                <ReportSection
                  ref="reportSection"
                  :place-name="placeName"
                  :community="communityDetails"
                  :report-cards="reportCards"
                  :cid="communityDetails.id"
                  :reports-to-hide="communityDetails.hidden_report_pages"
                  @reportOpen="reportOpen"
                  @reportClose="reportClose"
                ></ReportSection>

                <v-row>
                  <v-col col="12">
                    <div class="mt-10">
                      <CommunityDetailsSectionHeader
                        title="Miscellaneous"
                        subtitle="Other items that may be of interest"
                      ></CommunityDetailsSectionHeader>

                      <div class="mt-5">
                        <v-btn color="primary" @click="showRawData = true"
                          >View Raw Data
                          <v-icon right dark>mdi-database</v-icon>
                        </v-btn>
                        <v-btn
                          class="ml-2"
                          :href="`mailto:${$config.citFeedbackEmail}?subject=CIT Feedback`"
                          >Give Feedback</v-btn
                        >
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="mobile-map-container">
            <CommunityDetailsMap
              :place-name="placeName"
              :community-details="communityDetails"
            ></CommunityDetailsMap>
          </div>
          <CommunityDetailsFooter
            @openSheet="sheetOpen = true"
          ></CommunityDetailsFooter>
          <CommunityDetailsBottomSheet
            :sheet-open="sheetOpen"
            @collapse="sheetOpen = false"
          >
            <Sidebar
              :district="regionalDistrictName"
              :place-name="placeName"
              :grouped-locations="filteredLocations"
              :grouped-census="groupedCensus"
              :rid="communityDetails.regional_district"
              @expand="handleExpand"
              @viewReports="viewReports"
            >
              <div class="pl-4 pr-4">
                <p class="text-center pa-0 ma-0 text-body-1 mt-3">
                  {{ assetModeText }}
                  <a
                    v-if="assetMode === 'driving'"
                    href="/footnotes#community-detail-asset-driving-distance"
                    target="_blank"
                    >*</a
                  >
                </p>
                <AssetSlider
                  v-if="assetMode === 'driving'"
                  @mouseup="handleEnd"
                ></AssetSlider>
                <div class="text-center">
                  <v-btn
                    small
                    color="primary"
                    class="text-body-1 text-capitalize mt-2"
                    @click="handleAssetModeChange"
                  >
                    <v-icon small class="mr-2">{{
                      assetModeButtonIcon
                    }}</v-icon>
                    {{ assetModeButtonText }}</v-btn
                  >
                </div>
              </div>
            </Sidebar>
          </CommunityDetailsBottomSheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import groupBy from 'lodash/groupBy'
import {
  getCommunity,
  getCensusSubDivision,
  getDataSourceList,
  getCommunityList,
  getRegionalDistricts,
} from '~/api/cit-api'
import { yesno } from '~/utils/filters'
import reportPages from '~/data/communityDetails/reportPages.json'
import { getAuthToken } from '~/api/ms-auth-api/'
const commModule = namespace('communities')

@Component({
  filters: {
    yesno,
  },
})
export default class CommunityDetail extends Vue {
  head() {
    return {
      title: `${this.placeName}`,
    }
  }

  layout(context) {
    return 'default'
  }

  showRawData = false
  isHydrated = false
  assetMode = 'driving'
  assetRange = [0, 50]
  communityDetails = {}
  censusSubdivision = {}

  sheetOpen = false

  @Watch('communityDetails')
  async getCensus() {
    const csid = this.communityDetails.display_fields.find(
      (df) => df.key === 'census_subdivision_id'
    )
    if (csid && csid.value) {
      const result = await getCensusSubDivision(csid.value)
      this.censusSubdivision = result.data
    }
  }

  error = false
  reportCards = reportPages

  get groupedLocations() {
    return map(groupBy(this.communityDetails.locations, 'type'), (o, k) => {
      return {
        group: k,
        locations: o,
        active: false,
      }
    })
  }

  handleEnd(data) {
    this.assetRange = [data[0], data[1]]
  }

  handleAssetModeChange() {
    if (this.assetMode === 'driving') {
      this.assetMode = 'boundary'
    } else {
      this.assetMode = 'driving'
    }
  }

  get isMobile() {
    if (this.isHydrated === true) {
      return this.$vuetify.breakpoint.width < 900
    } else {
      return false
    }
  }

  get hasHiddenReports() {
    return this.communityDetails.hidden_report_pages?.length > 0
  }

  get assetModeButtonIcon() {
    return this.assetMode === 'driving' ? 'mdi-crop-free' : 'mdi-car-side'
  }

  get filteredLocations() {
    let filtered = []
    if (this.assetMode === 'boundary') {
      filtered = this.communityDetails.locations.filter(
        (l) => l.within_municipality === true
      )
    } else {
      const [min, max] = this.assetRange
      filtered = this.communityDetails.locations.filter((l) => {
        const drivingDistance = l.driving_distance
        return drivingDistance >= min && drivingDistance <= max
      })
    }
    return map(groupBy(filtered, 'type'), (o, k) => {
      return {
        group: k,
        locations: o,
        active: false,
      }
    })
  }

  get assetModeText() {
    return this.assetMode === 'driving'
      ? 'Facilities by Driving Distance'
      : 'Facilities in Municipal Boundary'
  }

  get assetModeButtonText() {
    return this.assetMode === 'driving'
      ? 'Show By Municipal Boundary'
      : 'Show By Driving Distance'
  }

  get report() {
    return this.reportCards.find((r) => r.name === this.$route?.query?.report)
  }

  @commModule.Getter('getRegionalDistricts') regionalDistricts

  reportOpen(reportName) {
    this.$router.push({
      query: {
        report: reportName,
      },
    })
  }

  reportClose() {
    this.$router.push({
      query: {},
    })
  }

  created() {
    this.$root.$on('reportClose', () => {
      this.reportClose()
    })
  }

  get parentCommunity() {
    return this.communityDetails.parent_community
  }

  get incorporated() {
    if (this.communityDetails?.['display_fields']) {
      const incorporated = this.communityDetails.display_fields.find(
        (df) => df.key === 'incorporated'
      )
      return incorporated.value
    } else {
      return undefined
    }
  }

  get regionalDistrictName() {
    const rd = this.regionalDistricts.find(
      (rd) => rd.id === this.communityDetails.regional_district
    )
    return rd && rd.name
  }

  viewReports() {
    this.$vuetify.goTo(this.$refs.reportSection, {
      offset: 200,
    })
  }

  handlePanelChange(lt) {
    const layerName = 'locations'
    let filters = null
    if (lt) {
      filters = ['==', ['get', 'location_type'], lt]
    }
    console.log('Expand')
    this.$root.$emit('cdMapFilter', {
      layerName,
      filters,
    })
  }

  get groupedCensus() {
    if (this.censusSubdivision.groups) {
      return groupBy(this.censusSubdivision.groups, 'group')
    }
    return {}
  }

  get isCommunityEmpty() {
    return isEmpty(this.communityDetails)
  }

  get communityDisplayFields() {
    const dfs = this.communityDetails.display_fields.filter((v) => {
      return v.value
    })
    if (!dfs) {
      return []
    }
    return dfs.filter((df) => this.filterCommunityDetailFields(df))
  }

  getFieldValue(field) {
    const dfs = this.communityDetails.display_fields
    if (!dfs) {
      return ''
    }
    const temp = dfs.find((df) => df.key === field)
    return temp?.value
  }

  get placeName() {
    const dfs = this.communityDetails.display_fields
    if (!dfs) {
      return ''
    }
    const placeName = dfs.find((df) => df.key === 'place_name')
    return placeName?.value
  }

  filterCommunityDetailFields(field) {
    if (field.key === 'census_subdivision_id') {
      return false
    } else if (field.key === 'fn_community_name' && !field.value) {
      return false
    }
    return true
  }

  async fetch() {
    try {
      const cid = this.$route.params?.id

      const results = await Promise.all([
        getRegionalDistricts(),
        getCommunityList(),
        getDataSourceList(),
        getCommunity(cid),
        getAuthToken(),
      ])
      const regionalDistricts = results[0].data.results
      const communityList = results[1].data
      const dataSources = results[2].data
      this.$store.commit('communities/setRegionalDistricts', regionalDistricts)
      this.$store.commit('communities/setCommunities', communityList)
      this.$store.commit('communities/setDataSources', dataSources)
      this.communityDetails = results[3].data
      const accessToken = results[4].data.access_token
      this.$store.commit('msauth/setAccessToken', accessToken)
    } catch (e) {
      console.error(e)
    }
  }

  mounted() {
    this.isHydrated = true
    if (!this.isMobile) {
      this.$root.$emit('openLayerSwitcher')
    }
    console.log('Report?', this.report)
  }
}
</script>
<style lang="scss" scoped>
.community-new-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 3em;
}
#map {
  width: 100%;
  height: 100%;
}
.map-container {
  width: 100%;
  height: 60vmin;
  display: flex;
}
.community-details-sidebar {
  min-width: 360px;
  max-width: 360px;
  background-color: white;
  overflow-y: auto;
}

.mobile-map-container {
  position: fixed;
  top: 66px;
  bottom: 86px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 4;
}
@media screen and (max-width: 1400px) {
  .community-new-container {
    padding: 1em;
  }
}
@media screen and (max-width: 1000px) {
  .community-new-container {
    padding: 0;
  }

  .comm-detail-header-image {
    display: none;
  }

  .v-application .cd-header > h5 {
    padding: 20px !important;
  }
}

@media screen and (max-width: 540px) {
  .mobile-map-container {
    bottom: 102px;
  }
}

@media screen and (max-width: 477px) {
  .community-new-container {
    padding: 0;
  }

  .community-details-sidebar {
    min-width: auto;
  }
}
</style>
<style lang="scss">
.v-alert.info .v-icon {
  color: #193262;
}
.community-details-sidebar .v-list-group__header__prepend-icon {
  margin-right: 16px !important;
}
.community-details-sidebar .v-list-group__header__append-icon {
  min-width: auto !important;
  margin-left: 0 !important;
}
.community-marker {
  background-image: url('~assets/icons/communities.svg');
  background-size: cover;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
