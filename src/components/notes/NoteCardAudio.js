import React, { useState, useEffect } from "react";
import styles from "../../css/notes/NoteCardAudio.module.scss";
import sprite from "../../assets/icons/audio.svg";
import { PropTypes } from "prop-types";
import {
	base64ToBlob,
	blobToArrayBuffer,
	blobUrlToBlob,
	getAudioBufferFromBlob,
} from "../../utils/utils_audio.ts";
import AudioTrack from "../audio/AudioTrack";

const NoAudio = ({ msg = "No audio note found." }) => {
	return (
		<div className={styles.NoAudio}>
			<svg className={styles.NoAudio_icon}>
				<use xlinkHref={`${sprite}#icon-error_outline`}></use>
			</svg>
			<span className={styles.NoAudio_msg}>{msg}</span>
		</div>
	);
};

const NoteCardAudio = ({ label, dateCreated, audioSrc }) => {
	const [bufferSrc, setBufferSrc] = useState(null);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		const getSrc = async () => {
			const src = await base64ToBlob(audioSrc);
			const newBlob = new Blob([src], { type: "audio/webm" });
			const url = URL.createObjectURL(newBlob);
			// const src = await blobUrlToBlob(audioSrc);

			setBufferSrc(audioSrc);
		};

		// check if 'audioSrc' exists & 'bufferSrc' hasn't been set yet
		if (audioSrc && !bufferSrc) {
			getSrc();
		}

		return () => {
			isMounted = false;
		};
	}, [audioSrc, bufferSrc]);

	return (
		<div className={styles.NoteCardAudio}>
			<div className={styles.NoteCardAudio_inner}>
				{!bufferSrc && <NoAudio />}
				{bufferSrc && (
					<AudioTrack
						label={label}
						dateCreated={dateCreated}
						audioSrc={bufferSrc}
					/>
				)}
			</div>
		</div>
	);
};

export default NoteCardAudio;

NoteCardAudio.defaultProps = {};

NoteCardAudio.propTypes = {};
