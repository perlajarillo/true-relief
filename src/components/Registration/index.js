import React from "react";
import Registration from "./Registration";
import AuthUserContext from "../AuthUserContext";


const RegistrationWithContext = () => <AuthUserContext.Consumer>
  {authUser => <Registration authUser={authUser}/>}
</AuthUserContext.Consumer>


export default RegistrationWithContext;