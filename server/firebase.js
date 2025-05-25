const admin = require("firebase-admin");

// Load Firebase service account key (download from Firebase console)
const serviceAccount = require("/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
