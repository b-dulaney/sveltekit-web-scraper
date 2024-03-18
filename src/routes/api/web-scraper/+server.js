import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import { LOCAL_CHROMIUM_PATH } from '$env/static/private';

export async function POST({ request }) {
	const { url } = await request.json();

	const browser = await puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: dev
			? LOCAL_CHROMIUM_PATH
			: await chromium.executablePath(
					'https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar'
				)
	});

	const page = await browser.newPage();
	page.setDefaultNavigationTimeout(60 * 1000);

	try {
		const response = await page.goto(url);
		if (response && !response.ok) {
			await browser.close();
			return json({ success: false, message: response.statusText() });
		}
	} catch (/** @type {any}*/ e) {
		await browser.close();
		return json({ success: false, message: e?.message });
	}

	try {
		const headingElement = await page.waitForSelector('h1', { timeout: 5000 });
		const heading = await headingElement?.evaluate((el) => el.textContent);

		await browser.close();
		return json({ success: true, message: heading });
	} catch (e) {
		await browser.close();
		return json({ success: false, message: 'Not found' });
	}
}
