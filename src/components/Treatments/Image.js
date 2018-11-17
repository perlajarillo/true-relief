import React from "react";
import CardMedia from "@material-ui/core/CardMedia";

let Image = function statelessCardMediaComponent(props) {
  let source = require("../../images/" + props.imageName);

  return (
    <CardMedia component="img" src={source} className={props.coverImage} />
  );
};

export default Image;
