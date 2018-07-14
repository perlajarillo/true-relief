import firebase from './firebase.js';

export function writeNewPatient(data){
    //let database = firebase.database();
    // Get a key for a new Post.
    let newPatientKey = firebase.database().ref().child('patients').push().key;

    // Write the new patient's data.
    let updates = {};
    updates['/patients/' + newPatientKey] = data;
    return firebase.database().ref().update(updates);
}
