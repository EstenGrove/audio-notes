import firebase, { firebaseConfig } from "../third-party/firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";

const fetchAllNotesFromDB = async () => {
	const db = getDatabase();
	const notesRef = ref(db, "notes/");

	const data = await new Promise((resolve, reject) =>
		onValue(notesRef, (snapshot) => resolve(snapshot.toJSON()), reject)
	);

	// converts the 'snapshot' JSON tree to an array for the UI
	const normalizedData = Object.keys(data).map((key) => data[key]);
	return normalizedData;
};
const fetchNotesByIDFromDB = async (noteID) => {
	const db = getDatabase();
	const notesRef = ref(db, "notes/" + noteID);
	let notes;
	onValue(notesRef, (snapshot) => {
		const data = snapshot.val();
		console.log("data", data);
		notes = data;
		return data;
	});
	return notes;
};

const createNewNoteInFirebase = async (newID, newNote) => {
	const { audioSrc, label, desc, id, dateCreated, dateEdited } = newNote;
	const db = getDatabase();

	return set(ref(db, "notes/" + newID), {
		id: newID,
		label: label,
		desc: desc,
		audioSrc: audioSrc,
		dateCreated: dateCreated,
		dateEdited: dateEdited,
	})
		.then(() => {
			const resp = { newNote: newNote, status: "succeeded", id: id };
			return resp;
		})
		.catch((error) => {
			console.warn("ERROR:", error);
			return error;
		});
};

// OTHER UTILS

const generateID = () => {
	const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
	console.log("id(random):", id);
	return id;
};

export { fetchAllNotesFromDB, fetchNotesByIDFromDB, createNewNoteInFirebase };

export { generateID };
