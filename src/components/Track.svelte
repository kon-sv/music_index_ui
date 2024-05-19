<script>
	export let track;

	function handleMouseOver() {}
	function handleMouseOut() {}
</script>

<div class="flex flex-row" on:mouseover={handleMouseOver} on:mouseout={handleMouseOut}>
	<div class="mr-4">{track.track}.</div>
	<div>{track.title}</div>
</div>
