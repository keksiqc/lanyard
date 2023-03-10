# @prequist/lanyard

Lanyard API wrapper & TypeScript definitions

## Installation

```bash
npm i @prequist/lanyard
```

## Usage

```ts
import { get } from "@prequist/lanyard";

const data = await get(snowflake);

data.active_on_discord_mobile; // boolean
```

## TypeScript

All types are exported, and can be found in [`./src/types.ts`](./src/types.ts).

```ts
import type { Types } from "@prequist/lanyard";

// Example
export function isOnline(presence: Types.Presence) {
	return presence === "online" || presence === "idle";
}
```
