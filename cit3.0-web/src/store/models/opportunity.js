import _ from "lodash";
import { toKebabCase } from "../../helpers/helpers";

/**
 * Initial opportunity model
 * @todo remove/update initial coords
 * @todo remove initial municipalities
 * @todo remove/update services
 * @todo remove/update transportation
 * @todo remove/update physical
 * @todo remove/update siteInfo
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
  municipalities: [],
  firstNationCommunities: [],
  services: {
    networkAvg: {
      title: "Network Connectivity",
      subtitle: "- Speed average",
      value: "",
      type: "paragraph",
    },
    networkAtRoad: {
      title: "Network Connectivity",
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
      value: 0,
      type: "capacity",
      suffix: "m³/hour",
    },
    naturalGas: {
      title: "Site servicing",
      subtitle: "- Natural Gas",
      name: "Unknown",
      value: 0,
      type: "pressure",
      suffix: "MMBTU/hour",
    },
    sewer: {
      title: "Site servicing",
      subtitle: "- Sewer",
      name: "Unknown",
      value: 0,
      type: "capacity",
      suffix: "m³/hour",
    },
    electrical: {
      title: "Site servicing",
      subtitle: "- Electrical",
      name: "Unknown",
      value: 0,
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
    nearResearchCenter: {
      title: "Research Center within 100km",
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
      title: "Nearest Airport",
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
    saleOrLease: { title: "Sale or Lease", value: "", type: "text", price: "" },
    currentZone: { title: "Current Zoning", value: "", type: "text" },
    futureZone: { title: "Future Zoning", value: "", type: "text" },
    preferredDevelopment: {
      title: "Preferred Development",
      value: [],
      type: "multi",
    },
    opportunityDescription: {
      title: "Oppotunity Description",
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
  },
});

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
    this.state.regionalDistrict.id = value.id;
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
    }
  }

  set nearestFirstNations(value) {
    if (value && value.features) {
      this.state.firstNationCommunities = value.features.map((feature) => ({
        name: feature.properties.name,
        link: feature.properties.link,
        distance: feature.properties.distance,
        population: feature.properties.population,
        pk: feature.properties.pk,
      }));
    }
  }

  createLink() {
    this.state.link = `/opportunity/${toKebabCase(this.state.name)}-${
      this.state.id
    }`;
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

  // Business Contact
  set businessContactName(value) {
    this.state.businessContactName = value;
  }

  set businessContactEmail(value) {
    this.state.businessContactEmail = value;
  }

  // Transportation Info
  set nearestHighway(value) {
    this.state.transportation.nearHighway.name =
      value.features && value.features[0].properties.name;
    this.state.transportation.nearHighway.value = value.distance;
    this.state.transportation.nearHighway.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestAirport(value) {
    this.state.transportation.nearAirport.name =
      value.features && value.features[0].properties.name;
    this.state.transportation.nearAirport.value = value.distance;
    this.state.transportation.nearAirport.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestRailway(value) {
    this.state.transportation.nearRailway.name =
      value.features && value.features[0].properties.name;
    this.state.transportation.nearRailway.value = value.distance;
    this.state.transportation.nearRailway.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestPort(value) {
    this.state.transportation.nearPort.name =
      value.features && value.features[0].properties.name;
    this.state.transportation.nearPort.value = value.distance;
    this.state.transportation.nearPort.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestCustomsPort(value) {
    this.state.transportation.nearCustomsPort.name =
      value.features && value.features[0].properties.name;
    this.state.transportation.nearCustomsPort.value = value.distance;
    this.state.transportation.nearCustomsPort.pk =
      value.features && value.features[0].properties.pk;
  }

  // Physical Info
  set nearElevation(value) {
    this.state.physical.nearElevation.value = value;
  }

  set nearGround(value) {
    this.state.physical.nearGround.value = value;
  }

  set nearestLake(value) {
    if (value) {
      this.state.physical.nearLake.name = "Yes";
    }
    this.state.physical.nearLake.value = value.distance;
    this.state.physical.nearLake.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestRiver(value) {
    if (value) {
      this.state.physical.nearRiver.name = "Yes";
    }
    this.state.physical.nearRiver.value = value.distance;
    this.state.physical.nearRiver.pk =
      value.features && value.features[0].properties.pk;
  }

  // Services
  networkAvg(value) {
    this.state.services.networkAvg.value = value.speed;
  }

  networkAtRoad(value) {
    this.state.services.networkAtRoad.value = value.speed;
  }

  set nearestTransmission(value) {
    if (value) {
      this.state.services.transmission.name = "Yes";
    }
    this.state.services.transmission.value = value.distance;
  }

  set nearestResearchCenter(value) {
    if (value) {
      this.state.services.nearResearchCenter.name = "Yes";
    }
    this.state.services.nearResearchCenter.value = value.distance;
    this.state.services.nearResearchCenter.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestHealthCenter(value) {
    if (value) {
      this.state.services.nearHealth.name = "Yes";
    }
    this.state.services.nearHealth.value = value.distance;
    this.state.services.nearHealth.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestFireStation(value) {
    if (value) {
      this.state.services.nearFire.name = "Yes";
    }
    this.state.services.nearFire.value = value.distance;
    this.state.services.nearFire.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestAmbulanceStation(value) {
    if (value) {
      this.state.services.nearAmbulance.name = "Yes";
    }
    this.state.services.nearAmbulance.value = value.distance;
    this.state.services.nearAmbulance.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestPoliceStation(value) {
    if (value) {
      this.state.services.nearPolice.name = "Yes";
    }
    this.state.services.nearPolice.value = value.distance;
    this.state.services.nearPolice.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestCoastGuardStation(value) {
    if (value) {
      this.state.services.nearCoastGuard.name = "Yes";
    }
    this.state.services.nearCoastGuard.value = value.distance;
    this.state.services.nearCoastGuard.pk =
      value.features && value.features[0].properties.pk;
  }

  set nearestPostSecondary(value) {
    if (value) {
      this.state.services.nearSecondarySchool.name = "Yes";
    }
    this.state.services.nearSecondarySchool.value = value.distance;
    this.state.services.nearSecondarySchool.pk =
      value.features && value.features[0].properties.pk;
  }

  // Site Info
  set parcelOwnership(value) {
    this.state.siteInfo.parcelOwnership.name = value;
  }

  get parcelOwnership() {
    return this.state.siteInfo.parcelOwnership.name;
  }

  set parcelSize(value) {
    this.state.siteInfo.parcelSize.value = value;
  }

  set PID(value) {
    this.state.siteInfo.PID.value = value;
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

  set price(value) {
    this.state.userInfo.saleOrLease.price = value;
  }

  set ocpZoningCode(value) {
    this.state.userInfo.futureZone.value = value;
  }

  set landUseZoning(value) {
    this.state.userInfo.currentZone.value = value;
  }

  set opportunityPreferredDevelopment(value) {
    this.state.userInfo.preferredDevelopment.value = value;
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
    this.state.community.distance = value.distance;
  }

  set opportunityLink(value) {
    this.state.userInfo.opportunityLink.value = value;
  }

  asState() {
    return this.state;
  }
}
