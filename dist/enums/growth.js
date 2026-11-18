"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BADGE_THRESHOLDS = exports.AUDIENCE_SEGMENT_LABELS = exports.AudienceSegment = exports.BannerTone = exports.PushPlatform = exports.PushCampaignStatus = void 0;
exports.audienceUserFilter = audienceUserFilter;
exports.badgeLevelFor = badgeLevelFor;
// enums/growth.ts
// Admin console "Growth" block: push campaigns, banners, audience segments, badge config.
const badge_1 = require("./badge");
var PushCampaignStatus;
(function (PushCampaignStatus) {
    PushCampaignStatus["draft"] = "draft";
    PushCampaignStatus["scheduled"] = "scheduled";
    PushCampaignStatus["sending"] = "sending";
    PushCampaignStatus["sent"] = "sent";
    PushCampaignStatus["failed"] = "failed";
})(PushCampaignStatus || (exports.PushCampaignStatus = PushCampaignStatus = {}));
var PushPlatform;
(function (PushPlatform) {
    PushPlatform["all"] = "all";
    PushPlatform["android"] = "android";
    PushPlatform["ios"] = "ios";
})(PushPlatform || (exports.PushPlatform = PushPlatform = {}));
var BannerTone;
(function (BannerTone) {
    BannerTone["promo"] = "promo";
    BannerTone["info"] = "info";
    BannerTone["success"] = "success";
    BannerTone["warning"] = "warning";
})(BannerTone || (exports.BannerTone = BannerTone = {}));
/**
 * Who a push campaign or banner is for. Only segments we can answer from stored
 * user data are listed (no app-version or country segments: we don't store those).
 */
var AudienceSegment;
(function (AudienceSegment) {
    AudienceSegment["all_users"] = "all_users";
    AudienceSegment["inactive_14d"] = "inactive_14d";
    AudienceSegment["new_7d"] = "new_7d";
    AudienceSegment["badge_base_supporter"] = "badge_base_supporter";
    AudienceSegment["badge_influencer_plus"] = "badge_influencer_plus";
    AudienceSegment["verified_creators"] = "verified_creators";
    AudienceSegment["ttp_not_configured"] = "ttp_not_configured";
})(AudienceSegment || (exports.AudienceSegment = AudienceSegment = {}));
exports.AUDIENCE_SEGMENT_LABELS = {
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
function audienceUserFilter(segment, now = new Date()) {
    const base = { accountStatus: { $in: ["active", "shadow_banned", null] } };
    switch (segment) {
        case AudienceSegment.inactive_14d:
            return { ...base, lastActive: { $lt: new Date(now.getTime() - 14 * DAY) } };
        case AudienceSegment.new_7d:
            return { ...base, date_created: { $gte: new Date(now.getTime() - 7 * DAY) } };
        case AudienceSegment.badge_base_supporter:
            return { ...base, "badge.level": { $in: [badge_1.BadgeLevels.base, badge_1.BadgeLevels.supporter, null] } };
        case AudienceSegment.badge_influencer_plus:
            return {
                ...base,
                "badge.level": { $in: [badge_1.BadgeLevels.influencer, badge_1.BadgeLevels.ambassador, badge_1.BadgeLevels.changeMaker] },
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
exports.DEFAULT_BADGE_THRESHOLDS = {
    [badge_1.BadgeLevels.base]: badge_1.BadgePoints.base,
    [badge_1.BadgeLevels.supporter]: badge_1.BadgePoints.supporter,
    [badge_1.BadgeLevels.contributor]: badge_1.BadgePoints.contributor,
    [badge_1.BadgeLevels.initiator]: badge_1.BadgePoints.initiator,
    [badge_1.BadgeLevels.builder]: badge_1.BadgePoints.builder,
    [badge_1.BadgeLevels.influencer]: badge_1.BadgePoints.influencer,
    [badge_1.BadgeLevels.ambassador]: badge_1.BadgePoints.ambassador,
    [badge_1.BadgeLevels.changeMaker]: badge_1.BadgePoints.changeMaker,
};
/** Highest level whose threshold `points` reaches. */
function badgeLevelFor(points, thresholds = exports.DEFAULT_BADGE_THRESHOLDS) {
    const levels = Object.values(badge_1.BadgeLevels);
    let level = badge_1.BadgeLevels.base;
    for (const l of levels)
        if ((points ?? 0) >= (thresholds[l] ?? Infinity))
            level = l;
    return level;
}
