/**
 * Namespace for API response types and helpers
 */
export namespace API {
	/**
	 * A successful API response
	 * @template T The type of the data returned
	 */
	export type SuccessfulAPIResponse<T> = {
		/** Whether the response was successful (always true) */
		success: true;
		/** The data returned by the API */
		data: T;
	};

	/**
	 * An errored API response
	 */
	export type ErroredAPIResponse = {
		/** Whether the response was successful (always false) */
		success: false;
		/** Error information */
		error: {
			/** Error message */
			message: string;
			/** Error code */
			code: string;
		};
	};

	/**
	 * Either a successful or errored API response
	 * @template T The type of the data returned if successful
	 */
	export type EitherAPIResponse<T> = SuccessfulAPIResponse<T> | ErroredAPIResponse;

	/**
	 * Checks if the response was successful
	 * @param response The response from the fetch request
	 * @param body The body of the response
	 * @returns Whether the response was successful
	 */
	export function isSuccess<T>(
		response: Response,
		body: EitherAPIResponse<T>
	): body is SuccessfulAPIResponse<T> {
		return response.ok && body.success;
	}

	/**
	 * Checks if the response was an error
	 * @param response The response from the fetch request
	 * @param body The body of the response
	 * @returns Whether the response was an error
	 */
	export function isErrored<T>(
		response: Response,
		body: EitherAPIResponse<T>
	): body is ErroredAPIResponse {
		return !isSuccess(response, body);
	}
}

/**
 * The routes that Lanyard and this library support
 */
export namespace Routes {
	export type GetPresence = API.EitherAPIResponse<Types.Presence>;
}

/**
 * The types that the API consumes and returns
 */
export namespace Types {
	/**
	 * A Discord snowflake (unique identifier for Discord entities)
	 */
	export type Snowflake = `${bigint}`;

	/**
	 * The status of a Discord user
	 */
	export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

	/**
	 * The presence of a Discord user
	 */
	export interface Presence {
		/** Spotify activity information, or null if not listening */
		spotify: Spotify | null;
		/** Custom key-value data set by the user */
		kv: Record<string, string>;
		/** Whether the user is currently listening to Spotify */
		listening_to_spotify: boolean;
		/** Discord user information */
		discord_user: DiscordUser;
		/** The user's Discord status */
		discord_status: DiscordStatus;
		/** Array of Discord activities */
		activities: Activity[];
		/** Whether the user is active on Discord web */
		active_on_discord_web: boolean;
		/** Whether the user is active on Discord mobile */
		active_on_discord_mobile: boolean;
		/** Whether the user is active on Discord desktop */
		active_on_discord_desktop: boolean;
		/** Whether the user is active on Discord embedded */
		active_on_discord_embedded: boolean;
	}

	/**
	 * Information about a user listening to Spotify
	 */
	export interface Spotify {
		/** The Spotify track ID, or null if not available */
		track_id: string | null;
		/** Timestamps for the Spotify song */
		timestamps: Timestamps;
		/** The song title */
		song: string;
		/** The artist name, or null if not available */
		artist: string | null;
		/** The album art URL, or null if not available */
		album_art_url: string | null;
		/** The album name, or null if not available */
		album: string | null;
	}

	/**
	 * Timestamps for a Spotify song
	 */
	export interface Timestamps {
		/** Start time in milliseconds since epoch */
		start: number;
		/** End time in milliseconds since epoch */
		end: number;
	}

