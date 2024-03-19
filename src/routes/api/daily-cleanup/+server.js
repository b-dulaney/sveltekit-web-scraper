import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { del, list } from '@vercel/blob';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request }) {
	const authHeader = request.headers.get('authorization');
	if (!CRON_SECRET || authHeader !== CRON_SECRET) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const blobs = await list({ prefix: 'screenshots/' });
	blobs.blobs.forEach(async (blob) => {
		await del(blob.url);
	});

	return json({ success: true });
}
