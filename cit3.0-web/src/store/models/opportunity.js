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
export const OPPORTUNITY_MODEL = {
  name: "",
  address: "",
  coords: [54.1722, -124.1207],
  approvalStatus: "PEND",
  businessContactName: "",
  businessContactEmail: "",
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
  municipalities: [
    {
      name: "Comox",
      link: "http://www.example.com",
      distance: 1,
      population: 10900,
    },
    {
      name: "Courtney & Surrounding",
      link: "http://www.example.com",
      distance: 3.5,
      population: 190,
    },
    {
      name: "Victoria",
      link: "http://www.example.com",
      distance: 177.89,
      population: 109000,
    },
  ],
  firstNationCommunities: [
    {
      name: "Lyackson First Nation",
      link: "http://lyackson.bc.ca/",
      distance: 20,
      population: 200,
    },
    {
      name: "Lyackson First Nation",
      link: "http://lyackson.bc.ca/",
      distance: 20,
      population: 200,
    },
  ],
  services: {
    networkAvg: {
      title: "Network Connectivity",
      subtitle: "- Speed average",
      value: "20 Mbps",
      type: "paragraph",
    },
    networkAtRoad: {
      title: "Network Connectivity",
      subtitle: "- Speed at nearest road",
      value: "25 Mbps",
      type: "paragraph",
    },
    roadAccess: {
      title: "Site servicing",
      subtitle: "- Road Access",
      name: "Yes",
      type: "text",
    },
    waterSupply: {
      title: "Site servicing",
      subtitle: "- Water",
      name: "Yes",
      value: 3003,
      type: "capacity",
      suffix: "m³/hour",
    },
    naturalGas: {
      title: "Site servicing",
      subtitle: "- Natural Gas",
      name: "No",
      value: 10,
      type: "pressure",
      suffix: "MMBTU/hour",
    },
    sewer: {
      title: "Site servicing",
      subtitle: "- Sewer",
      name: "Yes",
      value: 1,
      type: "capacity",
      suffix: "m³/hour",
    },
    electrical: {
      title: "Site servicing",
      subtitle: "- Electrical",
      name: "Yes",
      value: 1,
      type: "capacity",
      suffix: "MW",
    },
    transmission: {
      title: "Power Transmission Lines",
      name: "Yes",
      value: 34,
      type: "distance",
      suffix: "km",
    },
    nearResearchCenter: {
      title: "Research Center within 100km",
      name: "Yes",
      value: 10,
      type: "distance",
      suffix: "km",
    },
    nearHealth: {
      title: "Health Care Facility within 100km",
      name: "Yes",
      value: 11,
      type: "distance",
      suffix: "km",
    },
    nearFire: {
      title: "First Responders within 100km",
      subtitle: "- Fire",
      name: "Yes",
      value: 1,
      type: "distance",
      suffix: "km",
    },
    nearAmbulance: {
      title: "First Responders within 100km",
      subtitle: "- Ambulance",
      name: "Yes",
      value: 6,
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
      name: "Yes",
      value: 35,
      type: "distance",
      suffix: "km",
    },
    nearSecondarySchool: {
      title: "Post-Secondary Education Facility within 100km",
      name: "Yes",
      value: 10,
      type: "distance",
      suffix: "km",
    },
  },
  transportation: {
    nearHighway: {
      title: "Nearest Highway",
      name: "Highway 1",
      value: 0.5,
      type: "distance",
      suffix: "km",
    },
    nearAirport: {
      title: "Nearest Airport",
      name: "Comox Airport",
      value: 0.1,
      type: "distance",
      suffix: "km",
    },
    nearRailway: {
      title: "Nearest Railway",
      name: "CN Rail",
      value: 15,
      type: "distance",
      suffix: "km",
    },
    nearPort: {
      title: "Nearest Port",
      name: "Boat Dock",
      value: 47,
      type: "distance",
      suffix: "km",
    },
    nearCustomsPort: {
      title: "Nearest Canada Customs Port of Entry",
      name: "Intl. Port",
      value: 35,
      type: "distance",
      suffix: "km",
    },
  },
  physical: {
    nearElevation: {
      title: "Elevation at location",
      name: null,
      value: 100,
      type: "height",
      suffix: "m",
    },
    nearGround: {
      title: "Soil Name, Texture, Drainage",
      name: null,
      value: "Info here",
      type: "text",
    },
    nearLake: {
      title: "Nearest lake",
      name: "Local Lake",
      value: 3,
      type: "distance",
      suffix: "km",
    },
    nearRiver: {
      title: "Nearest river",
      name: "Forest River",
      value: 5,
      type: "distance",
      suffix: "km",
    },
  },
  siteInfo: {
    parcelOwnership: {
      title: "Ownership",
      name: "Crown",
      type: "text",
    },
    parcelSize: {
      title: "Parcel size",
      value: "5",
      type: "size",
      suffix: "ha",
    },
    PID: {
      title: "PID",
      value: "456-234-456",
      type: "text",
    },
  },
  userInfo: {
    saleOrLease: { title: "Sale or Lease", value: "", type: "text" },
    currentZone: { title: "Current Zoning", value: "", type: "text" },
    futureZone: { title: "Future Zoning", value: "", type: "text" },
    preferredDevelopment: {
      title: "Preferred Development",
      value: "",
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
};

/**
 * Model used to map visual sections of the screens.
 *
 * TODO: Municipal, First Nation Community, Services, Transporation, Physical mappings
 */
export class Opportunity {
  constructor() {
    this.state = { ...OPPORTUNITY_MODEL };
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

  createLink() {
    this.state.link = `/investment/${toKebabCase(this.state.name)}-${
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
  set nearHighway(value) {
    this.state.transportation.nearHighway.value = value;
  }

  set nearAirport(value) {
    this.state.transportation.nearAirport.value = value;
  }

  set nearRailway(value) {
    this.state.transportation.nearRailway.value = value;
  }

  set nearPort(value) {
    this.state.transportation.nearPort.value = value;
  }

  set nearCustomsPort(value) {
    this.state.transportation.nearCustomsPort.value = value;
  }

  // Physical Info
  set nearElevation(value) {
    this.state.physical.nearElevation.value = value;
  }

  set nearGround(value) {
    this.state.physical.nearGround.value = value;
  }

  set nearLake(value) {
    this.state.physical.nearLake.value = value;
  }

  set nearRiver(value) {
    this.state.physical.nearRiver.value = value;
  }

  // Site Info
  set parcelOwnership(value) {
    this.state.siteInfo.parcelOwnership.value = value;
  }

  set parcelSize(value) {
    this.state.siteInfo.parcelSize.value = value;
  }

  set PID(value) {
    this.state.siteInfo.PID.value = value;
  }

  // User Info
  set saleOrLease(value) {
    this.state.siteInfo.saleOrLease.value = value;
  }

  set futureZone(value) {
    this.state.userInfo.futureZone.value = value;
  }

  set currentZone(value) {
    this.state.userInfo.currentZone.value = value;
  }

  set preferredDevelopment(value) {
    this.state.userInfo.preferredDevelopment.value = value;
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

  set opportunityLink(value) {
    this.state.userInfo.opportunityLink.value = value;
  }

  asState() {
    return this.state;
  }
}
