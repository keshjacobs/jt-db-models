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
  // Sent by the admin console: warnings and takedowns.
  moderation = "moderation",
}
