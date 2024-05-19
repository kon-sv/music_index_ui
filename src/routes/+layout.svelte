<script>
	import '../app.css';
</script>

<div class="h-screen">
	<div class="container mx-auto">
		<div class="">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.mirage.950);
		background-color: theme(colors.mirage.100);
	}
</style>
