<script>
	import Form from '$lib/components/Form.svelte';
	let pageSuccess = false;
	let imageUrl = '';

	/**
	 * @param {CustomEvent<{success: boolean, message: string}>} event
	 */
	function handleResponse(event) {
		pageSuccess = event.detail.success;
		imageUrl = event.detail.message;
	}
</script>

<div class="flex justify-center items-center min-w-full px-2">
	<div class="rounded-lg px-4 bg-slate-50 shadow-lg min-h-80">
		<div class="flex flex-col items-center gap-8 py-8 sm:px-4">
			<h1 class="text-zinc-900 text-center font-extrabold text-2xl sm:text-3xl tracking-tight">
				SvelteKit Web Scraper
			</h1>
			<p class="text-zinc-800 text-center text-lg sm:text-xl max-w-xl">
				Enter a valid URL to take a screenshot of the page using SvelteKit API routes and Puppeteer
				🤠
			</p>
			<Form on:response={handleResponse} />
			<div class="flex-col gap-2 text-center max-w-xl">
				{#if pageSuccess}
					<p class="text-zinc-900 text-xl">🎉 Screenshot Taken!</p>
					<img src={imageUrl} alt={`Screenshot of ${imageUrl}`} class="rounded-lg shadow-lg pt-4" />
				{:else if !pageSuccess && imageUrl}
					<p class="text-zinc-900 text-lg">🤔 Something went wrong</p>
					<p class="text-zinc-900 font-semibold py-4 text-lg">{imageUrl}</p>
					<p class="text-zinc-800 text-sm">
						Make sure to provide the full URL starting with <span class="italic">https://</span>
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
