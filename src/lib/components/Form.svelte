<script>
	import { enhance, applyAction } from '$app/forms';
	import Input from './Input.svelte';
	import Button from './Button.svelte';
	let loading = false;
	
	/** @type {import('../../routes/$types').ActionData}*/
	export let form;

</script>

<form class="flex flex-col w-full sm:w-3/4 gap-2" method="POST" use:enhance={() => {
	loading = true;
	if(form){
		form.missing = false;
		form.invalid = false;
	}
	return async ({result}) => {
		loading = false;
		await applyAction(result)
	}
}}>
	<div class="flex justify-center w-full items-center gap-2">
		<Input form={form}/>
		<Button loading={loading}/>
	</div>
	{#if form?.missing}<p class="text-red-500">URL is required</p>{/if}
	{#if form?.invalid}<p class="text-red-500 text-center">Invalid URL format. Make sure you include HTTP protocol <span class="italic">(https://example.com)</span></p>{/if}
</form>
