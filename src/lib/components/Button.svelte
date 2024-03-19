<script>
	import CircleSpinner from './CircleSpinner.svelte';

	/** @type {boolean}*/
	export let loading;

</script>

{#if loading}
	<button
		type="submit"
		disabled
		class="inline-flex min-w-24 max-h-10 items-center px-4 py-2 font-semibold leading-6 shadow rounded-md text-neutral-50 bg-pink-500 hover:bg-pink-400 transition ease-in-out duration-150 cursor-not-allowed"
	>
		<CircleSpinner />
		Go
	</button>
{:else}
	<button
		type="submit"
		on:click
		class="infline-flex min-w-24 max-h-10 items-center bg-pink-500 font-semibold shadow px-4 py-2 rounded-md hover:bg-pink-400 hover:ring-1 hover:ring-offset-1 hover:ring-pink-200 text-neutral-50"
	>
		Go
	</button>
{/if}
