import React from "react";
import TrackPain from "./TrackPain";
import NewPainEntry from "./NewPainEntry";
import AuthUserContext from "../AuthUserContext";


const TrackPainWithContext = (props) => (<AuthUserContext.Consumer>
  {authUser => <TrackPain {...props} authUser={authUser} />}
</AuthUserContext.Consumer>);


export default TrackPainWithContext;