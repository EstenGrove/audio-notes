import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "../../css/audio/AudioTrack.module.scss";
import sprite from "../../assets/icons/audio.svg";
import { PropTypes } from "prop-types";
import { format } from "date-fns";
import { formatDate } from "../../third-party/date-fns.tsx";
import {
	calculateTime,
	getAudioBufferFromBlob,
	secondsToTime,
} from "../../utils/utils_audio.ts";
// mock sample
import sample1 from "../../assets/audio/sample-1.wav";
import { debounce } from "../../utils/utils_performance.ts";

const mockNote = {
	id: "lqqusxz55yesvar8rt",
	label: "D-Maj Guitar Riff",
	desc: "Basic swing riff in D-Maj",
	// audioSrc:
	// 	"blob:https://k2ptk5-3000.csb.app/a4702efa-5cda-4d88-8b96-e1a40c1bfa8b",
	audioSrc: sample1,
	dateCreated: "Tue Dec 26 2023 10:21:46 GMT-0700 (Mountain Standard Time)",
	dateEdited: "",
};

const prepareDuration = (duration) => {
	const prepared = Number.parseFloat(duration).toFixed();
	return prepared;
};
const formatDuration = (duration) => {
	const prepared = prepareDuration(duration);
	const time = secondsToTime(prepared);
	return time;
};
const getMetaData = async (src) => {
	// convert to arrayBuffer
	const audioBuffer = await getAudioBufferFromBlob(src);

	return audioBuffer;
};

const PlayButton = ({ playRecording, isDisabled = false }) => {
	return (
		<button
			type="button"
			className={styles.PlayButton}
			onClick={playRecording}
			disabled={isDisabled}
		>
			<svg className={styles.PlayButton_icon}>
				<use xlinkHref={`${sprite}#icon-play_arrow`}></use>
			</svg>
		</button>
	);
};
const PauseButton = ({ pauseRecording, isDisabled = false }) => {
	return (
		<button
			type="button"
			className={styles.PauseButton}
			onClick={pauseRecording}
			disabled={isDisabled}
		>
			<svg className={styles.PauseButton_icon}>
				<use xlinkHref={`${sprite}#icon-pause`}></use>
			</svg>
		</button>
	);
};

const ENABLE_TRASH = true;

const AudioTrack = ({ label, dateCreated, audioSrc }) => {
	const audioRef = useRef(); // audioRef.current.currentTime
	const playbackRef = useRef();
	const [isHovered, setIsHovered] = useState(false);
	const [metaData, setMetaData] = useState({
		length: 0,
		duration: 0,
		numberOfChannels: 0,
		sampleRate: 0,
		formattedDuration: "00:00",
	});
	const { duration } = metaData;
	// 'playing' or 'paused'
	const [playbackStatus, setPlaybackStatus] = useState("paused");
	const [trackProgress, setTrackProgress] = useState(0);

	const startPlayback = async () => {
		audioRef.current.play();
		setPlaybackStatus("playing");
		// UNCOMMENT TO ENABLE TRACK PROGRESS COUNTER //
		// playbackRef.current = requestAnimationFrame(updateProgressRecursive);
	};
	const pausePlayback = async () => {
		audioRef.current.pause();
		setPlaybackStatus("paused");
	};

	const syncMetaData = async () => {
		const { src } = audioRef.current;
		// converts blob url to AudioBuffer to read audio's meta-data
		const { duration, length, numberOfChannels, sampleRate } =
			await getMetaData(src);
		const formattedTime = calculateTime(duration);
		setMetaData({
			duration,
			length,
			numberOfChannels,
			sampleRate,
			formattedDuration: formattedTime,
		});
	};

	const updateProgressRecursive = useCallback(() => {
		const currentTime = audioRef.current.currentTime;
		setTrackProgress(currentTime);
		playbackRef.current = requestAnimationFrame(updateProgressRecursive);
	}, [audioRef, playbackRef, setTrackProgress]);

	if (!audioSrc || audioSrc === null) {
		return null;
	}
	return (
		<div
			className={styles.AudioTrack}
			onMouseEnter={() => debounce(setIsHovered(true), 500)}
			onMouseLeave={() => debounce(setIsHovered(false), 500)}
		>
			<audio
				src={audioSrc}
				ref={audioRef}
				preload="metadata"
				className={styles.AudioTrack_audioEl}
				onLoadedMetadata={syncMetaData}
			/>
			<div className={styles.AudioTrack_controls}>
				{playbackStatus === "paused" ? (
					<PlayButton playRecording={startPlayback} />
				) : (
					<PauseButton pauseRecording={pausePlayback} />
				)}
			</div>
			<div className={styles.AudioTrack_inner}>
				<div className={styles.AudioTrack_inner_topRow}>
					<div className={styles.AudioTrack_inner_topRow_title}>
						{label ? label : "UNNAMED"}
					</div>
				</div>
				<div className={styles.AudioTrack_inner_subRow}>
					<div className={styles.AudioTrack_inner_subRow_dateCreated}>
						{dateCreated
							? formatDate(dateCreated, "MM/dd/yyyy 'at' h:mm a")
							: "UNKNOWN DATE"}
					</div>
					<div className={styles.AudioTrack_inner_subRow_trackLength}>
						{playbackStatus === "playing" && (
							<span>{calculateTime(trackProgress)} / </span>
						)}
						{duration ? formatDuration(duration) : "00:00"}
					</div>
				</div>
				{ENABLE_TRASH && isHovered && (
					<div className={styles.AudioTrack_inner_delete}>
						<svg className={styles.AudioTrack_inner_delete_icon}>
							<use xlinkHref={`${sprite}#icon-delete`}></use>
						</svg>
					</div>
				)}
			</div>
		</div>
	);
};

export default AudioTrack;

AudioTrack.defaultProps = {};

AudioTrack.propTypes = {};
