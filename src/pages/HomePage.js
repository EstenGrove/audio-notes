import React, { useState, useEffect } from "react";
import styles from "../css/pages/HomePage.module.scss";
import { PropTypes } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchNotesFromFirebase,
	selectAllNotes,
} from "../features/notes/notesSlice";
import NotesList from "../components/notes/NotesList.js";
import Spinner from "../components/shared/Spinner.js";
import Modal from "../components/shared/Modal.js";
import Button from "../components/shared/Button.js";
import AddNewNote from "../components/notes/AddNewNote.js";

const customCSS = {
	spinner: {
		display: "block",
		margin: "1rem auto",
		borderTopColor: "#ffffff",
	},
	btn: {
		padding: ".8rem 1.4rem",
		fontSize: "1.6rem",
		fontWeight: "600",
	},
};

// FEATURES:
// - SHOW NOTES LIST
// - SHOW EACH NOTE CARD ITEM
// - CLICKING ON A NOTE CARD TAKES YOU TO IT'S OWN PAGE ("/notes/:noteID")

const HomePage = () => {
	const dispatch = useDispatch();
	const notes = useSelector(selectAllNotes);
	const status = useSelector((state) => state.notes.status);
	const error = useSelector((state) => state.notes.error);
	// local states
	const [showNewNoteModal, setShowNewNoteModal] = useState(false);

	const initNewPost = () => {
		setShowNewNoteModal(true);
	};

	const renderContent = () => {
		if (status === "succeeded") {
			return <NotesList notes={notes} />;
		} else if (status === "failed") {
			return <div>ERROR: {error}</div>;
		} else {
			return null;
		}
	};

	// fetches audio notes from firebase onMount & anytime 'dispatch' changes
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		dispatch(fetchNotesFromFirebase());
		return () => {
			isMounted = false;
		};
	}, [dispatch]);

	return (
		<>
			<div className={styles.HomePage}>
				<div className={styles.HomePage_main}>
					<div className={styles.HomePage_main_actions}>
						<Button handleClick={initNewPost} customStyles={customCSS.btn}>
							+ Add New
						</Button>
					</div>
					{status === "loading" ? <Spinner /> : null}
					{renderContent()}
				</div>
			</div>

			{showNewNoteModal && (
				<Modal
					title="Create Audio Note"
					closeModal={() => setShowNewNoteModal(false)}
				>
					<AddNewNote
						notes={notes}
						closeModal={() => setShowNewNoteModal(false)}
					/>
				</Modal>
			)}
		</>
	);
};

export default HomePage;

HomePage.defaultProps = {};

HomePage.propTypes = {};
