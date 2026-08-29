import type { Governance } from "./types";

export const COURSE_VERSION = "WR101-2026.08";
export const REVIEWED = "2026-08-29";
export const REVIEWER = "STREETS Academy editorial (Oakland Recycles / StopWaste public sources)";

export const OAKLAND: Omit<Governance, "source" | "sourceUrl"> = {
  jurisdiction: "City of Oakland, California",
  effectiveDate: "2025-12-01",
  lastReviewed: REVIEWED,
  reviewedBy: REVIEWER,
  courseVersion: COURSE_VERSION,
};

export function gov(source: string, sourceUrl: string, effectiveDate = "2025-12-01"): Governance {
  return { ...OAKLAND, source, sourceUrl, effectiveDate };
}

export const LINKS = {
  oaklandRecycles: "https://www.oaklandrecycles.com/",
  whatGoesWhere: "https://www.oaklandrecycles.com/what-goes-where/",
  recycling: "https://www.oaklandrecycles.com/what-goes-where/recycling/",
  compost: "https://www.oaklandrecycles.com/what-goes-where/compost/",
  sortingGuide: "https://www.oaklandrecycles.com/wp-content/uploads/2022/06/oakland-sorting-guide_dec2025.pdf",
  bulky: "https://www.oaklandrecycles.com/bulky-service/",
  laws: "https://www.oaklandrecycles.com/laws/",
  cityWaste: "https://www.oaklandca.gov/My-Household/Waste-and-Recycling",
  cws: "https://calwaste.com/oakland/",
  wm: "https://www.wm.com/us/en/oakland-recycles",
  wmSchedule: "https://www.wm.com/us/en/oakland-recycles",
  stopwaste: "https://www.stopwaste.org/",
  hhw: "https://www.stopwaste.org/recycling-disposal/hazardous-waste/household-hazardous-waste",
  hhwFacilities: "https://www.stopwaste.org/recycling-disposal/hazardous-waste/household-hazardous-waste/drop-off-facilities",
  orro: "https://www.stopwaste.org/rules",
  oak311: "https://www.oaklandca.gov/services/oak311",
  streets: "https://oaklandstreets.live/",
  streetsMap: "https://oaklandstreets.live/map",
  streetsAbout: "https://oaklandstreets.live/about",
  streetsGov: "https://oaklandstreets.live/governance",
} as const;

export const CONTACTS = {
  bulky: { label: "WM bulky service", value: "1-888-962-8559", href: "tel:18889628559" },
  save: { label: "Oakland Recycles (SAVE)", value: "510-238-7283", href: "tel:5102387283" },
  hhw: { label: "Alameda County HHW", value: "1-800-606-6606", href: "tel:18006066606" },
  oak311: { label: "Oakland 311", value: "311", href: "https://www.oaklandca.gov/services/oak311" },
} as const;

export const HHW_OAKLAND = {
  name: "Alameda County HHW Facility — Oakland",
  address: "2100 East 7th Street, Oakland",
  hours: "Wed–Fri 9:00 AM–2:30 PM; Sat 9:00 AM–4:00 PM. Closed Sun–Tue.",
  note: "No appointment. Confirm hours before you go — the site closes on published holidays.",
};

export const DAVIS_STREET = {
  name: "Davis Street Resource Recovery Complex",
  address: "2615 Davis Street, San Leandro, CA 94577",
  note: "WM bulky drop-off for Oakland residents. Appointment required. Proof of Oakland residency. Up to 4 cubic yards.",
};

export const DISCLAIMER =
  "STREETS Academy is independent civic education. It is not a City of Oakland system, not a hauler training program, and does not replace Oakland Recycles, OAK311, Waste Management, California Waste Solutions, or StopWaste. Sorting rules follow published Oakland Recycles guidance (sorting guide dated Dec 2025) as reviewed 29 Aug 2026. Rules change — when in doubt, check OaklandRecycles.com.";

export const ADVANCED_BADGES = [
  {
    id: "ambassador",
    name: "STREETS Waste Ambassador",
    requires: "WR101 + community outreach module",
  },
  {
    id: "observer",
    name: "STREETS Field Observer",
    requires: "WR101 + field practicum + documentation assessment",
  },
  {
    id: "property",
    name: "STREETS Property Waste Steward",
    requires: "Property-management compliance and resident-education specialization",
  },
  {
    id: "commercial",
    name: "STREETS Commercial Waste Steward",
    requires: "Business waste and organics specialization",
  },
  {
    id: "youth",
    name: "STREETS Youth Environmental Steward",
    requires: "Adapted secondary-school curriculum",
  },
  {
    id: "data",
    name: "STREETS Environmental Data Technician",
    requires: "Advanced observations, GIS, datasets, verification, and quality assurance",
  },
] as const;
