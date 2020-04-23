import { IImport } from 'import-sort-parser';
import { IStyleAPI, IStyleItem } from 'import-sort-style';

export interface Options {
  alias: string[];
  overrideBuiltinModules: boolean;
}

const hasAlias = (aliases: string[]) => (imported: IImport): boolean =>
  aliases.some(
    (alias: string): boolean =>
      imported.moduleName === alias ||
      imported.moduleName.indexOf(`${alias}/`) === 0
  );

export default (
  styleApi: IStyleAPI,
  _file?: string,
  { alias: aliases = [], overrideBuiltinModules = true } = {} as Options
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

  const isAliasModule = hasAlias(aliases || []);

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
      match: overrideBuiltinModules
        ? and(isNodeModule, not(isAliasModule))
        : isNodeModule,
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
