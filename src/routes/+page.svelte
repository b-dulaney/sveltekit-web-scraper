<script>
	import Form from '$lib/components/Form.svelte';
	let pageSuccess = false;
	let pageHeader = '';

	/**
	 * @param {CustomEvent<{success: boolean, message: string}>} event
	 */
	function handleResponse(event) {
		pageSuccess = event.detail.success;
		pageHeader = event.detail.message;
	}
</script>

<div class="flex justify-center items-center min-h-svh min-w-full px-2">
	<div class="rounded-lg px-4 bg-slate-50 shadow-lg min-h-80">
		<div class="flex flex-col items-center gap-8 py-8">
			<h1 class="text-zinc-900 text-center font-extrabold text-2xl sm:text-3xl tracking-tight">
				SvelteKit Web Scraper
			</h1>
			<p class="text-zinc-800 text-center text-lg sm:text-xl max-w-xl">
				Enter a valid URL to retrieve the page's {'<h1>'} element using SvelteKit API routes and Puppeteer
				🤠
			</p>
			<Form on:response={handleResponse} />
			<div class="flex-col gap-2 text-center max-w-xl">
				{#if pageSuccess}
					<p class="text-zinc-900 text-xl">🎉 H1 tag retrieved!</p>
					<p class="text-zinc-900 font-semibold pt-4 text-lg sm:text-xl">{pageHeader}</p>
				{:else if pageHeader === 'Not found'}
					<p class="text-zinc-900 text-xl">🤔 This page is missing a {'<h1>'} element</p>
				{:else if !pageSuccess && pageHeader}
					<p class="text-zinc-900 text-lg">🤔 Something went wrong</p>
					<p class="text-zinc-900 font-semibold py-4 text-lg">{pageHeader}</p>
					<p class="text-zinc-800 text-sm">
						Make sure to provide the full URL starting with <span class="italic">https://</span>
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
