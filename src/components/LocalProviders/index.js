import React from "react";
import LocalProviders from "./LocalProviders";
import AuthUserContext from "../AuthUserContext";

const LocalProvidersWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <LocalProviders {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default LocalProvidersWithContext;
