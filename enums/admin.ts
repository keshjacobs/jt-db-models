// enums/admin.ts
// Data-level enums for the admin console. The role -> permission map
// (who can do what) lives in jt-commons, next to the guard that enforces it.

/** Account role. Everyone signs up as `user`; admins are promoted by a super_admin. */
export enum UserRoles {
  user = "user",
  admin = "admin",
  super_admin = "super_admin",
}

/** Roles allowed into the admin console at all. */
export const ADMIN_ROLES: UserRoles[] = [UserRoles.admin, UserRoles.super_admin];

/** Moderation state of an account (separate from the legacy numeric `status`). */
export enum AccountStatus {
  active = "active",
  suspended = "suspended",
  banned = "banned",
  shadow_banned = "shadow_banned",
}

/** Moderation state of a cast. Hidden/removed casts are kept out of feeds. */
export enum CastModerationStatus {
  live = "live",
  hidden = "hidden",
  removed = "removed",
}

export enum ChatRoomStatus {
  active = "active",
  dissolved = "dissolved",
}

/** What an admin action was performed on. Free to extend (e.g. "report", "banner"). */
export enum AdminTargetType {
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
  banner = "banner",
}
