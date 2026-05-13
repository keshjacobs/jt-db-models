// enums/activity.ts
export enum ActivityType {
  // Auth
  LOGIN = "login",
  LOGOUT = "logout",
  SIGNUP = "signup",
  PASSWORD_RESET_REQUEST = "password_reset_request",
  PASSWORD_RESET_COMPLETE = "password_reset_complete",
  EMAIL_VERIFY = "email_verify",

  // Profile
  PROFILE_UPDATE = "profile_update",
  PHOTO_UPDATE = "photo_update",
  PUSHTOKEN_UPDATE = "pushtoken_update",

  // Casts (timeline)
  CAST_UPLOAD = "cast_upload",
  CAST_DELETE = "cast_delete",
  CAST_LIKE = "cast_like",
  CAST_UNLIKE = "cast_unlike",
  CAST_RECAST = "cast_recast",
  CAST_REPLY = "cast_reply",
  CAST_LISTEN = "cast_listen",
  CAST_SAVE = "cast_save",
  CAST_UNSAVE = "cast_unsave",
  CAST_BLACKLIST = "cast_blacklist",
  CAST_REPORT = "cast_report",

  // Podcasts
  PODCAST_ALBUM_CREATE = "podcast_album_create",
  PODCAST_UPLOAD = "podcast_upload",

  // Social graph
  SUBSCRIBE = "subscribe",
  UNSUBSCRIBE = "unsubscribe",
  USER_BLOCK = "user_block",
  USER_UNBLOCK = "user_unblock",
  USER_REPORT = "user_report",

  // Chat
  CHAT_REQUEST_SENT = "chat_request_sent",
  CHAT_REQUEST_ACCEPTED = "chat_request_accepted",
  CHAT_REQUEST_REJECTED = "chat_request_rejected",
  MESSAGE_SENT = "message_sent",
  MESSAGE_PLAYED = "message_played",

  // Badge / wallet
  BADGE_CLICK = "badge_click",

  // Generic presence
  APP_OPEN = "app_open",
  HEARTBEAT = "heartbeat", // used by middleware; not written to the log
}

// The "subject" of the action, when it has one. Keeps refPath happy.
export enum ActivityTargetModel {
  Casts = "Casts",
  Users = "Users",
  Messages = "Messages",
  Chats = "Chats",
  PodcastAlbums = "PodcastAlbums",
  ChatRequests = "ChatRequests",
}
