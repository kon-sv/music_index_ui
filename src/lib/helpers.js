let timer;

export function debounce() {

	return new Promise((resolve) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			resolve()
		}, 750);
	});
}
