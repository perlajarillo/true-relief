import React from "react";
import Registration from "./Registration";
import AuthUserContext from "../AuthUserContext";

const RegistrationWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <Registration {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default RegistrationWithContext;
