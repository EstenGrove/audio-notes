import React from "react";
import styles from "../../css/notes/AddNewNote.module.scss";
import { PropTypes } from "prop-types";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { generateID } from "../../utils/utils_notes.js";
import { addNewNote } from "../../features/notes/notesSlice";
import { blobToBase64 } from "../../utils/utils_audio.ts";
// components
import TextInput from "../shared/TextInput";
import Textarea from "../shared/Textarea";
import Button from "../shared/Button";
import SpinnerSM from "../shared/SpinnerSM";
import AudioRecorder from "../audio/AudioRecorder";
import AudioTrack from "../audio/AudioTrack";

const customCSS = {
	btn: {
		display: "block",
		padding: ".8rem 1.2rem",
		fontSize: "1.6rem",
		fontWeight: "600",
		marginLeft: "auto",
	},
	textarea: {
		minHeight: "5rem",
	},
};

const AddNewNote = ({ notes = [], closeModal }) => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.notes.status);
	const { formState, setFormState, handleChange, handleReset } = useForm({
		id: "", // ONLY GENERATED AT 'SAVE' ACTION
		noteTitle: "",
		noteDesc: "",
		audioSrc: "",
		dateCreated: new Date().toString(),
		dateEdited: "",
	});
	const { values, touched } = formState;

	const saveNewNote = (e) => {
		const { audioSrc, noteTitle, noteDesc, dateCreated, dateEdited } = values;
		const newID = generateID();
		console.log("newID", newID);

		const newNote = {
			id: newID,
			label: noteTitle,
			desc: noteDesc,
			audioSrc: audioSrc,
			dateCreated: dateCreated,
			dateEdited: dateEdited,
		};

		console.log("newNote(saveNewNote)", newNote);

		// calls createAsyncThunk()
		// dispatch(addNewNote({ newID, newNote }));
	};

	const getRecording = (audioBlob) => {
		console.log("audioBlob(getRecording):", audioBlob);
		setFormState({
			...formState,
			values: {
				...values,
				audioSrc: audioBlob,
			},
		});
	};

	return (
		<form className={styles.AddNewNote}>
			<fieldset className={styles.AddNewNote_recorder}>
				{/* AUDIORECORDER */}
				<AudioRecorder
					label={values.noteTitle}
					dateCreated={values.dateCreated}
					getRecording={getRecording}
				/>
				<br />
				<br />
				<AudioTrack />
			</fieldset>
			<fieldset className={styles.AddNewNote_fields}>
				<TextInput
					id="noteTitle"
					name="noteTitle"
					label="Note Title"
					val={values.noteTitle}
					handleChange={handleChange}
				/>
				<br />
				<br />
				<Textarea
					id="noteDesc"
					name="noteDesc"
					label="Note Description"
					val={values.noteDesc}
					handleChange={handleChange}
					resize="vertical"
					customStyles={customCSS.textarea}
				/>
			</fieldset>

			<Button
				isDisabled={false}
				handleClick={saveNewNote}
				customStyles={customCSS.btn}
			>
				{status === "loading" ? <SpinnerSM /> : "Save New Note"}
			</Button>
		</form>
	);
};

export default AddNewNote;

AddNewNote.defaultProps = {};

AddNewNote.propTypes = {};
