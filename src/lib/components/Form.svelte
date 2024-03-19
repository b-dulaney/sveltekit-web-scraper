<script>
	import { enhance, applyAction } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import Input from './Input.svelte';
	import Button from './Button.svelte';

	/** @type {boolean} */
	export let loading;
	/** @type {import('../../routes/$types').ActionData}*/
	export let form;

	const dispatch = createEventDispatcher();
</script>

<form
	class="flex flex-col w-full sm:w-3/4 gap-2 h-20"
	method="POST"
	use:enhance={() => {
		dispatch('loadEvent', { loading: true });
		return async ({ result }) => {
			await applyAction(result);
			dispatch('loadEvent', { loading: false });
		};
	}}
>
	<div class="flex justify-center w-full items-center gap-2">
		<Input {form} />
		<Button {loading} />
	</div>
	{#if form?.missing}<p class="text-red-500">URL is required</p>{/if}
	{#if form?.invalid}<p class="text-red-500 text-left">
			Invalid URL format. Make sure you include HTTP protocol <span class="italic"
				>(https://example.com)</span
			>
		</p>{/if}
</form>
