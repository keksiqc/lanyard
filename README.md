# @keksiqc/lanyard

Lanyard TypeScript definitions & minimal HTTP API wrapper

## Installation

```bash
bun i @keksiqc/lanyard
```

## Usage

```ts
import { get } from '@keksiqc/lanyard';

const data = await get(snowflake);

data.active_on_discord_mobile; // boolean
```

## TypeScript

All types are exported, and can be found in [`./src/types.ts`](./src/types.ts).

```ts
import type { Types } from '@keksiqc/lanyard';

// Example
export function isOnline(presence: Types.Presence) {
	return presence === 'online' || presence === 'idle';
}
```
