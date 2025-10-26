var admin = require("firebase-admin");

var serviceAccount = require("../API/kyoto-guide-app-firebase-adminsdk-fbsvc-a7e0573045.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kyoto-guide-app-default-rtdb.firebaseio.com"
});

const db = admin.database();
module.exports = { db };
