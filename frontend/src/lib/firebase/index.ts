import { initializeApp, type FirebaseApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "./firebase.config.json";

let app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(config.client);

const fbAuthClient = getAuth(app);

export default fbAuthClient;
