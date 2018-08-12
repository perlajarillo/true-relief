import React, { Component } from "react";
import body from "../../images/Body-Pictures.jpg";
import { withStyles } from "@material-ui/core/styles";

const colors = ["#4caf50", "#ffd95b", "#ff7043", "#c41c00"];

const styles = theme => ({
  canvasStyles: {
    margin: "2px solid black"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.isDrawing = false;
    this.isMouseDown = false;
    this.line = [];
    (this.activeColor = null), (this.canvas = React.createRef());
    this.canvasImage = React.createRef();
    this.drawImage = this.drawImage.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.startDrawing = this.startDrawing.bind(this);
    this.draw = this.draw.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  componentDidMount() {
    this.drawImage();
  }

  drawImage = () => {
    const ctx = this.canvas.current.getContext("2d");
    const image = new Image();
    image.src = body;
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
  };

  getCoords = event => {
    let rect = this.canvas.current.getBoundingClientRect();
    let startX = event.clientX - rect.x;
    let startY = event.clientY - rect.y;

    return {
      startX,
      startY
    };
  };

  startDrawing = event => {
    this.isMouseDown = true;
    this.isDrawing = true;
    this.draw(event);
  };

  setColor = event => {
    this.activeColor = event.target.value;
    return this.activeColor;
  };

  draw = event => {
    if (!this.isDrawing) return;
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

    this.line.push({ startX, startY, nextX, nextY });
  };

  stopDrawing = () => {
    this.isDrawing = false;
    this.isMouseDown = false;
  };

  clearCanvas = ctx => {
    this.line = [];
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          {colors.map(color => (
            <button
              key={color}
              value={color}
              style={{
                background: color,
                width: "32px",
                height: "32px",
                marginRight: "16px"
              }}
              onClick={this.setColor}
            />
          ))}
        </div>
        <canvas
          ref={this.canvas}
          width={500}
          height={750}
          style={{ border: "2px solid #ccc" }}
          onMouseDown={this.startDrawing}
          onMouseMove={this.draw}
          onMouseUp={this.stopDrawing}
          onMouseLeave={this.stopDrawing}
        />
        <button name="clearCanvas" onClick={this.clearCanvas}>
          Clear
        </button>
      </div>
    );
  }
}

export default withStyles(styles)(Canvas);
