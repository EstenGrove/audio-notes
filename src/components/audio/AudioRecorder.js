import React, { useState, useEffect, useRef } from "react";
import styles from "../../css/audio/AudioRecorder.module.scss";
import sprite from "../../assets/icons/audio.svg";
import {
	getAudioBufferFromBlob,
	secondsToTime,
} from "../../utils/utils_audio.ts";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import AudioTrack from "./AudioTrack";

const AudioElement = ({ audioSrc }) => {
	const [metaData, setMetaData] = useState({
		length: 0,
		duration: 0,
		numberOfChannels: 0,
		sampleRate: null,
	});

	useEffect(() => {
		let isMounted = true;

		const getMetaData = async () => {
			const data = await getAudioBufferFromBlob(audioSrc);
			setMetaData({
				length: data.length,
				duration: data.duration,
				numberOfChannels: data.numberOfChannels,
				sampleRate: data.sampleRate,
			});
		};

		if (isMounted) {
			getMetaData();
		}

		return () => {
			isMounted = false;
		};
	}, [audioSrc]);

	return (
		<div className={styles.AudioElement}>
			<div className={styles.AudioElement_dateCreated}>{}</div>
			<div className={styles.AudioElement_dateCreated}>
				Length:{" "}
				{metaData &&
					secondsToTime(Number.parseFloat(metaData.duration).toFixed())}{" "}
			</div>
			{/* CREATE CUSTOM AUDIO ELEMENT UI */}
			{/* <audio src={audioSrc} controls preload="metadata"></audio> */}
		</div>
	);
};

const RecordButton = ({ isDisabled = false, startRecording }) => {
	return (
		<button
			type="button"
			className={styles.RecordButton}
			disabled={isDisabled}
			onClick={startRecording}
		>
			<svg className={styles.RecordButton_icon}>
				<use xlinkHref={`${sprite}#icon-fiber_manual_record`}></use>
			</svg>
		</button>
	);
};
const StopButton = ({ isDisabled = false, stopRecording }) => {
	return (
		<button
			type="button"
			className={styles.StopButton}
			disabled={isDisabled}
			onClick={stopRecording}
		>
			<svg className={styles.StopButton_icon}>
				<use xlinkHref={`${sprite}#icon-stop`}></use>
			</svg>
		</button>
	);
};

// webm, wav, mp3 etc
const AUDIO_TYPE = "audio/webm";

const AudioRecorder = ({ label, dateCreated, getRecording, children }) => {
	const {
		// state(s)
		audioData,
		audioBlob,
		recordingStatus,
		// fn() handlers
		getPermissionAndRecord,
		stopRecording,
	} = useAudioRecorder({ audioType: AUDIO_TYPE, getDataCallback });

	function getDataCallback(data) {
		getRecording(data);
	}

	const handleStop = () => {
		stopRecording();
		console.log("audioBlob", audioBlob);
		getRecording(audioBlob);
	};

	return (
		<div className={styles.AudioRecorder}>
			<div className={styles.AudioRecorder_inner}>
				{recordingStatus === "recording" ? (
					<StopButton stopRecording={handleStop} />
				) : (
					<RecordButton startRecording={getPermissionAndRecord} />
				)}
			</div>
			<div className={styles.AudioRecorder_outer}>
				<div className={styles.AudioRecorder_outer_msg}>
					{recordingStatus !== "recording"
						? "Click to start recording a note!"
						: "Recording..."}
				</div>
				<div className={styles.AudioRecorder_outer_audioTrack}>
					<AudioTrack
						label={label ?? "UNNAMED"}
						dateCreated={dateCreated ?? new Date()}
						audioSrc={audioData.src}
					/>
				</div>
			</div>
		</div>
	);
};

export default AudioRecorder;

export { RecordButton };
