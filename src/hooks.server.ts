import { handler } from '$lib/api/app';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.split('/')[1] === 'api') {
		return await handler(event.request);
	}

	return await resolve(event);
};
