import React from "react";
import TrackPain from "./TrackPain";
import AuthUserContext from "../AuthUserContext";


const TrackPainWithContext = () => <AuthUserContext.Consumer>
  {authUser => <TrackPain authUser={authUser}/>}
</AuthUserContext.Consumer>


export default TrackPainWithContext;