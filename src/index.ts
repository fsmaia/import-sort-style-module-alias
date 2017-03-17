import {IStyleAPI, IStyleItem} from "import-sort-style";
import {IImport} from "import-sort-parser";

function isRelativeModule(imported: IImport): boolean {
  const aliases = [".", "actions/", "components/", "constants/", "containers/", "layouts/", "middlewares/", "reducers/", "selectors/", "style/", "stores/", "utils/"];

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
    // import "foo"
    {match: and(hasNoMember, isAbsoluteModule)},
    {separator: true},

    // import "./foo"
    {match: and(hasNoMember, isRelativeModule)},
    {separator: true},

    // import … from "fs";
    {match: isNodeModule, sort: moduleName(naturally), sortNamedMembers: alias(unicode)},
    {separator: true},

    // import … from "foo";
    {match: isAbsoluteModule, sort: moduleName(naturally), sortNamedMembers: alias(unicode)},
    {separator: true},

    // import … from "./foo";
    // import … from "../foo";
    {match: isRelativeModule, sort: [dotSegmentCount, moduleName(naturally)], sortNamedMembers: alias(unicode)},
    {separator: true},
  ];
}
