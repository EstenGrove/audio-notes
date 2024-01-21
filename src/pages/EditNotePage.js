import React from "react";
import styles from "../css/pages/EditNotePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import EditableNoteCard from "../components/notes/EditableNoteCard";
import { selectNoteByID } from "../features/notes/notesSlice";

const EditNotePage = ({ match }) => {
	const { id } = match.params;
	const selectedNote = useSelector((state) => selectNoteByID(state, id));

	console.log("id", id);
	console.log("selectedNote", selectedNote);
	return (
		<div className={styles.EditNotePage}>
			<header className={styles.EditNotePage_header}>
				<h1 className={styles.EditNotePage_header_title}>Edit Note</h1>
			</header>
			<div className={styles.EditNotePage_note}>
				<EditableNoteCard note={selectedNote} />
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default EditNotePage;

EditNotePage.defaultProps = {};

EditNotePage.propTypes = {};
