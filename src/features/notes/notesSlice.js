import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	createNewNoteInFirebase,
	fetchAllNotesFromDB,
} from "../../utils/utils_notes.js";

const mockNotes = [
	{
		id: 1,
		label: "D-Maj Guitar Riff",
		desc: "Basic swing riff in D-Maj",
		audioSrc: null,
		dateCreated: "Tue Dec 26 2023 10:21:46 GMT-0700 (Mountain Standard Time)",
		dateEdited: null,
	},
	{
		id: 2,
		label: "A-minor Flamenco Riff",
		desc: "Spanish/Latin style flamenco guitar riff base in A-minor",
		audioSrc: null,
		dateCreated: "Tue Dec 26 2023 10:19:46 GMT-0700 (Mountain Standard Time)",
		dateEdited: null,
	},
];

const initialState = {
	notes: [],
	status: "idle", // 'loading', 'succeeded', 'failed'
	error: null,
};

const dummyFetch = async () => {
	const url = "https://jsonplaceholder.typicode.com/posts";
	try {
		const req = await fetch(url);
		const resp = await req.json();
		return {
			status: req.status,
			data: resp,
			headers: req.headers,
			url: req.url,
		};
	} catch (error) {
		return error.message;
	}
};

const fetchNotesFromFirebase = createAsyncThunk(
	"notes/fetchNotes",
	async () => {
		const allNotes = await fetchAllNotesFromDB();
		console.log("allNotes", allNotes);
		return allNotes;
	}
);

const addNewNote = createAsyncThunk("notes/addNewNote", async (noteData) => {
	const { newID, newNote } = noteData;
	console.log("newNote(addNewNote-Thunk)", newNote);
	console.log("newID(addNewNote-Thunk):", newID);
	const resp = await createNewNoteInFirebase(newID, newNote);
	console.log("resp(addNewNote)", resp);
	return resp;
});

const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		// deleteNote
		deleteNote(state, action) {
			const { id } = action.payload;
			const withoutNote = state.notes.filter((note) => note.id !== id);
			state.notes = [...withoutNote];
		},
		// updateNote (edits a note record)
		updateNote(state, action) {
			const { id, label, desc, audioSrc, dateCreated, dateEdited } =
				action.payload;
			const existingNote = state.notes.find((note) => note.id === id);
			if (existingNote) {
				existingNote.label = label;
				existingNote.desc = desc;
				existingNote.audioSrc = audioSrc;
				existingNote.dateCreated = dateCreated;
				existingNote.dateEdited = dateEdited;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchNotesFromFirebase.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchNotesFromFirebase.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.notes = [...action.payload];
			})
			.addCase(fetchNotesFromFirebase.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewNote.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(addNewNote.fulfilled, (state, action) => {
				const { newNote } = action.payload;
				console.log("action.payload", action.payload);
				state.status = "succeeded";
				state.notes.push(newNote);
			})
			.addCase(addNewNote.rejected, (state, action) => {
				state.status = "rejected";
				console.log("ERROR:", action.error.message);
				state.error = action.error.message;
			});
	},
});

// state.notes === notesSlice && state.notes.notes === notes list
const selectAllNotes = (state) => state.notes.notes;

const selectNoteByID = (state, noteID) => {
	const { notes } = state;
	// enforce number type since may be coming from url param/path
	const id = noteID;
	const notesList = notes.notes;
	const selectedNote = notesList.find((note) => note.id === id);
	return selectedNote;
};

export { selectAllNotes, selectNoteByID, fetchNotesFromFirebase, addNewNote };

export default notesSlice.reducer;
