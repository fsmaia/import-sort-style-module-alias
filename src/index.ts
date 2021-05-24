import { IStyleAPI, IStyleItem } from 'import-sort-style';

export interface Options {
  overrideBuiltinModules: boolean;
}

export default (styleApi: IStyleAPI, file: string): IStyleItem[] => {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isNodeModule,
    isAbsoluteModule,
    isInstalledModule,
    isRelativeModule,
    moduleName,
    naturally,
    not,
    or,
    unicode,
  } = styleApi;

  const isExternalModule = or(isNodeModule, isInstalledModule(file));

  return [
    // import "foo"
    {
      match: and(hasNoMember, isAbsoluteModule, isExternalModule),
    },
    { separator: true },

    // import "{relativeAlias}/foo"
    { match: and(hasNoMember, isAbsoluteModule, not(isExternalModule)) },
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
      match: and(isAbsoluteModule, isInstalledModule(file)),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import … from "{relativeAlias}/foo";
    {
      match: and(isAbsoluteModule, not(isExternalModule)),
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
