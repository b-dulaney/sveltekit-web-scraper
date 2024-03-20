import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { del, list } from '@vercel/blob';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request }) {
	const authHeader = request.headers.get('authorization');
	if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { blobs } = await list({ prefix: 'screenshots/' });
	const blobsToDelete = blobs.map(({ url }) => url);

	await del(blobsToDelete);
	console.log(`Deleted ${blobsToDelete.length} screenshots`);
	return json({ success: true });
}
