import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";

const store = configureStore({
	reducer: {
		notes: notesReducer,
	},
	// middleware: [getDefaultMiddleware()],
});

export default store;
