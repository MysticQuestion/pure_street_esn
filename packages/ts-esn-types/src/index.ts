// Shared TypeScript interfaces for ESN data models.

export interface Attachment {
  attachment_id: string;
  kind: 'photo' | 'video' | 'audio';
  uri: string;
  thumbnail_uri?: string | null;
  sha256?: string | null;
  exif?: Record<string, any> | null;
}

export interface HazardLocation {
  lat: number;
  lng: number;
  accuracy_meters?: number | null;
  geohash?: string | null;
  corridor_id?: string | null;
  blockface_id?: string | null;
}

export interface HazardReport {
  report_id: string;
  reporter_id: string;
  source_type: 'resident' | 'crew' | 'partner' | 'sensor' | 'imported_311';
  category_id: string;
  location: HazardLocation;
  observed_at: string; // ISO date-time
  submitted_at: string; // ISO date-time
  verification_status: 'pending' | 'auto_verified' | 'verified' | 'rejected' | 'duplicate_merged' | 'resolved' | 'closed_unresolved';
  subcategory_tag?: string | null;
  description?: string | null;
  severity_raw?: number | null;
  attachments?: Attachment[];
  verification_confidence?: number | null;
  duplicate_of_report_id?: string | null;
  trust_score_snapshot?: number | null;
  routing_targets?: string[];
  privacy_flags?: {
    contains_faces?: boolean;
    contains_license_plate?: boolean;
    contains_minors?: boolean;
    redaction_required?: boolean;
  };
}

export interface SensorReading {
  reading_id: string;
  node_id: string;
  captured_at: string; // ISO date-time
  temperature_c?: number | null;
  pm25_ug_m3?: number | null;
  no2_ppb?: number | null;
  noise_db?: number | null;
  humidity_pct?: number | null;
}

export interface VerificationRecord {
  verification_id: string;
  report_id: string;
  verified_at: string; // ISO date-time
  status: 'auto_verified' | 'verified' | 'rejected' | 'duplicate_merged';
  verifier_id?: string | null;
  confidence?: number | null;
  comments?: string | null;
}

export interface CorridorScore {
  corridor_id: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  computed_at: string; // ISO date-time
  trend?: 'improving' | 'stable' | 'declining' | null;
  details?: Record<string, number> | null;
}