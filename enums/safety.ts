// enums/safety.ts
// Admin console "Safety" block: reports, appeals, verification requests.

/** Reasons a user can pick when reporting a cast or a user. */
export const REPORT_REASONS = [
  "Spam",
  "Hate speech",
  "Harassment or bullying",
  "Nudity or sexual content",
  "Violence",
  "False information",
  "Scam or fraud",
  "Intellectual property",
  "Self-harm",
  "Something else",
] as const;

/** Reasons that push a report case to high/critical severity. */
export const SENSITIVE_REPORT_REASONS = ["Self-harm", "Violence", "Nudity or sexual content", "Hate speech"];

/** Review state of a report case (all reports on one cast or one user). */
export enum ReportStatus {
  open = "open",
  reviewing = "reviewing",
  actioned = "actioned",
  dismissed = "dismissed",
}

export enum ReportSeverity {
  low = "low",
  medium = "medium",
  high = "high",
  critical = "critical",
}

export enum ReportCaseModel {
  casts = "Casts",
  users = "Users",
}

/** The moderation decision a user is appealing. */
export enum AppealAction {
  suspension = "suspension",
  ban = "ban",
  cast_removal = "cast_removal",
}

export enum AppealStatus {
  pending = "pending",
  upheld = "upheld",
  overturned = "overturned",
}

export enum VerificationStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export const VERIFICATION_CATEGORIES = ["Creator", "Public figure", "Brand", "Journalist", "Organisation"] as const;

/** Suspensions last this long unless the admin picks another length. */
export const DEFAULT_SUSPENSION_DAYS = 7;
export const MAX_SUSPENSION_DAYS = 365;

/**
 * Suspension length from an admin request: whole days 1-365, default 7.
 * Returns null when `days` is given but invalid.
 */
export function suspensionDays(days: unknown): number | null {
  if (days === undefined || days === null || days === "") return DEFAULT_SUSPENSION_DAYS;
  const n = Number(days);
  return Number.isInteger(n) && n >= 1 && n <= MAX_SUSPENSION_DAYS ? n : null;
}

/** The $set/$unset for User when its accountStatus changes: only suspensions carry an end date. */
export function suspensionUpdate(status: string, days: number = DEFAULT_SUSPENSION_DAYS) {
  return status === "suspended"
    ? { $set: { suspendedUntil: new Date(Date.now() + days * 864e5) } }
    : { $unset: { suspendedUntil: 1 } };
}
