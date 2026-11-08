"use strict";
// enums/admin.ts
// Data-level enums for the admin console. The role -> permission map
// (who can do what) lives in jt-commons, next to the guard that enforces it.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTargetType = exports.ChatRoomStatus = exports.CastModerationStatus = exports.AccountStatus = exports.ADMIN_ROLES = exports.UserRoles = void 0;
/** Account role. Everyone signs up as `user`; admins are promoted by a super_admin. */
var UserRoles;
(function (UserRoles) {
    UserRoles["user"] = "user";
    UserRoles["admin"] = "admin";
    UserRoles["super_admin"] = "super_admin";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
/** Roles allowed into the admin console at all. */
exports.ADMIN_ROLES = [UserRoles.admin, UserRoles.super_admin];
/** Moderation state of an account (separate from the legacy numeric `status`). */
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["active"] = "active";
    AccountStatus["suspended"] = "suspended";
    AccountStatus["banned"] = "banned";
    AccountStatus["shadow_banned"] = "shadow_banned";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
/** Moderation state of a cast. Hidden/removed casts are kept out of feeds. */
var CastModerationStatus;
(function (CastModerationStatus) {
    CastModerationStatus["live"] = "live";
    CastModerationStatus["hidden"] = "hidden";
    CastModerationStatus["removed"] = "removed";
})(CastModerationStatus || (exports.CastModerationStatus = CastModerationStatus = {}));
var ChatRoomStatus;
(function (ChatRoomStatus) {
    ChatRoomStatus["active"] = "active";
    ChatRoomStatus["dissolved"] = "dissolved";
})(ChatRoomStatus || (exports.ChatRoomStatus = ChatRoomStatus = {}));
/** What an admin action was performed on. Free to extend (e.g. "report", "banner"). */
var AdminTargetType;
(function (AdminTargetType) {
    AdminTargetType["user"] = "user";
    AdminTargetType["cast"] = "cast";
    AdminTargetType["chat"] = "chat";
    AdminTargetType["podcast"] = "podcast";
    AdminTargetType["config"] = "config";
    AdminTargetType["flag"] = "flag";
    AdminTargetType["admin"] = "admin";
    AdminTargetType["report"] = "report";
    AdminTargetType["notification"] = "notification";
    AdminTargetType["badge"] = "badge";
    AdminTargetType["banner"] = "banner";
})(AdminTargetType || (exports.AdminTargetType = AdminTargetType = {}));
