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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
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
    mentions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Users", default: [] }],
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});
// Add index to optimize lookups
CastSchema.index({ createdAt: 1 });
CastSchema.set("toJSON", { virtuals: true });
const Cast = mongoose_1.default.model("Casts", CastSchema);
exports.default = Cast;
