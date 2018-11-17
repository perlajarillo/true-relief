import React from "react";
import Treatments from "./Treatments";
import AuthUserContext from "../AuthUserContext";

const TreatmentsWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <Treatments {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default TreatmentsWithContext;
