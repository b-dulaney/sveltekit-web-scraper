<script>
	import Input from './Input.svelte';
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let url = '';
	let loading = false;

	/**
	 * @param {SubmitEvent|MouseEvent} event
	 */
	async function handleSubmit(event) {
		event.preventDefault();
		loading = true;
		const response = await fetch('/api/web-scraper', {
			method: 'POST',
			body: JSON.stringify({ url })
		});
		const { success, message } = await response.json();
		loading = false;
		dispatch('response', {
			success,
			message
		});
	}
</script>

<form class="flex justify-center min-w-full gap-2" on:submit={handleSubmit}>
	<Input bind:value={url} />
	<Button disabled={!url} {loading} on:click={handleSubmit} />
</form>
