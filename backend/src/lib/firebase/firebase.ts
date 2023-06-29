import { initializeApp, cert, getApp, getApps, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import config from "./firebase.config.json";

let app: App =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: config.admin.project_id,
          privateKey: config.admin.private_key,
          clientEmail: config.admin.client_email,
        }),
      });

const fbAuthAdmin = getAuth(app);

export default fbAuthAdmin;
