import { db } from "./firebase.js";

export function writeNewPatient(userId, data) {
  db.ref()
    .child("patients")
    .child(userId)
    .set(data);
}
export function deletePatient(userId) {
  return db
    .ref()
    .child("patients")
    .child(userId)
    .remove();
}
export function writeNewTrackPain(userId, data) {
  const newTrackPainKey = db
    .ref()
    .child("patients")
    .child(userId)
    .child("trackPain")
    .push().key;
  const updates = {};
  updates["/patients/" + userId + "/trackPain/" + newTrackPainKey] = data;
  return db.ref().update(updates);
}

export function editTrackPain(userId, data, trackPainKey) {
  const updates = {};
  updates["/patients/" + userId + "/trackPain/" + trackPainKey] = data;
  return db.ref().update(updates);
}

export function deleteTrackPain(userId, trackPainKey) {
  const entryToDelete = db
    .ref()
    .child("patients")
    .child(userId)
    .child("trackPain")
    .child(trackPainKey);
  return entryToDelete.remove();
}

export function getPainEntries(userId) {
  const entries = db
    .ref("patients/" + userId + "/trackPain")
    .orderByChild("endDate");
  return entries.once("value");
}

export function getPatient(uid) {
  const rootRef = db.ref();
  const userProfile = rootRef
    .child("patients")
    .child(uid)
    .once("value");
  return userProfile;
}

export function getPatientConditions(uid) {
  const rootRef = db.ref();
  const userPainConditions = rootRef
    .child("patients")
    .child(uid)
    .child("painConditions")
    .once("value");
  return userPainConditions;
}

export function writeNewPainCondition(userId, data) {
  return db
    .ref()
    .child("patients")
    .child(userId)
    .child("painConditions")
    .push(data);
}

export function editDemographic(userId, data) {
  return db
    .ref()
    .child("patients")
    .child(userId)
    .update(data);
}

export function editHabits(userId, data) {
  return db
    .ref()
    .child("patients")
    .child(userId)
    .update(data);
}

export function editNeeds(userId, data) {
  const updates = {};
  updates["/patients/" + userId + "/needs/"] = data;
  return db.ref().update(updates);
}

export function editChallenges(userId, data) {
  const updates = {};
  updates["/patients/" + userId + "/challenges/"] = data;
  return db.ref().update(updates);
}

export function editPainConditions(userId, data, conditionKey) {
  const updates = {};
  updates["/patients/" + userId + "/painConditions/" + conditionKey] = data;
  return db.ref().update(updates);
}

export function deletePainCondition(userId, conditionKey) {
  const conditionToDelete = db
    .ref()
    .child("patients")
    .child(userId)
    .child("painConditions")
    .child(conditionKey);
  return conditionToDelete.remove();
}
