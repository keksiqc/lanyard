export namespace API {
	/**
	 * A successful API response
	 */
	export type SuccessfulAPIResponse<T> = {
		success: true;
		data: T;
	};

	/**
	 * An errored API response
	 */
	export type ErroredAPIResponse = {
		success: false;
		error: { message: string; code: string };
	};

	/**
	 * Either a successful or errored API response
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
	 * A Discord snowflake
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
		spotify: Spotify | null;
		kv: Record<string, string>;
		listening_to_spotify: boolean;
		discord_user: DiscordUser;
		discord_status: DiscordStatus;
		activities: Activity[];
		active_on_discord_web: boolean;
		active_on_discord_mobile: boolean;
		active_on_discord_desktop: boolean;
		active_on_discord_embedded: boolean;
	}

	/**
	 * Information about a user listening to Spotify
	 */
	export interface Spotify {
		track_id: string | null;
		timestamps: Timestamps;
		song: string;
		artist: string | null;
		album_art_url: string | null;
		album: string | null;
	}

	/**
	 * Timestamps for a Spotify song
	 */
	export interface Timestamps {
		start: number;
		end: number;
	}

	/**
	 * Information about a Discord user, which is explicitly different to presence
	 */
	export interface DiscordUser {
		username: string;
		public_flags: number;
		id: Snowflake;
		/**
		 * @deprecated Use {@link global_name user.global_name} instead.
		 */
		display_name: string | null;
		global_name: string | null;
		discriminator: string;
		bot: boolean;
		avatar_decoration_data: {
			asset: string;
			sku_id: bigint;
		} | null;
		avatar: string | null;
		/**
		 * @deprecated Use {@link primary_guild user.primary_guild} instead.
		 */
		clan?: Clan;
		primary_guild?: Clan;
		collectibles?: unknown;
	}

	/**
	 * Information about a Discord clan
	 */
	export interface Clan {
		tag: string;
		identity_guild_id: string;
		badge: string;
		identity_enabled: boolean;
	}

	/**
	 * Information about a Discord activity
	 */
	export interface Activity {
		type: number;
		state: string;
		name: string;
		id: string;
		emoji?: Emoji;
		created_at: number;
		timestamps?: Timestamps;
		sync_id?: string;
		session_id?: string;
		party?: Party;
		flags?: number;
		details?: string;
		assets?: Assets;
		application_id?: Snowflake;
	}

	/**
	 * Information about a Discord emoji
	 */
	export interface Emoji {
		name: string;
		id: Snowflake;
		animated: boolean;
	}

	/**
	 * Information about a Discord party
	 */
	export interface Party {
		size?: [min: number, max: number];
		id: string;
	}

	/**
	 * Information about a Discord activity's assets
	 */
	export interface Assets {
		small_text?: string;
		small_image?: string;
		large_text?: string;
		large_image?: string;
	}
}
