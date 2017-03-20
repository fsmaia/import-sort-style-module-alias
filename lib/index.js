"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasDotSegment(imported) {
    return imported.moduleName.indexOf('.') === 0;
}
function hasNotDotSegment(imported) {
    return !hasDotSegment(imported);
}
function isRelativeModule(imported) {
    var aliases = [".", "actions/", "components/", "constants/", "containers/", "layouts/", "middlewares/", "reducers/", "selectors/", "style/", "stores/", "utils/"];
    for (var _i = 0, aliases_1 = aliases; _i < aliases_1.length; _i++) {
        var alias = aliases_1[_i];
        if (imported.moduleName.indexOf(alias) === 0) {
            return true;
        }
    }
    return false;
}
function isAbsoluteModule(imported) {
    return !isRelativeModule(imported);
}
function default_1(styleApi) {
    var alias = styleApi.alias, and = styleApi.and, dotSegmentCount = styleApi.dotSegmentCount, hasNoMember = styleApi.hasNoMember, isNodeModule = styleApi.isNodeModule, moduleName = styleApi.moduleName, naturally = styleApi.naturally, unicode = styleApi.unicode;
    return [
        // import … from "fs";
        { match: isNodeModule, sort: moduleName(naturally), sortNamedMembers: alias(unicode) },
        { separator: true },
        // import "foo"
        { match: and(hasNoMember, isAbsoluteModule) },
        { separator: true },
        // import "{relativeAlias}/foo"
        { match: and(hasNoMember, isRelativeModule, hasNotDotSegment) },
        { separator: true },
        // import "./foo"
        { match: and(hasNoMember, isRelativeModule, hasDotSegment) },
        { separator: true },
        // import … from "foo";
        { match: isAbsoluteModule, sort: moduleName(naturally), sortNamedMembers: alias(unicode) },
        { separator: true },
        // import … from "{relativeAlias}/foo";
        { match: and(isRelativeModule, hasNotDotSegment), sort: moduleName(naturally), sortNamedMembers: alias(unicode) },
        { separator: true },
        // import … from "./foo";
        // import … from "../foo";
        { match: and(isRelativeModule, hasDotSegment), sort: [dotSegmentCount, moduleName(naturally)], sortNamedMembers: alias(unicode) },
        { separator: true },
    ];
}
exports.default = default_1;
