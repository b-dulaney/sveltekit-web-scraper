<script>
	/** @type {string}*/
	export let value;
</script>

<label class="relative block">
	<span class="sr-only">Search</span>
	<span class="absolute inset-y-0 left-0 flex items-center pl-2">
		<svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
			<path
				fill-rule="evenodd"
				d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
				clip-rule="evenodd"
			></path>
		</svg>
	</span>
	<input
		bind:value
		class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-pink-500 focus:ring-pink-500 focus:ring-1 sm:text-sm"
		placeholder="https://example.com"
		type="text"
		name="search"
	/>
</label>
