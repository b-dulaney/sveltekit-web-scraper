import { fail } from '@sveltejs/kit';

/**
 * @typedef WebScraperResponse
 * @type {object}
 * @property {boolean} success
 * @property {string|undefined} imageURL
 * @property {string|undefined} error
 */

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const pageURL = data.get('pageURL')?.toString();

		if (!pageURL) {
			return fail(400, { pageURL, missing: true });
		}

		// Return a 400 if the url provided is not valid (e.g. missing protocol, invalid characters, etc.)
		try {
			new URL(pageURL);
		} catch (e) {
			return fail(400, { pageURL, invalid: true });
		}

		const response = await fetch('/api/web-scraper', {
			method: 'POST',
			body: JSON.stringify({ url: pageURL })
		});

		/** @type {WebScraperResponse} */
		const { success, imageURL, error } = await response.json();

		return { success, imageURL, error, pageURL };
	}
};
