// enums/growth.ts
// Admin console "Growth" block: push campaigns, banners, audience segments, badge config.
import { BadgeLevels, BadgePoints } from "./badge";

export enum PushCampaignStatus {
  draft = "draft",
  scheduled = "scheduled",
  sending = "sending",
  sent = "sent",
  failed = "failed",
}

export enum PushPlatform {
  all = "all",
  android = "android",
  ios = "ios",
}

export enum BannerTone {
  promo = "promo",
  info = "info",
  success = "success",
  warning = "warning",
}

/**
 * Who a push campaign or banner is for. Only segments we can answer from stored
 * user data are listed (no app-version or country segments: we don't store those).
 */
export enum AudienceSegment {
  all_users = "all_users",
  inactive_14d = "inactive_14d",
  new_7d = "new_7d",
  badge_base_supporter = "badge_base_supporter",
  badge_influencer_plus = "badge_influencer_plus",
  verified_creators = "verified_creators",
  ttp_not_configured = "ttp_not_configured",
}

export const AUDIENCE_SEGMENT_LABELS: Record<AudienceSegment, string> = {
  [AudienceSegment.all_users]: "All users",
  [AudienceSegment.inactive_14d]: "Inactive 14+ days",
  [AudienceSegment.new_7d]: "New users (last 7 days)",
  [AudienceSegment.badge_base_supporter]: "Badge: base & supporter",
  [AudienceSegment.badge_influencer_plus]: "Badge: influencer+",
  [AudienceSegment.verified_creators]: "Verified creators",
  [AudienceSegment.ttp_not_configured]: "TTP not configured",
};

const DAY = 864e5;

/**
 * Mongo filter on the Users collection for a segment. Always excludes suspended/banned
 * accounts. Evaluated at send/read time, so "new" and "inactive" move with the clock.
 */
export function audienceUserFilter(segment: AudienceSegment, now = new Date()): Record<string, any> {
  const base: Record<string, any> = { accountStatus: { $in: ["active", "shadow_banned", null] } };
  switch (segment) {
    case AudienceSegment.inactive_14d:
      return { ...base, lastActive: { $lt: new Date(now.getTime() - 14 * DAY) } };
    case AudienceSegment.new_7d:
      return { ...base, date_created: { $gte: new Date(now.getTime() - 7 * DAY) } };
    case AudienceSegment.badge_base_supporter:
      return { ...base, "badge.level": { $in: [BadgeLevels.base, BadgeLevels.supporter, null] } };
    case AudienceSegment.badge_influencer_plus:
      return {
        ...base,
        "badge.level": { $in: [BadgeLevels.influencer, BadgeLevels.ambassador, BadgeLevels.changeMaker] },
      };
    case AudienceSegment.verified_creators:
      return { ...base, creatorVerified: true };
    case AudienceSegment.ttp_not_configured:
      return { ...base, $or: [{ "ttp.voiceName": { $in: [null, ""] } }, { ttp: null }] };
    case AudienceSegment.all_users:
    default:
      return base;
  }
}

/** Badge points needed for each level (admin-editable copy of BadgePoints). */
export type BadgeThresholds = Record<BadgeLevels, number>;

export const DEFAULT_BADGE_THRESHOLDS: BadgeThresholds = {
  [BadgeLevels.base]: BadgePoints.base,
  [BadgeLevels.supporter]: BadgePoints.supporter,
  [BadgeLevels.contributor]: BadgePoints.contributor,
  [BadgeLevels.initiator]: BadgePoints.initiator,
  [BadgeLevels.builder]: BadgePoints.builder,
  [BadgeLevels.influencer]: BadgePoints.influencer,
  [BadgeLevels.ambassador]: BadgePoints.ambassador,
  [BadgeLevels.changeMaker]: BadgePoints.changeMaker,
};

/** Highest level whose threshold `points` reaches. */
export function badgeLevelFor(points: number, thresholds: BadgeThresholds = DEFAULT_BADGE_THRESHOLDS): BadgeLevels {
  const levels = Object.values(BadgeLevels) as BadgeLevels[];
  let level = BadgeLevels.base;
  for (const l of levels) if ((points ?? 0) >= (thresholds[l] ?? Infinity)) level = l;
  return level;
}
