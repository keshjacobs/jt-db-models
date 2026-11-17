/** Reasons a user can pick when reporting a cast or a user. */
export declare const REPORT_REASONS: readonly ["Spam", "Hate speech", "Harassment or bullying", "Nudity or sexual content", "Violence", "False information", "Scam or fraud", "Intellectual property", "Self-harm", "Something else"];
/** Reasons that push a report case to high/critical severity. */
export declare const SENSITIVE_REPORT_REASONS: string[];
/** Review state of a report case (all reports on one cast or one user). */
export declare enum ReportStatus {
    open = "open",
    reviewing = "reviewing",
    actioned = "actioned",
    dismissed = "dismissed"
}
export declare enum ReportSeverity {
    low = "low",
    medium = "medium",
    high = "high",
    critical = "critical"
}
export declare enum ReportCaseModel {
    casts = "Casts",
    users = "Users"
}
/** The moderation decision a user is appealing. */
export declare enum AppealAction {
    suspension = "suspension",
    ban = "ban",
    cast_removal = "cast_removal"
}
export declare enum AppealStatus {
    pending = "pending",
    upheld = "upheld",
    overturned = "overturned"
}
export declare enum VerificationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export declare const VERIFICATION_CATEGORIES: readonly ["Creator", "Public figure", "Brand", "Journalist", "Organisation"];
/** Suspensions last this long unless the admin picks another length. */
export declare const DEFAULT_SUSPENSION_DAYS = 7;
export declare const MAX_SUSPENSION_DAYS = 365;
/**
 * Suspension length from an admin request: whole days 1-365, default 7.
 * Returns null when `days` is given but invalid.
 */
export declare function suspensionDays(days: unknown): number | null;
/** The $set/$unset for User when its accountStatus changes: only suspensions carry an end date. */
export declare function suspensionUpdate(status: string, days?: number): {
    $set: {
        suspendedUntil: Date;
    };
    $unset?: undefined;
} | {
    $unset: {
        suspendedUntil: number;
    };
    $set?: undefined;
};
