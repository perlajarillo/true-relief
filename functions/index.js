"use strict";

const functions = require("firebase-functions");
// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow, SignIn } = require("actions-on-google");
// Instantiate the Dialogflow client.
const app = dialogflow({
  debug: true
});
const dateFunctions = require("date-fns");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.database();
//Place here a uid to test the action
const userId = "here the user id";

//Managing the helper
app.intent("actions_intent_SIGN_IN", (conv, params, signin) => {
  if (signin.status !== "OK") {
    return conv.ask("You need to sign in before using the app.");
  }
  return conv.ask("Ok, thanks for sign in!");
});

// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent("Default Welcome Intent", conv => {
  conv.ask(new SignIn("To get your account details"));
});
//When the
app.intent("body part", (conv, params) => {
  const updates = {};
  const newTrackPainKey = db
    .ref()
    .child("patients")
    .child(userId)
    .child("trackPain")
    .push().key;
  updates["/patients/" + userId + "/trackPain/" + newTrackPainKey] = params;
  db.ref().update(updates);
  conv.close(
    "I am sorry you were in pain. I will keep this information in your diary. We are working to bring some ideas to better manage your condition."
  );
});

app.intent("pain stoped", (conv, params) => {
  const datesComparison = dateFunctions.compareAsc(params.startDate, params.endDate);
  const timesComparison = dateFunctions.compareAsc(params.startTime, params.endTime);
 if (datesComparison === -1) {
    conv.ask(
      "The end date must happened after the start date. Let's try again, when did the pain stop?"
    );
  } else if (
    datesComparison === 0 &&
    timesComparison === 1
  ) {
    conv.ask(
      "The end time must happened after the start time. Let's try again, when did the pain stop?"
    );
  }
});
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
