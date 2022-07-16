var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { tinycolor } from "../../libs/@tinycolor";
import { createColorSwatch } from "./createColorSwatch";
export function createColorPalette(_a) {
    var primary = _a.primary, secondary = _a.secondary, _b = _a.warning, warning = _b === void 0 ? 'orange' : _b, _c = _a.error, error = _c === void 0 ? 'red' : _c, _d = _a.success, success = _d === void 0 ? 'green' : _d, _e = _a.info, info = _e === void 0 ? 'blue' : _e, _f = _a.tint, tint = _f === void 0 ? 75 : _f, rest = __rest(_a, ["primary", "secondary", "warning", "error", "success", "info", "tint"]);
    var custom = Object.keys(rest || {}).reduce(function (acc, key) {
        var colour = rest[key];
        acc[key] = createColorSwatch(tinycolor(colour).toHex8String());
        return acc;
    }, {});
    return __assign({ primary: createColorSwatch(primary), secondary: createColorSwatch(secondary), warning: createColorSwatch(tinycolor(primary).mix(warning, tint).toHex8String()), error: createColorSwatch(tinycolor(primary).mix(error, tint).toHex8String()), success: createColorSwatch(tinycolor(primary).mix(success, tint).toHex8String()), info: createColorSwatch(tinycolor(primary).mix(info, tint).toHex8String()) }, custom);
}
;
