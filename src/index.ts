import {IStyleAPI, IStyleItem} from "import-sort-style";

import {IImport} from "import-sort-parser";

function hasDotSegment(imported: IImport): boolean {
  return imported.moduleName.indexOf('.') === 0;
}

function hasNotDotSegment(imported: IImport): boolean {
  return !hasDotSegment(imported);
}

function isRelativeModule(imported: IImport): boolean {
  const aliases = [".", "actions/", "components/", "constants/", "containers/", "layouts/", "middlewares/", "reducers/", "selectors/", "services/", "style/", "stores/", "utils/"];

  for (let alias of aliases) {
    if (imported.moduleName.indexOf(alias) === 0) {
      return true;
    }
  }

  return false;
}

function isAbsoluteModule(imported: IImport): boolean {
  return !isRelativeModule(imported);
}

export default function(styleApi: IStyleAPI): Array<IStyleItem> {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isNodeModule,
    moduleName,
    naturally,
    unicode,
  } = styleApi;

  return [
    // import … from "fs";
    {match: isNodeModule, sort: moduleName(naturally), sortNamedMembers: alias(unicode)},
    {separator: true},
    
    // import "foo"
    {match: and(hasNoMember, isAbsoluteModule)},
    {separator: true},

    // import "{relativeAlias}/foo"
    {match: and(hasNoMember, isRelativeModule, hasNotDotSegment)},
    {separator: true},

    // import "./foo"
    {match: and(hasNoMember, isRelativeModule, hasDotSegment)},
    {separator: true},

    // import … from "foo";
    {match: isAbsoluteModule, sort: moduleName(naturally), sortNamedMembers: alias(unicode)},
    {separator: true},

    // import … from "{relativeAlias}/foo";
    {match: and(isRelativeModule, hasNotDotSegment), sort: moduleName(naturally), sortNamedMembers: alias(unicode)},
    {separator: true},

    // import … from "./foo";
    // import … from "../foo";
    {match: and(isRelativeModule, hasDotSegment), sort: [dotSegmentCount, moduleName(naturally)], sortNamedMembers: alias(unicode)},
    {separator: true},
  ];
}
