import React from "react";
import styles from "../../css/notes/NoteCard.module.scss";
import {
	formatDate,
	formatDistanceToNowInWords,
} from "../../third-party/date-fns.tsx";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import NoteCardAudio from "./NoteCardAudio.js";

// interface Note {
// 	id: number;
// 	label: string;
// 	desc: string;
// 	audioSrc: string;
// 	dateCreated: Date | string;
// 	dateEdited: Date | string;
// }

const NoteCard = ({ note = {} }) => {
	const { id, label, desc, audioSrc, dateCreated } = note;

	const goToNotePage = () => {};

	return (
		<div className={styles.NoteCard}>
			<div className={styles.NoteCard_details}>
				<div className={styles.NoteCard_details_dateCreated}>
					{!dateCreated
						? "UNKNOWN DATE"
						: formatDistanceToNowInWords(dateCreated)}
				</div>
				<Link to={`/notes/${id}`}>
					<div className={styles.NoteCard_details_title} onClick={goToNotePage}>
						{label}
					</div>
				</Link>
				<div className={styles.NoteCard_details_descText}>{desc}</div>
			</div>
			<div className={styles.NoteCard_audio}>
				<NoteCardAudio
					label={label}
					dateCreated={dateCreated}
					audioSrc={audioSrc}
				/>
			</div>
		</div>
	);
};

export default NoteCard;

NoteCard.defaultProps = {};

NoteCard.propTypes = {};
