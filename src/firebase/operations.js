import { db, auth } from './firebase.js';

export function writeNewPatient(userId, data) {
  //We are using the user.uid attribute as the new key, to identify the patient
  db.ref()
    .child('patients')
    .child(userId)
    .set(data);
}

export function writeNewTrackPain(userId, data) {
  const newTrackPainKey = db
    .ref()
    .child('patients')
    .child(userId)
    .child('trackPain')
    .push().key;
  const updates = {};
  updates['/patients/' + userId + '/trackPain/' + newTrackPainKey] = data;
  return db.ref().update(updates);
}

export function editTrackPain(userId, data, trackPainKey) {
  const updates = {};
  updates['/patients/' + userId + '/trackPain/' + trackPainKey] = data;
  return db.ref().update(updates);
}
export function deleteTrackPain(userId, trackPainKey) {
  const entryToDelete = db
    .ref()
    .child('patients')
    .child(userId)
    .child('trackPain')
    .child(trackPainKey);
  return entryToDelete.remove();
}
export function getPainEntries(userId) {
  const entries = db
    .ref('patients/' + userId + '/trackPain')
    .orderByChild('endDate');
  return entries.once('value');
}

export function getPatient(uid) {
  const rootRef = db.ref();
  const userProfile = rootRef
    .child('patients')
    .child(uid)
    .once('value');
  return userProfile;
}
