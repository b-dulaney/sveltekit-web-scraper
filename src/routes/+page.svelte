<script>
	import Form from '$lib/components/Form.svelte';
	import Screenshot from '$lib/components/Screenshot.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;

	let loading = false;

	/**
	 * @param {CustomEvent<{loading: boolean}>} event
	 */
	function handleLoading(event) {
		// Reset form state when a new request is made
		if (form && event.detail.loading === true) {
			form.imageURL = '';
			form.invalid = false;
			form.missing = false;
			form.error = '';
		}
		loading = event.detail.loading;
	}
</script>

<div class="flex justify-center items-center min-w-full px-2">
	<div class="rounded-lg px-4 bg-slate-50 sm:w-[640px] shadow-lg min-h-80">
		<div class="flex flex-col items-center gap-8 py-8 sm:px-4">
			<h1 class="text-zinc-900 text-center font-extrabold text-2xl sm:text-3xl tracking-tight">
				SvelteKit Web Scraper
			</h1>
			<p class="text-zinc-800 text-center text-lg sm:text-xl max-w-lg">
				Enter a valid URL to take a screenshot of the page using SvelteKit form actions and
				Puppeteer 🤠
			</p>
			<Form {form} on:loadEvent={handleLoading} {loading} />
			<Screenshot {loading} {form} />
		</div>
	</div>
</div>
