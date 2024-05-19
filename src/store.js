import { writable } from "svelte/store";


export const albumsData = writable([], function(set) {
	fetch('http://127.0.0.1:8337/album')
		.then((response) => response.json())
		.then((data) => {
			set(data.albums);
		})
		.catch((error) => console.error(error));
})

export const statsData = writable({ albums: 0, items: 0 }, function(set) {
	fetch('http://127.0.0.1:8337/stats')
		.then((response) => response.json())
		.then((data) => {
			set({
				"albums": data.albums,
				"items": data.items
			});
		})
		.catch((error) => console.error(error));
}); 
