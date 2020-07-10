let shapes = [];
let newShape = undefined;

const checkNewShape = (shape) => {
  if (shape && shape.x1 && shape.x2 && shape.y1 && shape.y2) {
    return true;
  }
  return false;
};

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(0);
  };

  p.draw = () => {
    p.background(0);
    p.stroke(255);
    p.strokeWeight(2);
    p.fill(0, 0, 0, 0);
    shapes.forEach((shape) => {
      p.rect(shape.x1, shape.y1, shape.x2, shape.y2);
    });

    if (checkNewShape(newShape)) {
      p.rect(newShape.x1, newShape.y1, newShape.x2, newShape.y2);
    }
  };

  p.mouseDragged = () => {
    if (!newShape) {
      newShape = {
        x1: p.mouseX,
        y1: p.mouseY,
      };
    } else {
      newShape.x2 = p.mouseX - newShape.x1;
      newShape.y2 = p.mouseY - newShape.y1;
    }
  };

  p.mouseReleased = () => {
    shapes.push(newShape);
    newShape = undefined;
  };

  p.keyPressed = () => {
    if (event.code == "KeyZ" && (event.ctrlKey || event.metaKey)) {
      shapes.pop();
    }
  };
};

const myp5 = new p5(sketch);
