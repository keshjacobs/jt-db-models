"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY_MODERATION_STATUS = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const admin_1 = require("../enums/admin");
const CastSchema = new mongoose_1.Schema({
    t_id: { type: String },
    title: { type: String },
    cast: { type: String },
    streams: { type: Number, default: 0 },
    music: { type: String },
    ratings: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    date_created: { type: Date, default: Date.now },
    no_likes: { type: Number, default: 0 },
    no_replies: { type: Number, default: 0 },
    no_recasts: { type: Number, default: 0 },
    no_listeners: { type: Number, default: 0 },
    filter: {
        name: { type: String, default: "normal" },
        gain: { type: Number, default: 2 },
        type: { type: String, default: "lowshelf" },
        frequency: { type: Number, default: 3150 },
        detune: { type: Number, default: 0 },
        pitch: { type: Number, default: 1 },
    },
    recast: { type: mongoose_1.Schema.Types.ObjectId, ref: "Casts" },
    reply: { type: mongoose_1.Schema.Types.ObjectId, ref: "Casts" },
    caster: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    recaster: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    isPodcast: { type: Boolean, default: false },
    podcastAlbum: { type: mongoose_1.Schema.Types.ObjectId, ref: "PodcastAlbums" },
    isSaved: { type: Boolean, default: false },
    mentions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Users", default: [] }],
    // Anonymous cast: caster is hidden from viewers; paid reach is tracked in AnonymousCastTrackers
    isAnonymous: { type: Boolean, default: false, index: true },
    // Admin moderation. Existing docs have no value, which counts as "live".
    moderationStatus: {
        type: String,
        enum: Object.values(admin_1.CastModerationStatus),
        default: admin_1.CastModerationStatus.live,
        index: true,
    },
    moderationReason: { type: String },
    moderatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    moderatedAt: { type: Date },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});
// Add index to optimize lookups
CastSchema.index({ createdAt: 1 });
/* ------------------------------------------------------------------
 * Keep hidden/removed casts out of every feed, list and search.
 *
 * Applies to find(), countDocuments() and aggregate() on Casts, so the
 * timeline, explore, profile and search queries all respect moderation
 * without each one needing its own filter.
 *
 * It deliberately does NOT apply when:
 *  - the query targets specific _ids (findById, populate, $in lookups),
 *    so existing references to a moderated cast don't turn into nulls;
 *  - the query already filters on moderationStatus. Admin code uses this
 *    as the opt-out: `{ moderationStatus: ANY_MODERATION_STATUS }`.
 * ------------------------------------------------------------------ */
const HIDDEN_FROM_FEEDS = [
    admin_1.CastModerationStatus.hidden,
    admin_1.CastModerationStatus.removed,
];
/** Pass as `moderationStatus` in a filter to see casts in every state (admin only). */
exports.ANY_MODERATION_STATUS = {
    $in: [...Object.values(admin_1.CastModerationStatus), null],
};
const skipsModerationFilter = (filter) => !!filter &&
    (Object.prototype.hasOwnProperty.call(filter, "_id") ||
        Object.prototype.hasOwnProperty.call(filter, "moderationStatus"));
CastSchema.pre(["find", "countDocuments"], function () {
    if (skipsModerationFilter(this.getFilter()))
        return;
    this.where({ moderationStatus: { $nin: HIDDEN_FROM_FEEDS } });
});
CastSchema.pre("aggregate", function () {
    const pipeline = this.pipeline();
    const first = pipeline[0];
    if (first?.$match && skipsModerationFilter(first.$match))
        return;
    const stage = { $match: { moderationStatus: { $nin: HIDDEN_FROM_FEEDS } } };
    // These stages must stay first in the pipeline.
    if (first && (first.$geoNear || first.$search || first.$searchMeta || first.$vectorSearch)) {
        pipeline.splice(1, 0, stage);
    }
    else {
        pipeline.unshift(stage);
    }
});
CastSchema.set("toJSON", { virtuals: true });
const Cast = mongoose_1.default.model("Casts", CastSchema);
exports.default = Cast;
