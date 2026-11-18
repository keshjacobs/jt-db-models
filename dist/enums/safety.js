"use strict";
// enums/safety.ts
// Admin console "Safety" block: reports, appeals, verification requests.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_SUSPENSION_DAYS = exports.DEFAULT_SUSPENSION_DAYS = exports.VERIFICATION_CATEGORIES = exports.VerificationStatus = exports.AppealStatus = exports.AppealAction = exports.ReportCaseModel = exports.ReportSeverity = exports.ReportStatus = exports.SENSITIVE_REPORT_REASONS = exports.REPORT_REASONS = void 0;
exports.suspensionDays = suspensionDays;
exports.suspensionUpdate = suspensionUpdate;
/** Reasons a user can pick when reporting a cast or a user. */
exports.REPORT_REASONS = [
    "Spam",
    "Hate speech",
    "Harassment or bullying",
    "Nudity or sexual content",
    "Violence",
    "False information",
    "Scam or fraud",
    "Intellectual property",
    "Self-harm",
    "Something else",
];
/** Reasons that push a report case to high/critical severity. */
exports.SENSITIVE_REPORT_REASONS = ["Self-harm", "Violence", "Nudity or sexual content", "Hate speech"];
/** Review state of a report case (all reports on one cast or one user). */
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["open"] = "open";
    ReportStatus["reviewing"] = "reviewing";
    ReportStatus["actioned"] = "actioned";
    ReportStatus["dismissed"] = "dismissed";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
var ReportSeverity;
(function (ReportSeverity) {
    ReportSeverity["low"] = "low";
    ReportSeverity["medium"] = "medium";
    ReportSeverity["high"] = "high";
    ReportSeverity["critical"] = "critical";
})(ReportSeverity || (exports.ReportSeverity = ReportSeverity = {}));
var ReportCaseModel;
(function (ReportCaseModel) {
    ReportCaseModel["casts"] = "Casts";
    ReportCaseModel["users"] = "Users";
})(ReportCaseModel || (exports.ReportCaseModel = ReportCaseModel = {}));
/** The moderation decision a user is appealing. */
var AppealAction;
(function (AppealAction) {
    AppealAction["suspension"] = "suspension";
    AppealAction["ban"] = "ban";
    AppealAction["cast_removal"] = "cast_removal";
})(AppealAction || (exports.AppealAction = AppealAction = {}));
var AppealStatus;
(function (AppealStatus) {
    AppealStatus["pending"] = "pending";
    AppealStatus["upheld"] = "upheld";
    AppealStatus["overturned"] = "overturned";
})(AppealStatus || (exports.AppealStatus = AppealStatus = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["pending"] = "pending";
    VerificationStatus["approved"] = "approved";
    VerificationStatus["rejected"] = "rejected";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
exports.VERIFICATION_CATEGORIES = ["Creator", "Public figure", "Brand", "Journalist", "Organisation"];
/** Suspensions last this long unless the admin picks another length. */
exports.DEFAULT_SUSPENSION_DAYS = 7;
exports.MAX_SUSPENSION_DAYS = 365;
/**
 * Suspension length from an admin request: whole days 1-365, default 7.
 * Returns null when `days` is given but invalid.
 */
function suspensionDays(days) {
    if (days === undefined || days === null || days === "")
        return exports.DEFAULT_SUSPENSION_DAYS;
    const n = Number(days);
    return Number.isInteger(n) && n >= 1 && n <= exports.MAX_SUSPENSION_DAYS ? n : null;
}
/** The $set/$unset for User when its accountStatus changes: only suspensions carry an end date. */
function suspensionUpdate(status, days = exports.DEFAULT_SUSPENSION_DAYS) {
    return status === "suspended"
        ? { $set: { suspendedUntil: new Date(Date.now() + days * 864e5) } }
        : { $unset: { suspendedUntil: 1 } };
}
