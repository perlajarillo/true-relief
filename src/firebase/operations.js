import { db } from './firebase.js';

export function writeNewPatient(userId,data){
    //We are using the user.uid attribute as the new key, to identify the patient
    db.child("patients").child(userId).set(data);
}

export function writeNewTrackPain(userId,data){
  const newTrackPainKey = db.child("patients")
    .child(userId).child("trackPain").push().key;
  const updates = {};
  updates['/patients/' + userId+ '/trackPain/'+ newTrackPainKey] = data;
  return db.update(updates);
}