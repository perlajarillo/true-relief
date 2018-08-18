import firebase from './firebase.js';

export function writeNewPatient(userId,data){
    //We are using the user.uid attribute as the new key, to identify the patient
    firebase.database().ref().child("patients").child(userId).set(data);
}