import _ from "lodash";
import { createOpportunityLink } from "../../helpers/helpers";

/**
 * Initial opportunity model
 */
export const OPPORTUNITY_MODEL = () => ({
  name: "",
  address: "",
  coords: [54.1722, -124.1207],
  approvalStatus: "",
  businessContactName: "",
  businessContactEmail: "",
  publicNote: "",
  privateNote: "",
  lastAdmin: "",
  user: 1,
  dateCreated: "",
  dateUpdated: "",
  datePublished: null,
  resourceIds: {
    Hospitals: "5ff82cf4-0448-4063-804a-7321f0f2b4c6",
    Schools: "5832eff2-3380-435e-911b-5ada41c1d30b",
    "Post Secondary Schools": "8e4e2a87-2d1d-4931-828e-6327b49f310e",
    Courts: "23aa0b75-2715-4ccb-9a36-9a608450dc2d",
    "Walk-In Clinics": "3ca6b086-c92b-4654-ae82-ff5723d00611",
    "Natural Resource Projects": "2b69cc4b-4076-4272-a5a0-1c731455e063",
    "Economic Projects": "b12cd4cc-b58b-4079-b630-a20b6df58e8d",
  },
  nearbyResources: {},
  community: {},
  regionalDistrict: {},
  municipality: {},
  municipalities: [],
  firstNationCommunities: [],
  services: {
    networkAvg: {
      title: "Site servicing",
      subtitle: "- Speed average",
      value: "",
      type: "paragraph",
    },
    networkAtRoad: {
      title: "Site servicing",
      subtitle: "- Speed at nearest road",
      value: "",
      type: "paragraph",
    },
    roadAccess: {
      title: "Site servicing",
      subtitle: "- Road Access",
      name: "Unknown",
      type: "text",
    },
    waterSupply: {
      title: "Site servicing",
      subtitle: "- Water",
      name: "Unknown",
      value: "",
      type: "capacity",
      suffix: "m³/hour",
    },
    naturalGas: {
      title: "Site servicing",
      subtitle: "- Natural Gas",
      name: "Unknown",
      value: "",
      type: "pressure",
      suffix: "MMBTU/hour",
    },
    sewer: {
      title: "Site servicing",
      subtitle: "- Sewer",
      name: "Unknown",
      value: "",
      type: "capacity",
      suffix: "m³/hour",
    },
    electrical: {
      title: "Site servicing",
      subtitle: "- Electrical",
      name: "Unknown",
      value: "",
      type: "capacity",
      suffix: "MW",
    },
    transmission: {
      title: "Power Transmission Lines",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearHealth: {
      title: "Health Care Facility within 100km",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearFire: {
      title: "First Responders within 100km",
      subtitle: "- Fire",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearAmbulance: {
      title: "First Responders within 100km",
      subtitle: "- Ambulance",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearPolice: {
      title: "First Responders within 100km",
      subtitle: "- Police",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearCoastGuard: {
      title: "First Responders within 100km",
      subtitle: "- Coast Guard",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearSecondarySchool: {
      title: "Post-Secondary Education Facility within 100km",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearResearchCentre: {
      title: "Research Centre within 100km",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
  },
  transportation: {
    nearHighway: {
      title: "Nearest Highway",
      name: "",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearAirport: {
      title: "Nearest Air Service",
      name: "",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearRailway: {
      title: "Nearest Railway",
      name: "",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearPort: {
      title: "Nearest Port",
      name: "",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearCustomsPort: {
      title: "Nearest Canada Customs Port of Entry",
      name: "",
      value: 0,
      type: "distance",
      suffix: "km",
    },
  },
  physical: {
    nearElevation: {
      title: "Elevation at location",
      name: null,
      value: 0,
      type: "height",
      suffix: "m",
    },
    nearGround: {
      title: "Soil Name, Texture, Drainage",
      name: null,
      value: "",
      type: "text",
    },
    nearLake: {
      title: "Nearest lake",
      name: "",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearRiver: {
      title: "Nearest river",
      name: "",
      value: 0,
      type: "distance",
      suffix: "km",
    },
  },
  siteInfo: {
    parcelOwnership: {
      title: "Ownership",
      name: "",
      type: "text",
    },
    parcelSize: {
      title: "Parcel size",
      value: null,
      type: "size",
      suffix: "acres",
    },
    PID: {
      title: "PID",
      value: null,
      type: "paragraph",
    },
    geometry: {
      title: "Polygon",
      type: "Polygon",
      coordinates: null,
      hidden: true,
    },
    siteId: {
      title: "Site ID",
      value: null,
      type: "text",
      hidden: true,
    },
  },
  userInfo: {
    saleOrLease: {
      title: "Sale or Lease",
      value: "",
      type: "select",
      rentalPrice: "",
      salePrice: "",
    },
    currentZone: { title: "Current Zoning", value: "", type: "select" },
    futureZone: { title: "Designation", value: "", type: "select" },
    preferredDevelopment: {
      title: "Preferred Development",
      value: [],
      type: "multi",
    },
    opportunityDescription: {
      title: "Opportunity Description",
      value: "",
      type: "paragraph",
    },
    environmentalInformation: {
      title: "Environmental Information",
      value: "",
      type: "paragraph",
    },
    communityLink: {
      title: "Visit Community website",
      value: "",
      type: "link",
    },
    opportunityLink: {
      title: "View listing for this Opportunity",
      value: "",
      type: "link",
    },
    editing: false,
  },
});

const STATUS_CODES = { Y: "Yes", N: "No", U: "Unknown" };

/**
 * Model used to map visual sections of the screens.
 */
export class Opportunity {
  constructor(state) {
    if (state) {
      this.state = _.mergeWith({}, state);
    } else {
      this.state = _.mergeWith({}, OPPORTUNITY_MODEL());
    }
  }

  set deleted(value) {
    this.state.deleted = value;
  }

  set editing(value) {
    this.state.editing = value;
  }

  set id(value) {
    this.state.id = value;
  }

  set approvalStatus(value) {
    this.state.approvalStatus = value;
  }

  set geoPosition(value) {
    const geo = value.match(/\((.*) (.*)\)/);
    this.state.coords = [parseFloat(geo[2]), parseFloat(geo[1])];
  }

  set opportunityAddress(value) {
    this.state.address = value;
  }

  set regionalDistrict(value) {
    this.state.regionalDistrict = value;
  }

  set municipality(value) {
    this.state.municipality = value;
  }

  set nearestMunicipalities(value) {
    if (value && value.features) {
      this.state.municipalities = value.features.map((feature) => ({
        name: feature.properties.name,
        link: feature.properties.link,
        distance: feature.properties.distance,
        population: feature.properties.population,
        pk: feature.properties.pk,
      }));
    } else {
      this.state.municipalities = value.map((feature) => ({
        name: feature.municipality_name,
        link: feature.municipality_link,
        distance: feature.municipality_distance,
        population: feature.municipality_population,
        pk: feature.municipality_id,
      }));
    }
  }

  set nearestFirstNations(value) {
    if (value && value.features) {
      this.state.firstNationCommunities = value.features.map((feature) => ({
        name: feature.properties.english_name,
        link: feature.properties.link,
        distance: feature.properties.distance,
        population: feature.properties.population,
        pk: feature.properties.pk,
      }));
    } else {
      this.state.firstNationCommunities = value.map((feature) => ({
        name: feature.reserve_name,
        link: feature.reserve_link,
        distance: feature.reserve_distance,
        population: feature.reserve_population,
        pk: feature.reserve_id,
      }));
    }
  }

  createLink() {
    this.state.link = createOpportunityLink(this.state.name, this.state.id);
  }

  set opportunityName(value) {
    this.state.name = value;
  }

  set dateCreated(value) {
    this.state.dateCreated = value;
  }

  set dateUpdated(value) {
    this.state.dateUpdated = value;
  }

  set publicNote(value) {
    this.state.publicNote = value;
  }

  set privateNote(value) {
    this.state.privateNote = value;
  }

  set lastAdmin(value) {
    this.state.lastAdmin = value;
  }

  set userId(value) {
    this.state.user = value;
  }

  // Business Contact
  set businessContactName(value) {
    this.state.businessContactName = value;
  }

  set businessContactEmail(value) {
    this.state.businessContactEmail = value;
  }

  // Transportation Info
  set nearestHighway(value) {
    if (value.features) {
      this.state.transportation.nearHighway.name =
        value.features && value.features[0].properties.name;
      this.state.transportation.nearHighway.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.transportation.nearHighway.name = value.name;
      this.state.transportation.nearHighway.value = value.highway_id;
    }
    this.state.transportation.nearHighway.value = value.highway_distance;
  }

  set nearestAirport(value) {
    if (value.features) {
      this.state.transportation.nearAirport.name =
        value.features[0].properties.name;
      this.state.transportation.nearAirport.pk =
        value.features[0].properties.pk;
    } else {
      this.state.transportation.nearAirport.name = value.name;
      this.state.transportation.nearAirport.pk = value.airport_id;
    }
    this.state.transportation.nearAirport.value = value.airport_distance;
  }

  set nearestRailway(value) {
    if (value.features) {
      this.state.transportation.nearRailway.name =
        value.features && value.features[0].properties.name;
      this.state.transportation.nearRailway.value = value.railway_distance;
      this.state.transportation.nearRailway.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.transportation.nearRailway.name = value.name;
      this.state.transportation.nearRailway.pk = value.railway_id;
    }
    this.state.transportation.nearRailway.value = value.railway_distance;
  }

  set nearestPort(value) {
    if (value.features) {
      this.state.transportation.nearPort.name =
        value.features && value.features[0].properties.name;
      this.state.transportation.nearPort.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.transportation.nearPort.name = value.name;
      this.state.transportation.nearPort.pk = value.railway_id;
    }
    this.state.transportation.nearPort.value = value.port_distance;
  }

  set nearestCustomsPortOfEntry(value) {
    if (value.features) {
      this.state.transportation.nearCustomsPort.name =
        value.features && value.features[0].properties.name;
      this.state.transportation.nearCustomsPort.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.transportation.nearCustomsPort.name = value.name;
      this.state.transportation.nearCustomsPort.pk = value.railway_id;
    }
    this.state.transportation.nearCustomsPort.value =
      value.customs_port_distance;
  }

  // Physical Info
  set nearElevation(value) {
    this.state.physical.nearElevation.value = parseFloat(value);
  }

  set elevationAtLocation(value) {
    this.state.physical.nearElevation.value = parseFloat(value);
  }

  set nearGround(value) {
    this.state.physical.nearGround.name = value;
  }

  set nearestLake(value) {
    if (value) {
      this.state.physical.nearLake.name = "Yes";
    }
    if (value.features) {
      this.state.physical.nearLake.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.physical.nearLake.pk = value.features && value.lake_id;
    }
    this.state.physical.nearLake.value = value.lake_distance;
  }

  set nearestRiver(value) {
    if (value) {
      this.state.physical.nearRiver.name = "Yes";
    }
    if (value.features) {
      this.state.physical.nearRiver.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.physical.nearRiver.pk = value.river_id;
    }
    this.state.physical.nearRiver.value = value.river_distance;
  }

  // Services
  set opportunityRoadConnected(name) {
    this.state.services.roadAccess.name = STATUS_CODES[name];
  }

  set opportunityWaterConnected(name) {
    this.state.services.waterSupply.name = STATUS_CODES[name];
  }

  set opportunityWaterCapacity(value) {
    this.state.services.waterSupply.value = value;
  }

  set opportunitySewerConnected(name) {
    this.state.services.sewer.name = STATUS_CODES[name];
  }

  set opportunitySewerCapacity(value) {
    this.state.services.sewer.value = value;
  }

  set opportunityNaturalGasConnected(name) {
    this.state.services.naturalGas.name = STATUS_CODES[name];
  }

  set opportunityNaturalGasCapacity(value) {
    this.state.services.naturalGas.value = value;
  }

  set opportunityElectricalConnected(name) {
    this.state.services.electrical.name = STATUS_CODES[name];
  }

  set opportunityElectricalCapacity(value) {
    this.state.services.electrical.value = value;
  }

  set nearestTransmissionLine(value) {
    if (value) {
      this.state.services.transmission.name = "Yes";
    }
    this.state.services.transmission.value = value;
  }

  set networkAvg(value) {
    this.state.services.networkAvg.value = value;
  }

  set networkAtRoad(value) {
    this.state.services.networkAtRoad.value = value;
  }

  set nearestTransmission(value) {
    if (value) {
      this.state.services.transmission.name = "Yes";
    }
    this.state.services.transmission.value = value.distance;
  }

  set nearestResearchCentre(value) {
    if (value) {
      this.state.services.nearResearchCentre.name = "Yes";
    }
    if (value.features) {
      this.state.services.nearResearchCentre.value =
        value.research_centre_distance;
      this.state.services.nearResearchCentre.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.services.nearResearchCentre.value = parseFloat(
        value.research_centre_distance
      );
      this.state.services.nearResearchCentre.pk = value.research_centre_id;
    }
  }

  set nearestHealthCenter(value) {
    if (value) {
      this.state.services.nearHealth.name = "Yes";
    }
    if (value.features) {
      this.state.services.nearHealth.value = value.distance;
      this.state.services.nearHealth.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.services.nearHealth.value = value.hospital_distance;
      this.state.services.nearHealth.pk = value.hospital_id;
    }
  }

  set nearestFireStation(value) {
    if (value) {
      this.state.services.nearFire.name = "Yes";
    }
    if (value.features) {
      this.state.services.nearFire.value = value.distance;
      this.state.services.nearFire.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.services.nearFire.value = value.first_responder_distance;
      this.state.services.nearFire.pk = value.first_responder_id;
    }
  }

  set nearestAmbulanceStation(value) {
    if (value) {
      this.state.services.nearAmbulance.name = "Yes";
    }
    if (value.features) {
      this.state.services.nearAmbulance.value = value.distance;
      this.state.services.nearAmbulance.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.services.nearAmbulance.value = value.first_responder_distance;
      this.state.services.nearAmbulance.pk = value.first_responder_id;
    }
  }

  set nearestPoliceStation(value) {
    if (value) {
      this.state.services.nearPolice.name = "Yes";
    }
    if (value.features) {
      this.state.services.nearPolice.value = value.distance;
      this.state.services.nearPolice.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.services.nearPolice.value = value.first_responder_distance;
      this.state.services.nearPolice.pk = value.first_responder_id;
    }
  }

  set nearestCoastGuardStation(value) {
    if (value) {
      this.state.services.nearCoastGuard.name = "Yes";
    }
    if (value.features) {
      this.state.services.nearCoastGuard.value = value.distance;
      this.state.services.nearCoastGuard.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.services.nearCoastGuard.value = value.first_responder_distance;
      this.state.services.nearCoastGuard.pk = value.first_responder_id;
    }
  }

  set nearestPostSecondary(value) {
    if (value) {
      this.state.services.nearSecondarySchool.name = "Yes";
    }
    if (value.features) {
      this.state.services.nearSecondarySchool.value =
        value.post_secondary_distance;
      this.state.services.nearSecondarySchool.pk =
        value.features && value.features[0].properties.pk;
    } else {
      this.state.services.nearSecondarySchool.value = value.location_distance;
      this.state.services.nearSecondarySchool.pk = value.location_id;
    }
  }

  // Site Info
  set parcelOwnership(value) {
    this.state.siteInfo.parcelOwnership.name = value;
  }

  get parcelOwnership() {
    return this.state.siteInfo.parcelOwnership.name;
  }

  set parcelSize(value) {
    this.state.siteInfo.parcelSize.value = parseFloat(value);
  }

  set PID(value) {
    this.state.siteInfo.PID.value = [value];
  }

  set parcelGeometry(value) {
    this.state.siteInfo.geometry.coordinates = value;
  }

  set geometry(value) {
    this.state.siteInfo.geometry.polygon = value;
  }

  // User Info
  set saleOrLease(value) {
    this.state.userInfo.saleOrLease.value = value;
  }

  set opportunitySalePrice(value) {
    this.state.userInfo.saleOrLease.salePrice = value;
  }

  set opportunityRentalPrice(value) {
    this.state.userInfo.saleOrLease.rentalPrice = value;
  }

  set rentalPrice(value) {
    this.state.userInfo.saleOrLease.rentalPrice = value;
  }

  set salePrice(value) {
    this.state.userInfo.saleOrLease.salePrice = value;
  }

  set ocpZoningCode(value) {
    this.state.userInfo.futureZone.value = value;
  }

  set landUseZoning(value) {
    this.state.userInfo.currentZone.value = value;
  }

  set opportunityPreferredDevelopmentV2(value) {
    this.state.userInfo.preferredDevelopment.value = value
      .split(";")
      .map((label) => ({ label }));
  }

  set opportunityPropertyStatus(value) {
    this.state.userInfo.saleOrLease.value = value;
  }

  set opportunityDescription(value) {
    this.state.userInfo.opportunityDescription.value = value;
  }

  set environmentalInformation(value) {
    this.state.userInfo.environmentalInformation.value = value;
  }

  set communityLink(value) {
    this.state.userInfo.communityLink.value = value;
  }

  set community(value) {
    this.state.community.id = value.features && value.features[0].properties.pk;
    this.state.community.community_distance = value.community_distance;
  }

  set opportunityLink(value) {
    this.state.userInfo.opportunityLink.value = value;
  }

  asState() {
    return this.state;
  }
}
