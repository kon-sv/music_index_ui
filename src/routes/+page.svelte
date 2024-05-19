<script>
	import { albumsData, statsData } from '../store';

	import { ListIcon, GridIcon } from 'svelte-feather-icons';
	import './albums.svelte';
	import Albums from './albums.svelte';
	import Stats from '../components/Stats.svelte';
	import Player from '../components/Player.svelte';
	import debounce from 'lodash.debounce';

	import MusicBrainzLogo from '$lib/assets/MusicBrainzLogo.svg';

	let selectedAlbum;
	let selectedAlbumDetails;
	let selectedAlbumArtUrl;
	let searchQuery = '';

	let selectedTrack;

	let audioSource;
	$: if (selectedTrack) {
		audioSource = `http://127.0.0.1:8337/item/${selectedTrack.id}/file`;
	}

	$: connected = $albumsData.length > 0;
	$: albumLayout = 'grid';

	$: {
		fetchAlbumDetails(selectedAlbum);
	}

	function changeAlbumLayout() {
		albumLayout = albumLayout === 'grid' ? 'list' : 'grid';
	}

	function fetchAlbumDetails(selectedAlbum) {
		if (selectedAlbum) {
			fetch(`http://127.0.0.1:8337/album/${selectedAlbum.id}?expand`)
				.then((response) => response.json())
				.then((data) => {
					selectedAlbumDetails = data;
					selectedAlbumArtUrl = `http://127.0.0.1:8337/album/${selectedAlbum.id}/art`;
				})
				.catch((error) => console.error(error));
		}
	}

	const handleSearchQueryInput = debounce((/** @type {{ target: { value: string; }; }} */ e) => {
		searchQuery = e.target.value;

		if (searchQuery.length == 0) {
			fetch('http://127.0.0.1:8337/album')
				.then((response) => response.json())
				.then((data) => {
					albumsData.set(data.albums);
				})
				.catch((error) => console.error(error));
		} else {
			fetch(`http://127.0.0.1:8337/album/query/${searchQuery}`)
				.then((response) => response.json())
				.then((data) => {
					albumsData.set(data.results);
				})
				.catch((error) => console.error(error));
		}
	}, 200);

	/**
	 * @param {any} event
	 */
	function handleAlbumClick(event) {
		console.log(event.detail);
		selectedAlbum = event.detail;
	}

	function handleTrackSelection(event, track) {
		console.log(track);
		selectedTrack = track;
	}
</script>

<div class="flex flex-col gap-4 mt-4 text-base">
	<!-- <div -->
	<!-- 	class="bg-gradient-to-r from-mirage-500 to-mirage-700 border-0 rounded-md text-mirage-900 p-5" -->
	<!-- > -->
	<!-- <div class="bg-mirage-200 p-5 rounded-md border-2 border-mirage-300"> -->

	<h1 class="text-2xl">Beet Music Library</h1>

	<div class="card">
		<h1>Test Components</h1>
	</div>

	<div class="columns-3">
		<div class="card h-full">
			<div class="flex flex-row gap-1">
				<input
					on:change={(e) => handleSearchQueryInput(e)}
					placeholder="Search.."
					class="border-gray-400 border rounded-md pl-2"
				/>
				<div class="ml-auto mr-0">Results: {$albumsData.length}</div>
			</div>
		</div>
		<div class="card h-full flex flex-row items-center gap-1">
			<span>Sort</span>
			<select class="border-gray-400 border rounded-md pl-2">
				<option>Album Name</option>
				<option>Album Artist</option>
				<option>ID</option>
			</select>
			<button class="float-right ml-auto mr-0" on:click={changeAlbumLayout}>
				{#if albumLayout === 'grid'}
					<GridIcon class="mirage-950 text-mirage-900 p-1 rounded-md bg-mirage-300" />
				{:else}
					<ListIcon class="mirage-950 text-mirage-900 p-1 rounded-md bg-mirage-300" />
				{/if}
			</button>
		</div>

		<div class="card">
			{#if connected}
				<div class="flex flex-row items-center gap-1">
					<div class="bg-green-500 w-2 h-2 min-h-1 rounded-xl"></div>
					<div>Connected</div>
					<Stats items={$statsData?.items} albums={$statsData?.albums} />
				</div>
			{:else}
				<div class="flex flex-row items-center gap-1">
					<div class="bg-red-500 w-2 h-2 min-h-1 rounded-xl"></div>
					<div>Disconnected</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="card">
		<Albums on:albumClicked={handleAlbumClick} />
	</div>

	{#if selectedAlbumDetails}
		<div class="card transition smooth-height-transition">
			<div class="flex flex-row gap-1">
				<h1 class="text-xl font-bold text-mirage-800">
					{selectedAlbum.album}
				</h1>
			</div>
			<div class="mt-5 flex gap-2">
				<div class="p-4 w-1/3 border rounded-md border-gray-400 flex flex-col">
					<div>{selectedAlbum.albumartist}</div>
					<div>{selectedAlbum.albumstatus}</div>
					<div>
						<a
							class="text-mirage-800"
							href={`https://musicbrainz.org/release-group/` + selectedAlbum.mb_releasegroupid}
							>{selectedAlbum.mb_releasegroupid}</a
						>
					</div>

					<div>{selectedAlbum.year}</div>
				</div>
				<div class="p-4 w-1/3">
					<div>Tracks</div>
					<div>
						<!-- <img widsrc={MusicBrainzLogo} /> -->
						{#each selectedAlbumDetails.items as track}
							<button class="flex flex-row" on:click={(e) => handleTrackSelection(e, track)}>
								<div class="mr-4">{track.track}.</div>
								<div>{track.title}</div>
							</button>
						{/each}
					</div>
				</div>

				<div class="w-1/3">
					<img class="rounded-xl" alt="album art" src={selectedAlbumArtUrl} />
				</div>
			</div>
		</div>
	{/if}
</div>

<div class="mt-10 mb-10 p-4 rounded border border-gray-400 border-l-4 border-l-mirage-600">
	<Player {audioSource} />
</div>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
