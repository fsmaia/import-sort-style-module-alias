# import-sort-style-module

A style for [import-sort](https://github.com/renke/import-sort) that is focused
on modules. It intents to receive additional configuration to support relative aliases whitelist (for example, to use with Webpack). So far it isn't possible to receive configuration (**help wanted**), and for now it just has a common set of React aliases, as following:
- "actions/"
- "components/"
- "constants/"
- "containers/"
- "layouts/"
- "middlewares/"
- "reducers/"
- "selectors/"
- "services/"
- "style/"
- "stores/"
- "utils/"

```js
// Absolute modules with side effects (not sorted because order may matter)
import "a";
import "c";
import "b";

// Relative modules with side effects (not sorted because order may matter)
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

// First-party modules sorted by "relative depth" and then by name
import aaa from "../../aaa";
import bbb from "../../bbb";
import aaaa from "../aaaa";
import bbbb from "../bbbb";
import aaaaa from "./aaaaa";
import bbbbb from "./bbbbb";
```
