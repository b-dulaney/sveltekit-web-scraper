import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import {
	BLOB_READ_WRITE_TOKEN,
	LOCAL_CHROMIUM_PATH,
	CHROMIUM_DOWNLOAD_URL
} from '$env/static/private';
import { put } from '@vercel/blob';

export async function POST({ request }) {
	const { url } = await request.json();

	const browser = await puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: dev ? LOCAL_CHROMIUM_PATH : await chromium.executablePath(CHROMIUM_DOWNLOAD_URL)
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
		return json({ success: false, message: e?.message ?? 'An unknown error occured' });
	}

	const screenshot = await page.screenshot({ type: 'webp' });
	await browser.close();

	const imageUrl = await uploadImage(screenshot, url);
	return json({ success: true, message: imageUrl });
}

/**
 * Uploads the image to vercel blob storage and returns the image url
 * @param {Buffer} buffer
 * @param {string} pageUrl
 */
async function uploadImage(buffer, pageUrl) {
	const pathName = trimUrl(pageUrl);
	const { url } = await put(`screenshots/${pathName}`, buffer, {
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN,
		contentType: 'image/webp'
	});

	return url;
}

/**
 * Trims http protocol and any trailing slashes from the url to prevent extra folder creation in vercel blob storage
 * @param {string} url
 * @returns {string}
 */
function trimUrl(url) {
	// Remove leading protocol
	let trimmedUrl = url.replace(/(^\w+:|^)\/\//, '');
	// Remove trailing slashes
	trimmedUrl = trimmedUrl.replace(/\/+$/, '');
	return trimmedUrl;
}
