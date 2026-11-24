export enum NotificationEvents {
  like = "like",
  recast = "recast",
  reply = "reply",
  subscription = "subscription",
  mention = "mention",
  chatRequest = "chatRequest",
  chat = "chat",
  repliesMention = "replies_mention",
  repliesLike = "replies_like",
  // Someone gifted wallet points to the user's cast.
  gift = "gift",
  // Sent by the admin console: warnings and takedowns.
  moderation = "moderation",
}
