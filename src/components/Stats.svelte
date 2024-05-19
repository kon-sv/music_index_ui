<script>
	export let items;
	export let albums;
</script>

<div class="flex flex-row gap-2 ml-auto mr-0">
	{#if items > 0}
		<div>Items: {items}</div>
		<div>Albums: {albums}</div>
	{/if}
</div>
