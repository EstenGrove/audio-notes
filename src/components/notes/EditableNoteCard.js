import React from "react";
import styles from "../../css/notes/EditableNoteCard.module.scss";
import { PropTypes } from "prop-types";
import { useForm } from "../../hooks/useForm";
import TextInput from "../shared/TextInput";
import Textarea from "../shared/Textarea";
import AudioTrack from "../audio/AudioTrack";
import Button from "../shared/Button";

const customCSS = {
	label: {
		backgroundColor: "#ffffff",
	},
	desc: {
		backgroundColor: "#ffffff",
		minHeight: "7rem",
	},
	btn: {
		fontSize: "1.6rem",
		fontWeight: "600",
		padding: ".7rem 1.3rem",
	},
};

const EditableNoteCard = ({ note = {} }) => {
	const { formState, handleChange, handleReset } = useForm({
		id: note.id,
		label: note.label,
		desc: note.desc,
		audioSrc: note.audioSrc,
		dateCreated: note.dateCreated,
		dateEdited: note.dateEdited ?? new Date(),
	});
	const { values, touched } = formState;

	const deleteAudio = () => {};

	return (
		<div className={styles.EditableNoteCard}>
			<form action="" className={styles.EditableNoteCard_form}>
				<TextInput
					id="label"
					name="label"
					label="Note Title"
					val={values.label}
					handleChange={handleChange}
					customStyles={customCSS.label}
				/>
				<br />
				<br />
				<Textarea
					id="desc"
					name="desc"
					label="Note Description"
					val={values.desc}
					handleChange={handleChange}
					resize="vertical"
					customStyles={customCSS.desc}
				/>
				<br />
				<br />
				<AudioTrack
					label={values.label}
					dateCreated={values.dateCreated}
					audioSrc={values.audioSrc}
				/>
				<div className={styles.EditableNoteCard_form_actions}>
					<Button handleClick={deleteAudio} customStyles={customCSS.btn}>
						Save Changes
					</Button>
				</div>
			</form>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default EditableNoteCard;

EditableNoteCard.defaultProps = {};

EditableNoteCard.propTypes = {};
