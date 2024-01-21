import { arrayBuffer } from "stream/consumers";
import { saveFile } from "./utils_files.ts";

/**
 * TYPES:
 */

type Base64 = string;

const saveAudioToFile = async (
	audioBlob: Blob,
	fileName: string = "NewAudio.webm"
) => {
	return saveFile(audioBlob, fileName);
};

// gets audiobuffer from blob url
// Usage: const data = await getAudioBufferFromBlob(someBlob)
const getAudioBufferFromBlob = async (
	blob: string | URL | Request
): Promise<AudioBuffer> => {
	try {
		const audioCtx = new AudioContext();
		const src = await fetch(blob);
		const arrayBuffer = await src.arrayBuffer();
		const buffer = await audioCtx.decodeAudioData(arrayBuffer as ArrayBuffer);
		return buffer;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

// converts a blob URL (eg. URL.createObjectURL() to a generic blob)
const blobUrlToBlob = async (blobUrl: URL): Promise<Blob> => {
	try {
		const req = await fetch(blobUrl);
		const blob = await req.blob();
		return blob;
	} catch (error) {
		console.log("ERROR Occurred:", error);
		return error.message;
	}
};

// converts a blob URL to array buffer
// Usage: const buffer = await blobToArrayBuffer(someBlob);
// Checks for 'arrayBuffer' method on blob object & uses that if available...
// Otherwise falls back to FileReader() API
const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
	if ("arrayBuffer" in blob) return blob.arrayBuffer();

	return new Promise<ArrayBuffer>((resolve, reject): void => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as ArrayBuffer);
		reader.onerror = (e) => reject(e);
		reader.readAsArrayBuffer(blob);
	});
};

const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer): Base64 => {
	var binary = "";
	var bytes = new Uint8Array(arrayBuffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
};

const blobToBase64 = (blob: Blob): Promise<Base64> => {
	return new Promise((resolve, _) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as Base64);
		reader.readAsDataURL(blob);
	});
};

const base64ToBlob = async (base64: string | URL | Request) => {
	try {
		const req = await fetch(base64);
		const blob = await req.blob();
		return blob;
	} catch (error) {
		console.log("ERROR Occurred:", error);
		return error.message;
	}
};

const calculateTime = (seconds: number) => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
	const time = `${mins}:${formattedSecs}`;
	return time;
};

const secondsToTime = (secs: string | number) => {
	const mins = Math.floor(secs / 60);
	const remainSecs = secs - mins * 60;
	const timeSecs =
		remainSecs < 10 ? `${mins}:0${remainSecs}` : `${mins}:${remainSecs}`;
	return timeSecs;
};

// AUDIO PLAYBACK UTILS //

const createAudioContext = () => {
	// fallback support for safari
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	const audioCtx = new AudioContext();

	return audioCtx;
};

/**
 * Creates a ready-to-play audio instance.
 * @param {ObjectURL|FilePath|AudioBuffer} audioSrc - A ready-to-play audio source.
 * @returns {Object} - Returns an object with the 'AudioContext', 'Audio' instance & 'MediaElementSource' node.
 */
const createAudioPlayer = (audioSrc: string | undefined) => {
	const audioCtx = new AudioContext();
	const audio = new Audio(audioSrc);

	// attach audio file to an AudioNode
	const source = audioCtx.createMediaElementSource(audio);
	// connect to output (speakers, by default)
	source.connect(audioCtx.destination);

	return {
		audio,
		audioCtx,
		source,
	};
};

// MISC COPY-PASTA //
const convertBase64 = (dataURI: string) => {
	let BASE64_MARKER = ";base64,";
	let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	let base64 = dataURI.substring(base64Index);
	let raw = window.atob(base64);
	let rawLength = raw.length;
	let arr = new Uint8Array(new ArrayBuffer(rawLength));

	for (let i = 0; i < rawLength; i++) {
		arr[i] = raw.charCodeAt(i);
	}
	return arr;
};

// converts blobURL to arrayBuffer, then to base64 encoded string
const processAudioIntoBase64 = async (blobUrl: Blob) => {
	const arrayBuffer = await blobToArrayBuffer(blobUrl);
	const base64 = arrayBufferToBase64(arrayBuffer);

	return base64;
};

const getNewBlob = (dataURI: any) => {
	const binary = convertBase64(dataURI);
	const blob = new Blob([binary], { type: "audio/webm" });
	const url = URL.createObjectURL(blob);

	return url;
};

export {
	getAudioBufferFromBlob,
	blobToArrayBuffer,
	blobUrlToBlob,
	blobToBase64,
	base64ToBlob,
	processAudioIntoBase64,
};

export { secondsToTime, calculateTime };

export { createAudioContext, createAudioPlayer };

export { saveAudioToFile };

export { getNewBlob };
