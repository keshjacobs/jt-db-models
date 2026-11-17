import { BadgeLevels } from "./badge";
export declare enum PushCampaignStatus {
    draft = "draft",
    scheduled = "scheduled",
    sending = "sending",
    sent = "sent",
    failed = "failed"
}
export declare enum PushPlatform {
    all = "all",
    android = "android",
    ios = "ios"
}
export declare enum BannerTone {
    promo = "promo",
    info = "info",
    success = "success",
    warning = "warning"
}
/**
 * Who a push campaign or banner is for. Only segments we can answer from stored
 * user data are listed (no app-version or country segments: we don't store those).
 */
export declare enum AudienceSegment {
    all_users = "all_users",
    inactive_14d = "inactive_14d",
    new_7d = "new_7d",
    badge_base_supporter = "badge_base_supporter",
    badge_influencer_plus = "badge_influencer_plus",
    verified_creators = "verified_creators",
    ttp_not_configured = "ttp_not_configured"
}
export declare const AUDIENCE_SEGMENT_LABELS: Record<AudienceSegment, string>;
/**
 * Mongo filter on the Users collection for a segment. Always excludes suspended/banned
 * accounts. Evaluated at send/read time, so "new" and "inactive" move with the clock.
 */
export declare function audienceUserFilter(segment: AudienceSegment, now?: Date): Record<string, any>;
/** Badge points needed for each level (admin-editable copy of BadgePoints). */
export type BadgeThresholds = Record<BadgeLevels, number>;
export declare const DEFAULT_BADGE_THRESHOLDS: BadgeThresholds;
/** Highest level whose threshold `points` reaches. */
export declare function badgeLevelFor(points: number, thresholds?: BadgeThresholds): BadgeLevels;
