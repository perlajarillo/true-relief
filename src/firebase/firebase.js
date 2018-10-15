import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDeNQhAx7_4qeQK9ttpmwcrmyUuZ_1FDmE",
  authDomain: "truerelieftest.firebaseapp.com",
  databaseURL: "https://truerelieftest.firebaseio.com",
  projectId: "truerelieftest",
  storageBucket: "truerelieftest.appspot.com",
  messagingSenderId: "1024217225761"
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

export {
  auth,
  db
}
