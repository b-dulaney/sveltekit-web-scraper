<script>
	import '../app.css';
</script>

<div class="min-h-svh grid gap-4 grid-rows-1 bg-gradient-to-b from-orange-500 to-red-600">
	<slot />
	<footer>
		<div class="flex flex-col sm:flex-row justify-center gap-4 items-center p-4 bg-zinc-900">
			<p class="text-zinc-100 text-sm sm:text-lg">🤠 SvelteKit Web Scraper Demo</p>
			<p class="text-zinc-100 text-sm">
				<a
					href="https://github.com/b-dulaney"
					target="_blank"
					rel="noopener noreferrer"
					class="text-zinc-100 font-semibold hover:text-zinc-50"
				>
					@b-dulaney
				</a>
			</p>
			<p class="text-zinc-100 text-sm">
				<a
					href="https://github.com/b-dulaney/sveltekit-web-scraper"
					target="_blank"
					rel="noopener noreferrer"
					class="text-zinc-100 font-semibold hover:text-zinc-50"
				>
					GitHub Repo
				</a>
			</p>
		</div>
	</footer>
</div>
