import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  **YOUR-CONFIG-HERE **
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

export {
  auth,
  db
}
