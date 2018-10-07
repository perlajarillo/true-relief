import React from "react";
import EditProfile from "./EditProfile";
import AuthUserContext from "../AuthUserContext";

const EditProfileWithContext = (props) => (<AuthUserContext.Consumer>
    {authUser => <EditProfile { ...props } authUser={authUser} />}
</AuthUserContext.Consumer>);

export default EditProfileWithContext;