import React from "react";
import styles from "../../css/notes/NotesList.module.scss";
import NoteCard from "./NoteCard.js";

const NotesList = ({ notes = [] }) => {
	console.log("notes(NotesList):", notes);
	return (
		<div className={styles.NotesList}>
			<div className={styles.NotesList_list}>
				{notes &&
					notes.map((note, idx) => (
						<NoteCard key={`NOTE-${note.id}--${idx}`} note={note} />
					))}
			</div>
		</div>
	);
};

export default NotesList;

NotesList.defaultProps = {};

NotesList.propTypes = {};
