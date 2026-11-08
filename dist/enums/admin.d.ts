/** Account role. Everyone signs up as `user`; admins are promoted by a super_admin. */
export declare enum UserRoles {
    user = "user",
    admin = "admin",
    super_admin = "super_admin"
}
/** Roles allowed into the admin console at all. */
export declare const ADMIN_ROLES: UserRoles[];
/** Moderation state of an account (separate from the legacy numeric `status`). */
export declare enum AccountStatus {
    active = "active",
    suspended = "suspended",
    banned = "banned",
    shadow_banned = "shadow_banned"
}
/** Moderation state of a cast. Hidden/removed casts are kept out of feeds. */
export declare enum CastModerationStatus {
    live = "live",
    hidden = "hidden",
    removed = "removed"
}
export declare enum ChatRoomStatus {
    active = "active",
    dissolved = "dissolved"
}
/** What an admin action was performed on. Free to extend (e.g. "report", "banner"). */
export declare enum AdminTargetType {
    user = "user",
    cast = "cast",
    chat = "chat",
    podcast = "podcast",
    config = "config",
    flag = "flag",
    admin = "admin",
    report = "report",
    notification = "notification",
    badge = "badge",
    banner = "banner"
}
