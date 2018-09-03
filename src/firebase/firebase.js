import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
};

firebase.initializeApp(config);

const db = firebase.database().ref();
const auth = firebase.auth();

export {
  auth,
  db
}
