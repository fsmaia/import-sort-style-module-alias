"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(styleApi) {
    var alias = styleApi.alias, and = styleApi.and, dotSegmentCount = styleApi.dotSegmentCount, hasNoMember = styleApi.hasNoMember, isAbsoluteModule = styleApi.isAbsoluteModule, isNodeModule = styleApi.isNodeModule, isRelativeModule = styleApi.isRelativeModule, moduleName = styleApi.moduleName, naturally = styleApi.naturally, unicode = styleApi.unicode;
    return [
        // import "foo"
        { match: and(hasNoMember, isAbsoluteModule) },
        { separator: true },
        // import "./foo"
        { match: and(hasNoMember, isRelativeModule) },
        { separator: true },
        // import … from "fs";
        { match: isNodeModule, sort: moduleName(naturally), sortNamedMembers: alias(unicode) },
        { separator: true },
        // import … from "foo";
        { match: isAbsoluteModule, sort: moduleName(naturally), sortNamedMembers: alias(unicode) },
        { separator: true },
        // import … from "./foo";
        // import … from "../foo";
        { match: isRelativeModule, sort: [dotSegmentCount, moduleName(naturally)], sortNamedMembers: alias(unicode) },
        { separator: true },
    ];
}
exports.default = default_1;
