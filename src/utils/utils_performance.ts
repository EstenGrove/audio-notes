/**
 * Debounce fn() that adds delay to fn() invocation
 * - Clears timeout ID in case timeout was already called
 * - Then sets a new timeout ID to the current setTimeout call & invokes cb()
 * @param {Function} callback - A callback fn() to be invoked after 'wait' time
 * @param {Number} wait - A numeric wait time in milliseconds (ms)
 * @returns {Function} - Returns a fn() that is immediately invoked
 */
const debounce = (callback: Function, wait: number): Function => {
	let timeoutID: ReturnType<typeof setTimeout>;
	return (...args: any) => {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(() => {
			callback(...args);
		}, wait);
	};
};

export { debounce };
