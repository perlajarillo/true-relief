import { getActiveUser } from "./FirebaseOperations.js";

export function userStatus() {
  return function ()
    {
      getActiveUser()
        .then(function (uid) {
          return uid;
        })
        .catch(function (err) {
          return null;
      });
    }
}
