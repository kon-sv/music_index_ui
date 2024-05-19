<script>
	import { albumsData } from '../store.js';
	import VirtualItems from '$lib/VirtualItems.svelte';
	import AlbumItem from './AlbumItem.svelte';
	import { onMount } from 'svelte';
</script>

<div class="hidden">
	<div class="p-5 my-10 h-40">
		<div class="h-full bg-mirage-900 text-mirage-50 pl-3">
			<VirtualItems items={$albumsData} let:item>
				<p>{item.id}</p>
			</VirtualItems>
		</div>
	</div>

	<div class="p-5 my-10 h-40">
		<div
			class="flex-wrap flex gap-4 h-full bg-mirage-900 text-mirage-50 p-3 scroll-auto overflow-scroll"
		>
			{#each $albumsData as item}
				<div
					class="min-h-40 min-w-40 max-w-40 bg-mirage-100 text-mirage-950 border border-gray-400 p-1 rounded-md"
				>
					<p>{item.id}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="h-96 overflow-y-scroll overflow-x-hidden scroll-auto">
	<div class="flex-wrap flex gap-4 justify-center scroll-auto">
		{#each $albumsData as album (album.id)}
			<AlbumItem on:albumClicked {album} />
		{/each}
	</div>
</div>

<style>
</style>
