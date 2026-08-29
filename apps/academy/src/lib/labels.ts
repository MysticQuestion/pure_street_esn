import type { Pathway, Role, Stream } from "./types";

export const ROLE_LABEL: Record<Role, string> = {
  resident: "Resident",
  employee: "Business employee",
  owner: "Business owner",
  property: "Property manager",
  trainee: "STREETS field trainee",
};

export const STREAM_LABEL: Record<Stream, string> = {
  recycle: "Recycle",
  compost: "Compost",
  trash: "Trash",
  special: "Special disposal",
};

export const PATHWAY_LABEL: Record<Pathway, string> = {
  wm: "Waste Management of Alameda County",
  cws: "California Waste Solutions",
  oak311: "Oakland 311 / Public Works",
  stopwaste: "StopWaste / HHW",
  property: "Property owner or manager",
  other: "Another specialized service",
};
