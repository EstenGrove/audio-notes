import React, { useState, useEffect } from "react";
import styles from "../../css/audio/AudioElement.module.scss";
import { secondsToTime, getAudioBufferFromBlob } from "../../utils/utils_audio";

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

	console.log("metaData:", metaData);

	return (
		<div>
			<audio src={audioSrc} controls preload="metadata"></audio>
			<div>
				Length:{" "}
				{metaData &&
					secondsToTime(Number.parseFloat(metaData.duration).toFixed())}{" "}
			</div>
		</div>
	);
};

export default AudioElement;
