import { useEffect, useRef, useState } from "react";

// webm, wav, mp3 etc
const AUDIO_TYPE = "audio/webm";

const useAudioRecorder = ({ audioType = AUDIO_TYPE, getDataCallback }) => {
	const mediaRecorder = useRef();
	const [stream, setStream] = useState(null); // media stream
	const [audioData, setAudioData] = useState({
		type: audioType,
		size: null,
		src: null,
	}); // metaData & blob URL
	const [audioBlob, setAudioBlob] = useState(null); // blob URL
	const [audioChunks, setAudioChunks] = useState([]); // encoded chunks of audio
	const [hasPermission, setHasPermission] = useState(false);
	//   'idle', 'recording', 'paused'
	const [recordingStatus, setRecordingStatus] = useState("idle");

	// asks for mic permission, creates MediaStream & sets state(s)
	const getPermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setStream(streamData);
				return setHasPermission(true);
			} catch (error) {
				return alert(error.message);
			}
		}
	};

	// asks permission & starts recording immediately after
	const getPermissionAndRecord = async () => {
		if ("MediaRecorder" in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setStream(streamData);
				setHasPermission(true);
				return await startRecording(streamData);
			} catch (error) {
				return alert(error.message);
			}
		}
	};

	// starts recording
	const startRecording = async (streamData = null) => {
		setRecordingStatus("recording");
		// check if 'stream' state has been set otherwise use newly created 'streamData' from...
		// fn() that called 'startRecording()'
		const currentStream = stream === null ? streamData : stream;
		// new Recorder
		const media = new MediaRecorder(currentStream, { type: audioType });
		mediaRecorder.current = media;
		mediaRecorder.current.start();
		let localChunks = [];
		mediaRecorder.current.ondataavailable = (e) => {
			if (typeof e.data === "undefined") return;
			if (e.data.size === 0) return;
			localChunks.push(e.data);
		};
		setAudioChunks(localChunks);
	};
	// stops recording & sets audio state(s)
	const stopRecording = async () => {
		setRecordingStatus("idle");
		mediaRecorder.current.stop();
		mediaRecorder.current.onstop = () => {
			const audio = new Blob(audioChunks, { type: audioType });
			const audioUrl = URL.createObjectURL(audio);
			setAudioBlob(audioUrl);
			setAudioData({
				type: audio.type, // mimeType
				size: audio.size, // bytes
				src: audioUrl, // blob url
			});
			setAudioChunks([]);
			if (getDataCallback) return getDataCallback(audioUrl);
		};
	};

	// check for existing audio permissions onMount
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		navigator.permissions.query({ name: "microphone" }).then((perms) => {
			const isReady = perms.state === "granted" ? true : false;
			setHasPermission(isReady);
		});

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		// states
		hasPermission,
		stream, // media stream
		audioData, // metaData & blob url wrapped into object
		audioBlob, // audio blob url
		audioChunks, // encoded audio data
		mediaRecorder, // MediaRecorder interface
		recordingStatus,
		// fn handlers
		getPermissionAndRecord,
		getPermission,
		startRecording,
		stopRecording,
	};
};

export { useAudioRecorder };