	/**
	 * Information about a Discord user, which is explicitly different to presence
	 */
	export interface DiscordUser {
		/** The user's Discord username */
		username: string;
		/** Public flags on the user's account */
		public_flags: number;
		/** The user's unique Discord ID */
		id: Snowflake;
		/**
		 * @deprecated Use {@link global_name user.global_name} instead.
		 * The user's display name (deprecated)
		 */
		display_name: string | null;
		/** The user's global display name */
		global_name: string | null;
		/** The user's Discord discriminator (legacy, usually '0') */
		discriminator: string;
		/** Whether the user is a bot */
		bot: boolean;
		/** Avatar decoration data for the user, if any */
		avatar_decoration_data: {
			/** The asset string for the avatar decoration */
			asset: string;
			/** The SKU ID for the avatar decoration */
			sku_id: bigint;
		} | null;
		/** The user's avatar hash, or null if none */
		avatar: string | null;
		/**
		 * @deprecated Use {@link primary_guild user.primary_guild} instead.
		 * The user's clan information (deprecated)
		 */
		clan?: Clan;
		/** The user's primary guild information */
		primary_guild?: Clan;
		/** The user's collectibles, such as nameplates */
		collectibles?: Collectibles | null;
	}

	/**
	 * Information about a Discord clan
	 */
	export interface Clan {
		/** The clan's tag */
		tag: string;
		/** The guild ID associated with the clan */
		identity_guild_id: string;
		/** The badge hash for the clan */
		badge: string;
		/** Whether identity is enabled for the clan */
		identity_enabled: boolean;
	}

	/**
	 * Information about a Discord activity
	 */
	export interface Activity {
		/** The activity type (numeric Discord constant) */
		type: number;
		/** The activity state (e.g., what the user is doing) */
		state: string;
		/** The activity name */
		name: string;
		/** The activity ID */
		id: string;
		/** The emoji associated with the activity, if any */
		emoji?: Emoji;
		/** When the activity was created (ms since epoch) */
		created_at: number;
		/** Timestamps for the activity, if any */
		timestamps?: Timestamps;
		/** The sync ID for the activity, if any */
		sync_id?: string;
		/** The session ID for the activity, if any */
		session_id?: string;
		/** The party information for the activity, if any */
		party?: Party;
		/** Activity flags, if any */
		flags?: number;
		/** Details about the activity, if any */
		details?: string;
		/** Assets associated with the activity, if any */
		assets?: Assets;
		/** The application ID for the activity, if any */
		application_id?: Snowflake;
	}

	/**
	 * Information about a Discord emoji
	 */
	export interface Emoji {
		/** The emoji name */
		name: string;
		/** The emoji ID */
		id: Snowflake;
		/** Whether the emoji is animated */
		animated: boolean;
	}

	/**
	 * Information about a Discord party
	 */
	export interface Party {
		/** The party size as [min, max], if available */
		size?: [min: number, max: number];
		/** The party ID */
		id: string;
	}

	/**
	 * Information about a Discord activity's assets
	 */
	export interface Assets {
		/** Small text for the asset, if any */
		small_text?: string;
		/** Small image for the asset, if any */
		small_image?: string;
		/** Large text for the asset, if any */
		large_text?: string;
		/** Large image for the asset, if any */
		large_image?: string;
	}

	/**
	 * Information about Discord collectibles, such as nameplates.
	 */
	export interface Collectibles {
		/**
		 * The user's nameplate collectible, which gives a background to the username in the member list.
		 */
		nameplate?: NameplateCollectible;
	}

	/**
	 * The well-known nameplate palettes
	 *
	 * These were sourced from the Discord Webpack bundle.
	 */
	export enum WellKnownNameplatePalettes {
		NONE = 'none',
		CRIMSON = 'crimson',
		BERRY = 'berry',
		SKY = 'sky',
		TEAL = 'teal',
		FOREST = 'forest',
		BUBBLE_GUM = 'bubble_gum',
		VIOLET = 'violet',
		COBALT = 'cobalt',
		CLOVER = 'clover',
	}

	/**
	 * Information about a nameplate collectible.
	 */
	export interface NameplateCollectible {
		/** The i18n label for the nameplate */
		label: string;
		/** The SKU ID for the nameplate */
		sku_id: string;
		/** The asset path for the nameplate */
		asset: string;
		/** The expiration date for the nameplate, or null if it does not expire */
		expires_at: string | null;
		/** The palette name for the nameplate */
		palette: WellKnownNameplatePalettes | (string & {});
	}
}
