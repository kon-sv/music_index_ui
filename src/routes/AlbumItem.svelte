<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let album;

	const dispatch = createEventDispatcher();

	// let url = 'http://127.0.0.1:8337/album//art';

	onMount(() => {
		if (album) {
			// url = `http://127.0.0.1:8337/album/${album.id}/art`;
		}
	});
</script>

<button
	class="relative min-h-40 min-w-40 max-w-40 bg-mirage-100 text-mirage-950 border border-gray-400 p-1 rounded-md hover:bg-mirage-300 transition"
	on:click={() => dispatch('albumClicked', album)}
>
	<div class="absolute h-full w-full opacity-0 bg-red-400 top-0 left-0 rounded-md z-0"></div>
	<div class="z-10 relative">
		<p class="z-10">{album.album}</p>
		<div class="mt-5">{album.albumartist}</div>
	</div>
</button>
