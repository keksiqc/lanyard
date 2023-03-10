import { API, type Routes, type Types } from "./types.ts";

export class LanyardHTTPError extends Error {
	constructor(
		public readonly request: Request,
		public readonly response: Response,
		public readonly body: API.ErroredAPIResponse
	) {
		super(body.error.message);
	}
}

export async function get(id: Types.Snowflake) {
	const request = new Request(`https://api.lanyard.rest/v1/users/${id}`);
	const response = await fetch(request);

	const body = (await response.json()) as Routes.GetPresence;

	if (!API.isSuccess(response, body)) {
		throw new LanyardHTTPError(request, response, body);
	}

	return body.data;
}
