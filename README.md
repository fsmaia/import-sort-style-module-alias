# import-sort-style-module-alias

A style for [import-sort](https://github.com/renke/import-sort) that is focused
on modules with relative aliases support.

## Configuration
package.json:
```json
{
    //...,
    "importSort": {
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
        "custom": {
            "alias": ["components", "modules"]
        }
    }
}
```

## Result

```js
// Third-party modules with side effects (not sorted because order may matter)
import "a";
import "c";
import "b";

// First-party alias modules with side effects (not sorted because order may matter)
import "{aliasA}";
import "{aliasC}";
import "{aliasB}";

// First-party relative modules with side effects (not sorted because order may matter)
import "./a";
import "./c";
import "./b";

// Modules from the Node.js "standard" library sorted by name
import {readFile, writeFile} from "fs";
import * as path from "path";

// Third-party modules sorted by name
import aa from "aa";
import bb from "bb";
import cc from "cc";

// First-party alias modules sorted by name
import aaa from "{aliasAAA}";
import bbb from "{aliasBBB}";

// First-party relative modules sorted by "relative depth" and then by name
import aaa from "../../aaa";
import bbb from "../../bbb";
import aaaa from "../aaaa";
import bbbb from "../bbbb";
import aaaaa from "./aaaaa";
import bbbbb from "./bbbbb";
```
