"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEvents = void 0;
var NotificationEvents;
(function (NotificationEvents) {
    NotificationEvents["like"] = "like";
    NotificationEvents["recast"] = "recast";
    NotificationEvents["reply"] = "reply";
    NotificationEvents["subscription"] = "subscription";
    NotificationEvents["mention"] = "mention";
    NotificationEvents["chatRequest"] = "chatRequest";
    NotificationEvents["chat"] = "chat";
    NotificationEvents["repliesMention"] = "replies_mention";
    NotificationEvents["repliesLike"] = "replies_like";
})(NotificationEvents || (exports.NotificationEvents = NotificationEvents = {}));
