"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityTargetModel = exports.ActivityType = void 0;
// enums/activity.ts
var ActivityType;
(function (ActivityType) {
    // Auth
    ActivityType["LOGIN"] = "login";
    ActivityType["LOGOUT"] = "logout";
    ActivityType["SIGNUP"] = "signup";
    ActivityType["PASSWORD_RESET_REQUEST"] = "password_reset_request";
    ActivityType["PASSWORD_RESET_COMPLETE"] = "password_reset_complete";
    ActivityType["EMAIL_VERIFY"] = "email_verify";
    // Profile
    ActivityType["PROFILE_UPDATE"] = "profile_update";
    ActivityType["PHOTO_UPDATE"] = "photo_update";
    ActivityType["PUSHTOKEN_UPDATE"] = "pushtoken_update";
    // Casts (timeline)
    ActivityType["CAST_UPLOAD"] = "cast_upload";
    ActivityType["CAST_DELETE"] = "cast_delete";
    ActivityType["CAST_LIKE"] = "cast_like";
    ActivityType["CAST_UNLIKE"] = "cast_unlike";
    ActivityType["CAST_RECAST"] = "cast_recast";
    ActivityType["CAST_REPLY"] = "cast_reply";
    ActivityType["CAST_LISTEN"] = "cast_listen";
    ActivityType["CAST_SAVE"] = "cast_save";
    ActivityType["CAST_UNSAVE"] = "cast_unsave";
    ActivityType["CAST_BLACKLIST"] = "cast_blacklist";
    ActivityType["CAST_REPORT"] = "cast_report";
    // Podcasts
    ActivityType["PODCAST_ALBUM_CREATE"] = "podcast_album_create";
    ActivityType["PODCAST_UPLOAD"] = "podcast_upload";
    // Social graph
    ActivityType["SUBSCRIBE"] = "subscribe";
    ActivityType["UNSUBSCRIBE"] = "unsubscribe";
    ActivityType["USER_BLOCK"] = "user_block";
    ActivityType["USER_UNBLOCK"] = "user_unblock";
    ActivityType["USER_REPORT"] = "user_report";
    // Chat
    ActivityType["CHAT_REQUEST_SENT"] = "chat_request_sent";
    ActivityType["CHAT_REQUEST_ACCEPTED"] = "chat_request_accepted";
    ActivityType["CHAT_REQUEST_REJECTED"] = "chat_request_rejected";
    ActivityType["MESSAGE_SENT"] = "message_sent";
    ActivityType["MESSAGE_PLAYED"] = "message_played";
    // Badge / wallet
    ActivityType["BADGE_CLICK"] = "badge_click";
    // Generic presence
    ActivityType["APP_OPEN"] = "app_open";
    ActivityType["HEARTBEAT"] = "heartbeat";
})(ActivityType || (exports.ActivityType = ActivityType = {}));
// The "subject" of the action, when it has one. Keeps refPath happy.
var ActivityTargetModel;
(function (ActivityTargetModel) {
    ActivityTargetModel["Casts"] = "Casts";
    ActivityTargetModel["Users"] = "Users";
    ActivityTargetModel["Messages"] = "Messages";
    ActivityTargetModel["Chats"] = "Chats";
    ActivityTargetModel["PodcastAlbums"] = "PodcastAlbums";
    ActivityTargetModel["ChatRequests"] = "ChatRequests";
})(ActivityTargetModel || (exports.ActivityTargetModel = ActivityTargetModel = {}));
