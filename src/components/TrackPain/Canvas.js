import React, { Component } from "react";
import body from "../../images/Body-Pictures.jpg";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const colors = ["#4caf50", "#ffd95b", "#ff7043", "#c41c00"];

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  bgImage: {
    background: "url(" + body + ")",
    border: "2px solid #ccc"
  }
});

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.isDrawing = false;
    this.isMouseDown = false;
    this.activeColor = null;

    this.canvas = React.createRef();
    this.getCoords = this.getCoords.bind(this);
    this.startDrawing = this.startDrawing.bind(this);
    this.draw = this.draw.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  /**
   * getCoords – gets coordinates from where the user has clicked the screen
   * @param {Object} event
   * @return {Number} coordinates X and Y
   */
  getCoords = event => {
    let rect = this.canvas.current.getBoundingClientRect();
    let startX = event.clientX - rect.x;
    let startY = event.clientY - rect.y;

    return {
      startX,
      startY
    };
  };

  /**
   * startDrawing – checks if the user has clicked the screen and calls the draw
   * function
   * @param {Object} event
   * @return {void}
   */
  startDrawing = event => {
    this.isMouseDown = true;
    this.isDrawing = true;
    this.draw(event);
  };

  /**
   * setColor – picks the color from the selected button
   * @param {Object} event
   * @return {String} the selected color
   */
  setColor = event => {
    this.activeColor = event.target.value;
    return this.activeColor;
  };

  /**
   * draw – create the context for canvas, sets the styles to draw
   * @param {Object} event
   * @return {void}
   */
  draw = event => {
    if (!this.isDrawing) return;
    if (!this.activeColor) return;
    const { startX, startY } = this.getCoords(event);
    const ctx = this.canvas.current.getContext("2d");
    ctx.strokeStyle = this.activeColor;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 20;

    let nextX = startX;
    let nextY = startY;
    ctx.beginPath();
    // start from
    ctx.moveTo(startX, startY);
    // go to
    ctx.lineTo(nextX, nextY);
    ctx.stroke();
  };

  /**
   * stopDrawing – checks if the mouse is down and stops the draw function
   * @return {void}
   */
  stopDrawing = () => {
    this.isDrawing = false;
    this.isMouseDown = false;
  };

  /**
   * clearCanvas – clears all coordinates in the canvas
   * @return {void}
   */
  clearCanvas = () => {
    const ctx = this.canvas.current.getContext("2d");
    this.activeColor = null;
    ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Typography variant="subheading">
            Pick a color that best represents the intensity of your pain and
            draw where you felt it.
          </Typography>
          {colors.map(color => (
            <Button
              key={color}
              value={color}
              variant="contained"
              size="small"
              style={{
                background: color
              }}
              onClick={this.setColor}
            >
              {" "}
            </Button>
          ))}
        </div>
        <canvas
          ref={this.canvas}
          width={300}
          height={550}
          className={classes.bgImage}
          onMouseDown={this.startDrawing}
          onMouseMove={this.draw}
          onMouseUp={this.stopDrawing}
          onMouseLeave={this.stopDrawing}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={classes.button}
            onClick={this.clearCanvas}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Canvas);
