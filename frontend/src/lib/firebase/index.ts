import { initializeApp, type FirebaseApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import config from "./firebase.config.json";

let app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(config.client);

const fbAuthClient = getAuth(app);
const fbStorageClient = getStorage(app);
const fbFirestoreClient = getFirestore(app);

export { fbAuthClient, fbStorageClient, fbFirestoreClient };
