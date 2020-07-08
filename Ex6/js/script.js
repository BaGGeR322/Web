// вверх = 1
// вниз = 2
// влево = 3
// вправо = 4
// рандом = 5
// хаос = 6
const height = 400;
const width = 600;

const growth = 0.1;

const max_diam_ball = 120;
const max_diag_rect = 150;

let figures = [];

let direction;

function setup() 
{
  cnv = createCanvas(width, height);
  cnv.mousePressed(createFigure);
  strokeWeight(0);
  frameRate(60);
}

function draw() 
{
  background(164, 217, 224);
  strokeWeight(1);
  figures.forEach(function (figure) 
  {
    if (figure.posX < 0 || figure.posX > width || figure.posY < 0 || figure.posY > height || figure.diameter > max_diam_ball || figure.diagonal > max_diag_rect)  figure.stayy = false;
    else 
    {
      for (let i = 0; i < figures.length; i++) 
      {
        if (figures[i] == figure) continue;
        else 
        {
          if ((figure instanceof Ball && figures[i] instanceof Ball) || (figure instanceof Ball && figures[i] instanceof Pacman) || (figure instanceof Pacman && figures[i] instanceof Ball) || (figure instanceof Pacman && figures[i] instanceof Pacman)) 
          {
            let distance = dist(figure.posX, figure.posY, figures[i].posX, figures[i].posY);
            if (distance <= (figure.diameter / 2 + figures[i].diameter / 2)) 
            {
              figure.stayy = false;
              figures[i].stayy = false;
            }
          }

          if ((figure instanceof Ball && figures[i] instanceof Rectangle) || (figure instanceof Pacman && figures[i] instanceof Rectangle)) 
          {
            let XXX = figure.posX;
            let YYY = figure.posY;

            if (figure.posX < figures[i].posX) 
              XXX = figures[i].posX;
            else if (figure.posX > figures[i].posX + figures[i].width) 
              XXX = figures[i].posX + figures[i].width

            if (figure.posY < figures[i].posY) 
              YYY = figures[i].posY;
            else if (figure.posY > figures[i].posY + figures[i].height) 
              YYY = figures[i].posY + figures[i].height;

            let distX = figure.posX - XXX;
            let distY = figure.posY - YYY;
            let distance = Math.sqrt((distX * distX) + (distY * distY));

            if (distance <= figure.diameter / 2) 
            {
              figure.stayy = false;
              figures[i].stayy = false;
            }
          }

          if ((figure instanceof Rectangle && figures[i] instanceof Ball) || (figure instanceof Rectangle && figures[i] instanceof Pacman)) 
          {
            let XXX = figures[i].posX;
            let YYY = figures[i].posY;

            if (figures[i].posX < figure.posX) 
              XXX = figure.posX;
            else if (figures[i].posX > figure.posX + figure.width) 
              XXX = figure.posX + figure.width
            
            if (figures[i].posY < figure.posY) 
              YYY = figure.posY;
            else if (figures[i].posY > figure.posY + figure.height) 
              YYY = figure.posY + figure.height;

            let distX = figures[i].posX - XXX;
            let distY = figures[i].posY - YYY;
            let distance = Math.sqrt((distX * distX) + (distY * distY));

            if (distance <= figures[i].diameter / 2) 
            {
              figure.stayy = false;
              figures[i].stayy = false;
            }
          }

          if (figure instanceof Rectangle && figures[i] instanceof Rectangle) 
          {
            if (figure.posX + figure.width >= figures[i].posX && figure.posX <= figures[i].posX + figures[i].width && figure.posY + figure.height >= figures[i].posY && figure.posY <= figures[i].posY + figures[i].height) 
            {
              figure.stayy = false;
              figures[i].stayy = false;
            }
          }
        }
      }
    }
    figures = figures.filter(figure => figure.stayy);

    if (figure.chaos) figure.moveChaos();

    figure.render();
  })
}

function createFigure() 
{
  let figure;

  switch (Math.round(random(1, 3))) 
  {
    case 1:
      figure = new Pacman(mouseX, mouseY, direction);
      break
    case 2:
      figure = new Ball(mouseX, mouseY, direction);
      break
    case 3:
      figure = new Rectangle(mouseX, mouseY, direction);
      break
  }
  figures.push(figure);
  figures[figures.length - 1].chaos = direction == 6;
  figures[figures.length - 1].direction = direction;
}

function move(dir) 
{
  direction = dir;
  figures.forEach(figure => 
  { 
    figure.chaos = direction == 6; 
    figure.direction = dir; 
  })
}

function clean() 
{
  figures = [];
  clear();
}
