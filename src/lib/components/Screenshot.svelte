<script>
	import { fade } from 'svelte/transition';
	import ImageSkeleton from './ImageSkeleton.svelte';

	/** @type {boolean}*/
	export let loading;

	/** @type {import('../../routes/$types').ActionData}*/
	export let form;
</script>

<div
	class="flex-col gap-2 justify-center text-center max-w-xl w-[300px] h-[225px] sm:w-[576px] sm:h-[360px]"
>
	{#if form?.imageURL}
		<p class="text-zinc-900 text-xl" in:fade={{ delay: 350 }} out:fade={{ duration: 200 }}>
			🎉 Screenshot Uploaded!
		</p>
		<img
			src={form?.imageURL}
			alt={`Screenshot of ${form?.pageURL}`}
			class="rounded-lg shadow-lg mt-4 w-full"
			in:fade={{ delay: 350 }}
			out:fade={{ duration: 200 }}
		/>
	{:else if form?.error}
		<p class="text-zinc-900 text-lg">🤔 Something went wrong</p>
		<p class="text-zinc-900 font-semibold py-4 text-lg">{form?.error}</p>
		<p class="text-zinc-800 text-sm">
			Make sure to provide the full URL starting with <span class="italic">https://</span>
		</p>
	{:else}
		<ImageSkeleton {loading} />
	{/if}
</div>
