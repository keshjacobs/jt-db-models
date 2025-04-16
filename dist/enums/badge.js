"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgePoints = exports.BadgeLevels = void 0;
var BadgeLevels;
(function (BadgeLevels) {
    BadgeLevels["base"] = "base";
    BadgeLevels["supporter"] = "supporter";
    BadgeLevels["contributor"] = "contributor";
    BadgeLevels["initiator"] = "initiator";
    BadgeLevels["builder"] = "builder";
    BadgeLevels["influencer"] = "influencer";
    BadgeLevels["ambassador"] = "ambassador";
    BadgeLevels["changeMaker"] = "changeMaker";
})(BadgeLevels || (exports.BadgeLevels = BadgeLevels = {}));
var BadgePoints;
(function (BadgePoints) {
    BadgePoints[BadgePoints["base"] = 0] = "base";
    BadgePoints[BadgePoints["supporter"] = 10] = "supporter";
    BadgePoints[BadgePoints["contributor"] = 30] = "contributor";
    BadgePoints[BadgePoints["initiator"] = 60] = "initiator";
    BadgePoints[BadgePoints["builder"] = 100] = "builder";
    BadgePoints[BadgePoints["influencer"] = 150] = "influencer";
    BadgePoints[BadgePoints["ambassador"] = 210] = "ambassador";
    BadgePoints[BadgePoints["changeMaker"] = 280] = "changeMaker";
})(BadgePoints || (exports.BadgePoints = BadgePoints = {}));
