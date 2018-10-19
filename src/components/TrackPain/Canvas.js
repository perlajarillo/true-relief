import React, { Component } from "react";
import front from "../../images/front.jpg";
import back from "../../images/back.jpg";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import trackPainData from "./literals/trackPainData.js";
const colors = ["#4caf50", "#ffd95b", "#ff7043", "#c41c00"];

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  front: {
    background: "url(" + front + ")",
    border: "2px solid #ccc"
  },
  back: {
    background: "url(" + back + ")",
    border: "2px solid #ccc"
  }
});
const { humanBodyFrontData, humanBodyBackData } = trackPainData;

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: null,
      btnText: "Show front"
    };
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
    this.getBodyPartTerminology = this.getBodyPartTerminology.bind(this);
    this.switchSilhouette = this.switchSilhouette.bind(this);
    this.drawFromParent = this.drawFromParent.bind(this);
  }
  /**
   *componentWillReceiveProps – when the canvas receive the props we review if there are
  painData to pain in the canvas
   * @param {void}
   * @return {void} painting the canvas
*/
  componentDidUpdate(prevProps) {
    if (this.props.painIsInData !== prevProps.painIsInData) {
      if (this.props.painIsInData) {
        const painIsIn = this.props.painIsInData;
        let front = this.state.front;
        if (front == null) {
          const firstKey = Object.keys(painIsIn)[0];
          front = painIsIn[firstKey].front;
        }
        let btnText;
        front ? (btnText = "Show back") : (btnText = "Show front");
        this.setState({
          front: front,
          btnText: btnText
        });
        Object.keys(painIsIn).forEach(key => {
          if (painIsIn[key].front === front) {
            const x = painIsIn[key].x;
            const y = painIsIn[key].y;
            const color = painIsIn[key].color;
            this.drawFromParent(x, y, color);
          }
        });
      }
    }
  }

  /**
   *getBodyPartTerminology – compare the coordinates the user has
   clicked in the screen and compared them with the ranges we have, then
   the humanBody part and coordinates are set in the parent state
   * @param {Number} coordinates X and Y
   * @return {void} body part name
   */
  getBodyPartTerminology(x, y) {
    const { color, front } = this.state;
    front
      ? humanBodyFrontData.map(bodyData => {
          let bodyPart = bodyData.bodyPart;
          let xStart = bodyData.xStart;
          let yStart = bodyData.yStart;
          let xEnd = bodyData.xEnd;
          let yEnd = bodyData.yEnd;
          /**Compare the given coordinates with the ranges for every body name*/
          const isOnRange =
            x >= parseInt(xStart) &&
            x <= parseInt(xEnd) &&
            (y >= parseInt(yStart) && y <= parseInt(yEnd));
          /**If there are coincidences the parentState is updated*/
          isOnRange &&
            this.props.updateParentState(bodyPart, x, y, front, color);
        })
      : humanBodyBackData.map(bodyData => {
          let bodyPart = bodyData.bodyPart;
          let xStart = bodyData.xStart;
          let yStart = bodyData.yStart;
          let xEnd = bodyData.xEnd;
          let yEnd = bodyData.yEnd;
          /**Compare the given coordinates with the ranges for every body name*/
          const isOnRange =
            x >= parseInt(xStart) &&
            x <= parseInt(xEnd) &&
            (y >= parseInt(yStart) && y <= parseInt(yEnd));
          /**If there are coincidences the parentState is updated*/
          isOnRange &&
            this.props.updateParentState(bodyPart, x, y, front, color);
        });
  }
  /**
   *switchSilhouette – change between the front and back silhouette pictures
   * and set the state with the text for the bottom and the value of front.
   * When front is true the picture with the front of the human body will appear,
   * when front is false the picture with the back of the human body will appear.
   * @param {void}
   * @return {void}
   */
  switchSilhouette() {
    const ctx = this.canvas.current.getContext("2d");
    this.activeColor = null;
    ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    const painIsIn = this.props.painIsInData;
    if (this.state.front) {
      Object.keys(painIsIn).forEach(key => {
        !painIsIn[key].front &&
          this.drawFromParent(
            painIsIn[key].x,
            painIsIn[key].y,
            painIsIn[key].color
          );
      });
      this.setState({
        front: false,
        btnText: "Show front"
      });
    } else {
      Object.keys(painIsIn).forEach(key => {
        painIsIn[key].front &&
          this.drawFromParent(
            painIsIn[key].x,
            painIsIn[key].y,
            painIsIn[key].color
          );
      });
      this.setState({
        front: true,
        btnText: "Show back"
      });
    }
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
    this.setState({ color: this.activeColor });
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
    this.getBodyPartTerminology(nextX, nextY);
    ctx.lineTo(nextX, nextY);
    ctx.stroke();
  };
  /**
   * drawFromParent – create the context for canvas,
   * sets the styles to draw the coordinates in parent state
   * @param {Object} event
   * @return {void}
   */
  drawFromParent(startX, startY, color) {
    const ctx = this.canvas.current.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 20;
    let nextX = startX;
    let nextY = startY;
    ctx.beginPath();
    // start from
    ctx.moveTo(startX, startY);
    ctx.lineTo(nextX, nextY);
    ctx.stroke();
  }
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
    this.props.clearParentState();
    this.setState({ front: false, btnText: "Show front" });
  };

  render() {
    const { classes } = this.props;
    const { front, btnText } = this.state;
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
        {front ? (
          <canvas
            ref={this.canvas}
            width={250}
            height={550}
            className={classes.front}
            onMouseDown={this.startDrawing}
            onMouseMove={this.draw}
            onMouseUp={this.stopDrawing}
            onMouseLeave={this.stopDrawing}
          />
        ) : (
          <canvas
            ref={this.canvas}
            width={250}
            height={550}
            className={classes.back}
            onMouseDown={this.startDrawing}
            onMouseMove={this.draw}
            onMouseUp={this.stopDrawing}
            onMouseLeave={this.stopDrawing}
          />
        )}
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
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={classes.button}
            onClick={this.switchSilhouette}
          >
            {btnText}
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Canvas);
