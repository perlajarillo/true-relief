import firebase from './firebase.js';
import 'firebase/auth';

export function getActiveUser()
{
  const getUserStatus = function () {
    return new Promise(function (resolve, reject) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user.uid);
        } else {
          reject(Error('No active session was founded'));
        }
      });
    });
  };
  return getUserStatus;
}

export function writeNewPatient(userId,data){
    //We are using the user.uid attribute as the new key, to identify the patient
    firebase.database().ref().child("patients").child(userId).set(data);
}
