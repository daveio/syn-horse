# typescript resolution gotcha (fixed 2026-08-16, commit f557ead)

`skilld` pins `typescript` to an **exact** version (2.1.0 pinned `typescript@7.0.2`, the Go-native compiler). TypeScript 7's npm package ships a working `tsc` binary but **no JavaScript compiler API** — `require("typescript")` returns a module where `ts.TypeFlags`, `ts.createProgram` etc. are `undefined`.

Before the fix, package.json had no direct `typescript` dependency, so skilld's TS 7 became the hoisted root `node_modules/typescript`. `ts-api-utils` (peer range `typescript >=4.8.4`, satisfied by 7.x) resolved it and crashed every `bun run eslint .` and trunk eslint run at parser load: `TypeError: Cannot read properties of undefined (reading 'Intrinsic')` from `ts-api-utils/lib/index.cjs`. The `@typescript-eslint/*` packages were unaffected internally (their peer range excludes TS 7, so bun nested `typescript@6.0.3` copies for them) — the crash came only from hoisted API consumers.

## The guard

`package.json` devDependencies now declares `"typescript": "^6.0.3"`. That keeps an API-complete compiler hoisted at root for `ts-api-utils` and friends; skilld gets its own nested `typescript@7.0.2`. `bun run lint:types` (`tsc --noEmit`) consequently runs classic tsc 6, not native tsc 7.

## If this resurfaces (e.g. after a skilld or typescript-eslint bump)

1. `bun pm why typescript` — check what resolves the ROOT copy.
2. `node -e "const ts=require('typescript'); console.log(ts.version, typeof ts.TypeFlags)"` from the repo root — `TypeFlags: undefined` means an API-less native build is hoisted.
3. Keep the root `typescript` devDependency on a major that still ships the JS API and that `@typescript-eslint`'s peer range accepts.

Do not remove the root `typescript` devDependency as "unused" — nothing imports it, but it exists to win hoisting.
