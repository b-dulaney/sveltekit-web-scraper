<script>
	import Form from '$lib/components/Form.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<div class="flex justify-center items-center min-w-full px-2">
	<div class="rounded-lg px-4 bg-slate-50 shadow-lg min-h-80">
		<div class="flex flex-col items-center gap-8 py-8 sm:px-4">
			<h1 class="text-zinc-900 text-center font-extrabold text-2xl sm:text-3xl tracking-tight">
				SvelteKit Web Scraper
			</h1>
			<p class="text-zinc-800 text-center text-lg sm:text-xl max-w-lg">
				Enter a valid URL to take a screenshot of the page using SvelteKit form actions and
				Puppeteer 🤠
			</p>
			<Form {form} />
			<div class="flex-col gap-2 text-center max-w-xl">
				{#if form?.success}
					<p class="text-zinc-900 text-xl">🎉 Screenshot Taken!</p>
					<img
						src={form?.imageURL}
						alt={`Screenshot of ${form?.pageURL}`}
						class="rounded-lg shadow-lg mt-4"
					/>
				{:else if form?.error}
					<p class="text-zinc-900 text-lg">🤔 Something went wrong</p>
					<p class="text-zinc-900 font-semibold py-4 text-lg">{form?.error}</p>
					<p class="text-zinc-800 text-sm">
						Make sure to provide the full URL starting with <span class="italic">https://</span>
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
