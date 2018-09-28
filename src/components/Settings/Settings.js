import React from "react";
import PasswordChange from "../PasswordChange/PasswordChange";
import withAuthorization from "../WithAuthorization";

const Settings = () =>
  <div>
    <h1>Settings</h1>
    <PasswordChange />
  </div>

const authCondition = (authUser) => Boolean(authUser);

export default withAuthorization(authCondition)(Settings);