<script>
	import { PlayIcon, PauseIcon } from 'svelte-feather-icons';
	let playing = false;

	export let audioSource;

	function togglePlayback() {
		playing = !playing;
	}
</script>

<div class="flex flex-row gap-4">
	<button class="bg-mirage-300 p-2 rounded-xl" on:click={togglePlayback}>
		{#if playing}
			<PauseIcon class="text-mirage-700" size="25" />
		{:else}
			<PlayIcon class="text-mirage-700" size="25" />
		{/if}
	</button>
	<p>Player</p>
	<audio controls src={audioSource}></audio>
</div>
