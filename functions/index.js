"use strict";
/*The human body parts where included in general terms. More information
  can be founded in:
   https://training.seer.cancer.gov/anatomy/muscular/groups/trunk.html
*/
const humanBodyFrontData = [
  {
    bodyPart: "head",
    xStart: "96",
    yEnd: "16"
  },
  { bodyPart: "forehead", xStart: "92", yEnd: "25" },
  { bodyPart: "left ear", xStart: "90", yEnd: "66" },
  {
    bodyPart: "right ear",
    xStart: "139",
    yEnd: "66"
  },
  { bodyPart: "face", xStart: "92", yEnd: "78" },
  { bodyPart: "chin", xStart: "116", yEnd: "78" },
  { bodyPart: "neck", xStart: "100", yEnd: "90" },
  {
    bodyPart: "front left shoulder",
    xStart: "48",

    yEnd: "147"
  },
  {
    bodyPart: "front right shoulder",
    xStart: "169",
    yEnd: "147"
  },
  { bodyPart: "chest", xStart: "72", yEnd: "174" },
  {
    bodyPart: "umbilicus",
    xStart: "118",

    yEnd: "220"
  },
  {
    bodyPart: "abdomen",
    xStart: "75",
    yEnd: "270"
  },
  {
    bodyPart: "left groin",
    xStart: "89",

    yEnd: "287"
  },
  {
    bodyPart: "right groin",
    xStart: "132",

    yEnd: "287"
  },
  {
    bodyPart: "front left tigh",
    xStart: "67",
    yEnd: "390"
  },
  {
    bodyPart: "front right tigh",
    xStart: "123",
    yEnd: "390"
  },
  {
    bodyPart: "left knee",
    xStart: "83",
    yEnd: "411"
  },
  {
    bodyPart: "right knee",
    xStart: "129",
    yEnd: "411"
  },
  {
    bodyPart: "left shin",
    xStart: "82",
    yEnd: "504"
  },
  {
    bodyPart: "right shin",
    xStart: "126",
    yEnd: "504"
  },
  {
    bodyPart: "front left ankle",
    xStart: "99",
    yEnd: "515"
  },
  {
    bodyPart: "front right ankle",
    xStart: "128",
    yEnd: "515"
  },
  {
    bodyPart: "left foot",
    xStart: "89",
    yEnd: "541"
  },
  {
    bodyPart: "right foot",
    xStart: "127",
    yEnd: "534"
  },
  {
    bodyPart: "left toes",
    xStart: "85",
    yEnd: "546"
  },
  {
    bodyPart: "right toes",
    xStart: "136",
    yEnd: "546"
  },
  {
    bodyPart: "left heel",
    xStart: "329",
    yEnd: "536"
  },
  {
    bodyPart: "right heel",
    xStart: "356",
    yEnd: "537"
  },
  {
    bodyPart: "left arm",
    xStart: "49",
    yEnd: "203"
  },
  {
    bodyPart: "right arm",
    xStart: "164",
    yEnd: "203"
  },
  {
    bodyPart: "front left elbow",
    xStart: "52",
    yEnd: "218"
  },
  {
    bodyPart: "front right elbow",
    xStart: "164",
    yEnd: "214"
  },
  {
    bodyPart: "front left forearm",
    xStart: "43",
    yEnd: "283"
  },
  {
    bodyPart: "front right forearm",
    xStart: "166",
    yEnd: "275"
  },
  {
    bodyPart: "front left wrist",
    xStart: "37",
    yEnd: "288"
  },
  {
    bodyPart: "front right wrist",
    xStart: "189",
    yEnd: "287"
  },
  {
    bodyPart: "front left hand",
    xStart: "26",
    yEnd: "313"
  },
  {
    bodyPart: "front right hand",
    xStart: "189",
    yEnd: "313"
  },
  {
    bodyPart: "front left hand fingers",
    xStart: "21",
    yEnd: "335"
  },
  {
    bodyPart: "front right hand fingers",
    xStart: "197",
    yEnd: "334"
  },
  {
    bodyPart: "front left hand thumb",
    xStart: "11",
    yEnd: "297"
  },
  {
    bodyPart: "front right hand thumb",
    xStart: "210",
    yEnd: "293"
  }
];
const humanBodyBackData = [
  {
    bodyPart: "back of the head",
    xStart: "95",
    yEnd: "65"
  },
  {
    bodyPart: "back of left ear",
    xStart: "91",
    yEnd: "66"
  },
  {
    bodyPart: "back of right ear",
    xStart: "145",
    yEnd: "66"
  },
  { bodyPart: "nape", xStart: "101", yEnd: "90" },
  {
    bodyPart: "back left shoulder",
    xStart: "50",
    yEnd: "157"
  },
  {
    bodyPart: "back right shoulder",
    xStart: "172",
    yEnd: "157"
  },
  {
    bodyPart: "back left tigh",
    xStart: "70",
    yEnd: "396"
  },
  {
    bodyPart: "back right tigh",
    xStart: "124",
    yEnd: "396"
  },
  {
    bodyPart: "back left knee",
    xStart: "85",
    yEnd: "416"
  },
  {
    bodyPart: "back right knee",
    xStart: "130",
    yEnd: "416"
  },
  {
    bodyPart: "left calf",
    xStart: "84",
    yEnd: "508"
  },
  {
    bodyPart: "right calf",
    xStart: "127",
    yEnd: "508"
  },
  {
    bodyPart: "back left ankle",
    xStart: "101",
    yEnd: "530"
  },
  {
    bodyPart: "back right ankle",
    xStart: "129",
    yEnd: "530"
  },
  {
    bodyPart: "left heel",
    xStart: "101",
    yEnd: "542"
  },
  {
    bodyPart: "right heel",
    xStart: "130",
    yEnd: "542"
  },
  {
    bodyPart: "back left arm",
    xStart: "52",
    yEnd: "211"
  },
  {
    bodyPart: "back right arm",
    xStart: "165",
    yEnd: "217"
  },
  {
    bodyPart: "left elbow",
    xStart: "52",
    yEnd: "227"
  },
  {
    bodyPart: "right elbow",
    xStart: "169",
    yEnd: "232"
  },
  {
    bodyPart: "left forearm",
    xStart: "42",
    yEnd: "287"
  },
  {
    bodyPart: "right forearm",
    xStart: "172",
    yEnd: "282"
  },
  {
    bodyPart: "back left wrist",
    xStart: "35",
    yEnd: "292"
  },
  {
    bodyPart: "back right wrist",
    xStart: "194",
    yEnd: "286"
  },
  {
    bodyPart: "back left hand",
    xStart: "24",
    yEnd: "317"
  },
  {
    bodyPart: "back right hand",
    xStart: "195",
    yEnd: "315"
  },
  {
    bodyPart: "back left hand fingers",
    xStart: "18",
    yEnd: "338"
  },
  {
    bodyPart: "back right hand fingers",
    xStart: "203",
    yEnd: "331"
  },
  {
    bodyPart: "back left hand thumb",
    xStart: "8",
    yEnd: "306"
  },
  {
    bodyPart: "back right hand thumb",
    xStart: "219",
    yEnd: "292"
  },
  { bodyPart: "back", xStart: "71", yEnd: "181" },
  {
    bodyPart: "low back",
    xStart: "76",
    yEnd: "266"
  },
  { bodyPart: "buttock", xStart: "73", yEnd: "308" }
];

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
const userId = "UID-GOES-HERE";

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
  const intensity = params.painIntensity;
  let color;
  if (intensity >= 0 && intensity <= 3) {
    color = "#4caf50";
  } else if (intensity >= 4 && intensity <= 6) {
    color = "#ffd95b";
  } else if (intensity >= 7 && intensity <= 8) {
    color = "#ff704";
  } else if (intensity >= 9 && intensity <= 10) {
    color = "#c41c00";
  }
  const bodyPartNamed = params.painIsIn;
  let painIsIn = {};
  let front = false;
  humanBodyFrontData.map(bodyData => {
    let bodyPart = bodyData.bodyPart;
    let x = bodyData.xStart;
    let y = bodyData.yEnd;
    if (bodyPart === bodyPartNamed) {
      front = true;
      painIsIn = {
        [bodyPartNamed]: {
          x: x,
          y: y,
          color: color,
          front: true
        }
      };
    }
  });
  if (!front) {
    humanBodyBackData.map(bodyData => {
      let bodyPart = bodyData.bodyPart;
      let x = bodyData.xStart;
      let y = bodyData.yEnd;
      if (bodyPart === bodyPartNamed) {
        painIsIn = {
          [bodyPartNamed]: {
            x: x,
            y: y,
            color: color,
            front: false
          }
        };
      }
    });
  }
  const endDate = params.endDate;
  const startDate = params.startDate;
  let eventDuration = dateFunctions.distanceInWordsStrict(
    endDate,
    startDate,
    "h"
  );

  const newPainEntryData = {
    description: params.description,
    endDate: endDate,
    mood: params.mood,
    notes: "",
    painIntensity: intensity,
    painIsIn: painIsIn,
    startDate: startDate,
    eventDuration: eventDuration
  };

  const newTrackPainKey = db
    .ref()
    .child("patients")
    .child(userId)
    .child("trackPain")
    .push().key;
  updates[
    "/patients/" + userId + "/trackPain/" + newTrackPainKey
  ] = newPainEntryData;
  db.ref().update(updates);
  conv.close(
    "I am sorry you were in pain. I will keep this information in your diary. We are working to bring some ideas to better manage your condition."
  );
});

app.intent("pain stoped", (conv, params) => {
  const datesComparison = dateFunctions.compareAsc(
    params.startDate,
    params.endDate
  );
  const timesComparison = dateFunctions.compareAsc(
    params.startTime,
    params.endTime
  );
  if (datesComparison === -1) {
    conv.ask(
      "The end date must happened after the start date. Let's try again, when did the pain stop?"
    );
  } else if (datesComparison === 0 && timesComparison === 1) {
    conv.ask(
      "The end time must happened after the start time. Let's try again, when did the pain stop?"
    );
  }
});
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
