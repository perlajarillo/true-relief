import { db } from './firebase.js';

export function writeNewPatient(userId,data) {
    //We are using the user.uid attribute as the new key, to identify the patient
    db.ref().child("patients").child(userId).set(data);
}

export function writeNewTrackPain(userId,data,newTrackPainKey) {
    if (newTrackPainKey == "") {
        newTrackPainKey = db.ref().child("patients")
        .child(userId).child("trackPain").push().key;
  }
  const updates = {};
  updates['/patients/' + userId+ '/trackPain/'+ newTrackPainKey] = data;
  return db.ref().update(updates);
}

export function getPainEntries(userId) {
  const entries = db.ref('patients/' + userId + '/trackPain')
  return entries.once("value");
}