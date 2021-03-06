# import-sort-style-module-alias

![NPM version](https://img.shields.io/npm/v/import-sort-style-module-alias)
![Build](https://img.shields.io/github/workflow/status/fsmaia/import-sort-style-module-alias/release/master)
![NPM bundle size](https://img.shields.io/bundlephobia/min/import-sort-style-module-alias)
![NPM downloads/mo](https://img.shields.io/npm/dm/import-sort-style-module-alias)
![License](https://img.shields.io/npm/l/import-sort-style-module-alias)

A style for [import-sort](https://github.com/renke/import-sort) that is focused
on modules with relative modules alias support.

## Options

| Name                   | Type     | Description                                                       | Default value |
| ---------------------- | -------- | ----------------------------------------------------------------- | ------------- |
| alias                  | string[] | List of resolver aliases                                          | []            |
| overrideBuiltInModules | boolean  | Whether an alias should override a Node built-in module (e.g. fs) | true          |

## Configuration

package.json:

```json
{
  "importSort": {
    ".js, .jsx, .es6, .es": {
      "parser": "babylon",
      "style": "module-alias",
      "options": {
        "alias": ["components", "modules"],
        "overrideBuiltinModules": true
      }
    },
    ".ts, .tsx": {
      "parser": "typescript",
      "style": "module-alias",
      "options": {
        "alias": ["components", "modules"]
      }
    }
  }
}
```

or .importsortrc:

```json
{
  ".js, .jsx, .es6, .es": {
    "parser": "babylon",
    "style": "module-alias",
    "options": {
      "alias": ["components", "modules"]
    }
  },
  ".ts, .tsx": {
    "parser": "typescript",
    "style": "module-alias",
    "options": {
      "alias": ["components", "modules"]
    }
  }
}
```

## Result

```js
// Third-party modules with side effects (not sorted because order may matter)
import 'a';
import 'c';
import 'b';

// First-party alias modules with side effects (not sorted because order may matter)
import '{aliasA}';
import '{aliasC}';
import '{aliasB}';

// First-party relative modules with side effects (not sorted because order may matter)
import './a';
import './c';
import './b';

// Modules from the Node.js "standard" library sorted by name
import { readFile, writeFile } from 'fs';
import * as path from 'path';

// Third-party modules sorted by name
import aa from 'aa';
import bb from 'bb';
import cc from 'cc';

// First-party alias modules sorted by name
import aaa from '{aliasAAA}';
import bbb from '{aliasBBB}';

// First-party relative modules sorted by "relative depth" and then by name
import aaa from '../../aaa';
import bbb from '../../bbb';
import aaaa from '../aaaa';
import bbbb from '../bbbb';
import aaaaa from './aaaaa';
import bbbbb from './bbbbb';
```
