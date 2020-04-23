import { IStyleAPI, IStyleItem } from 'import-sort-style';

import { IImport } from 'import-sort-parser';

export interface Options {
  alias: string[];
}

const hasAlias = (aliases: string[]) => (imported: IImport): boolean =>
  aliases.some(
    (alias: string): boolean => imported.moduleName.indexOf(alias) === 0
  );

export default (
  styleApi: IStyleAPI,
  _file?: string,
  options?: Options
): IStyleItem[] => {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isNodeModule,
    isAbsoluteModule,
    isRelativeModule,
    moduleName,
    naturally,
    not,
    unicode,
  } = styleApi;

  const isAliasModule = hasAlias((options && options.alias) || []);

  return [
    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule, not(isAliasModule)) },
    { separator: true },

    // import "{relativeAlias}/foo"
    { match: and(hasNoMember, isAbsoluteModule, isAliasModule) },
    { separator: true },

    // import "./foo"
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import … from "fs";
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import … from "foo";
    {
      match: and(isAbsoluteModule, not(isAliasModule)),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import … from "{relativeAlias}/foo";
    {
      match: and(isAbsoluteModule, isAliasModule),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import … from "./foo";
    // import … from "../foo";
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },
  ];
};
