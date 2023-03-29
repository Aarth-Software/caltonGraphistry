var admin = require("firebase-admin");

var serviceAccount = require("./adminSDK.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://litdig-3f05d-default-rtdb.firebaseio.com",
});

module.exports = admin;
