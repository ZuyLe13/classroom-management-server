import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "./config.js";

const firebase  = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase);

export { firebase , db };