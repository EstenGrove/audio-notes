// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCJCClx6DlR6s7NwsTEBk8R28OYwfcUWXo",
	authDomain: "audio-notes-2beab.firebaseapp.com",
	databaseURL: "https://audio-notes-2beab-default-rtdb.firebaseio.com",
	projectId: "audio-notes-2beab",
	storageBucket: "audio-notes-2beab.appspot.com",
	messagingSenderId: "737881752318",
	appId: "1:737881752318:web:90cd2fca4b646fcfb95baf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, firebaseConfig };
export default app;
