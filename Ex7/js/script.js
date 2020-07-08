let canvas;
let SegoePrintBoldFont;

let pipeImg;

let death;
let fishSound; // рыыыба
let beerSound; // пиииивоооо
let shootSound;
let NRSound;
let shoot1Sound; // dulin
let shoot2Sound; // mihalich
let winSound;
let lose1Sound;
let loseHeartSound;
let errorSound;
let clickSound;

let PetriBalansImg;
let babka1Img;
let babka2Img;
let sergayrobImg;
let hermanImg;
let hitlerImg;
let zadornImg;
let dulinImg;
let poperechnyiImg;
let mihalichImg;
let mihalich1Img;
let tankImg;
let shotImg;

let lifeImg;
let lostHeartImg;

const WIDTH = 850;
const HEIGHT = 500;

let pipe;
let shots = [];
let enemies = [];
let enemyCount = 10;
let lifes = [];
let lifesLeft = 3;
let gameStarted = false;
let score = 0;
let level;
let boss;
let isSpawned = false;

let nickname;

function preload() {
  pipeImg = loadImage("assets/img/pipe.png");
  PetriBalansImg = loadImage("assets/img/PetriBalans.png");
  babka1Img = loadImage("assets/img/babka1.png");
  babka2Img = loadImage("assets/img/babka2.png");
  hermanImg = loadImage("assets/img/herman.png");
  hitlerImg = loadImage("assets/img/hitler.png");
  zadornImg = loadImage("assets/img/zadorn.png");
  sergayrobImg = loadImage("assets/img/sergayrob.png");
  tankImg = loadImage("assets/img/tank.png");
  dulinImg = loadImage("assets/img/dulin.png");
  mihalichImg = loadImage("assets/img/mihalich.png");
  mihalich1Img = loadImage("assets/img/mihalass.png");

  lifeImg = loadImage("assets/img/heart.png");
  lostHeartImg = loadImage("assets/img/NOheart.png");

  SegoePrintBoldFont = loadFont("assets/fonts/SegoePrintBold.ttf");

  fishSound = loadSound("assets/sound/fish_death.mp3");
  beerSound = loadSound("assets/sound/beer_death.mp3");
  NRSound = loadSound("assets/sound/NashaRussia.mp3");
  shoot1Sound = loadSound("assets/sound/dulin_shoot.mp3");
  shoot2Sound = loadSound("assets/sound/mihalich_shoot.mp3");
  winSound = loadSound("assets/sound/win.mp3");
  lose1Sound = loadSound("assets/sound/lose1.mp3");
  lose2Sound = loadSound("assets/sound/lose2.mp3");
  loseHeartSound = loadSound("assets/sound/loseheart.mp3");
  errorSound = loadSound("assets/sound/error.mp3");
  clickSound = loadSound("assets/sound/click.mp3");
}

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  background(164, 217, 224);

  lifes = [lifeImg, lifeImg, lifeImg];

  pipe = new PIPESHOOT(pipeImg, pipeImg.width / 2, pipeImg.height / 2);
  canvas.mouseClicked(() => pipe.shoot());

  imageMode(CENTER);

  frameRate(60);
}

function play(name) {
  clickSound.play();
  $("#choose-window").slideUp("slow");
  $("#lose1-window").slideUp("slow");
  $("#lose2-window").slideUp("slow");
  switch (name) {
    case "dulin":
      shotImg = dulinImg;
      shootSound = shoot1Sound;
      break;
    case "mihalich":
      shotImg = mihalichImg;
      shootSound = shoot2Sound;
      break;
  }
  NRSound.stop();
  NRSound.play();
  localStorage.setItem(nickname, 0);
  enemies = [];
  level = 4;
  enemyCount = 10;
  spawnEnemies(enemyCount);
  gameStarted = true;
  shots = [];
  lifes = [lifeImg, lifeImg, lifeImg];
  score = 0;
  loop();
}

function draw() {

  if (gameStarted) {
    background(164, 217, 224);

    if (level == 4) {
      if (!isSpawned) {
        boss = new Boss(
          PetriBalansImg,
          1200,
          250,
          0.8,
          PetriBalansImg.width / 1.1,
          PetriBalansImg.height / 1.1
        );
        isSpawned = true;
      }
      if (boss != undefined) {
        if (boss.health > 0 && enemies.length == 0) {
          boss.render();
        }
        if (boss.posX - boss.width / 4 <= 35) {
          NRSound.stop();
          lose1Sound.play();
          background(164, 217, 224);
          $("#lose1-window").slideDown("slow");
          $(".score").html("Ваш счёт: " + score + " очков.");
          localStorage.setItem(nickname, score);
          gameStarted = false;
          noLoop();
        }
      }
    }

    if (shots.length != 0) {
      shots.forEach((shot) => {
        if (shot.posX >= WIDTH || shot.posY >= HEIGHT) {
          shot.stay = false;
        } else {
          for (let i = 0; i < enemies.length; i++) {
            if (enemies[i] instanceof AirEnemy) {
              let distance = dist(
                shot.posX + (30 + shot.startX),
                shot.posY + (485 - shot.startY),
                enemies[i].posX,
                enemies[i].posY
              );
              if (distance <= shot.diameter / 2 + enemies[i].width / 2) {
                shot.stay = false;
                enemies[i].stay = false;
                death = Math.round(random(1, 2));
                switch (death) {
                  case 1:
                    fishSound.play();
                    break;
                  case 2:
                    beerSound.play();
                    break;
                }
                score += 10;
              }
            }

            if (enemies[i] instanceof GroundEnemy) {
              let shotX = shot.posX + (30 + shot.startX);
              let shotY = shot.posY + (485 - shot.startY);
              let testX = shotX;
              let testY = shotY;
              if (shotX < enemies[i].posX)
                testX = enemies[i].posX - enemies[i].width / 2;
              else if (shotX > enemies[i].posX + enemies[i].width / 2)
                testX = enemies[i].posX + enemies[i].width / 2;
              if (shotY < enemies[i].posY)
                testY = enemies[i].posY - enemies[i].height / 2;
              else if (shotY > enemies[i].posY + enemies[i].height / 2)
                testY = enemies[i].posY + enemies[i].height / 2;
              let distX = shotX - testX;
              let distY = shotY - testY;
              let distance = Math.sqrt(distX * distX + distY * distY);
              if (distance <= shot.diameter / 2) {
                death = Math.round(random(1, 2));
                switch (death) {
                  case 1:
                    fishSound.play();
                    break;
                  case 2:
                    beerSound.play();
                    break;
                }
                shot.stay = false;
                enemies[i].health--;
                if (enemies[i].health < 0) {
                  enemies[i].stay = false;
                  let self = enemies[i];
                  score += 30;
                }
              }
            }
          }

          if (level == 4) {
            if (boss != undefined) {
              if (boss.health > 0) {
                let distance = dist(
                  shot.posX + (30 + shot.startX),
                  shot.posY + (485 - shot.startY),
                  boss.posX,
                  boss.posY
                );
                if (distance <= shot.diameter / 2 + boss.width / 2) {
                  death = Math.round(random(1, 2));
                  switch (death) {
                    case 1:
                      fishSound.play();
                      break;
                    case 2:
                      beerSound.play();
                      break;
                  }
                  shot.stay = false;
                  boss.health--;
                }
                if (boss.health == 0) {
                  NRSound.stop();
                  winSound.play();
                  background(164, 217, 224);
                  boss = undefined;
                  delete boss;
                  score += 100;
                  $("#win-game-window").slideDown("slow");
                  $(".score").html("Ваш счёт: " + score + " очков.");
                  localStorage.setItem(nickname, score);
                  gameStarted = false;
                  noLoop();
                  return;
                }
              }
            }
          }
        }
        shots = shots.filter((shot) => shot.stay);
        enemies = enemies.filter((enemy) => enemy.stay);
        shot.render();
      });
    }

    enemies.forEach((enemy) => {
      if (enemy.posX <= 35) {
        loseHeartSound.play();
        lifes[lifesLeft - 1] = lostHeartImg;
        lifesLeft--;
        enemies.shift();
      }
    });

    if (lifesLeft == 0) {
      NRSound.stop();
      lose1Sound.play();
      lifesLeft = 3;
      noLoop();
      $("#lose1-window").slideDown("slow");
      $(".score").html("Ваш счёт: " + score + " очков.");
      localStorage.setItem(nickname, score);
    }

    enemies.forEach((enemy) => {
      enemy.render();
      strokeWeight(2);
    });

    stroke("#B22222");
    strokeWeight(3);
    line(35, 500, 35, 0);

    stroke("#000000");
    strokeWeight(1);
    pipe.render();
    fill("rgb(18, 187, 74)");
    circle(13, HEIGHT + 25, pipe.width);

    textFont(SegoePrintBoldFont);
    fill("#000000");
    textSize(32);
    text(" Score: " + score, 140, 25);
    drawHearts();

    fill("#ffffff");
    textSize(28);
    text(
      pipe.timeToReload > 0
        ? Math.round(pipe.timeToReload * 250) / 100
        : "FIRE!",
      5,
      490
    );
  }
}

function spawnEnemies(count) {
  let delta = 0;
  let speed;
  for (let i = 0; i < count; i++) {
    let face;
    let temp = Math.round(random(1, 6));
    switch (temp) {
      case 1:
        face = babka1Img;
        break;
      case 2:
        face = sergayrobImg;
        break;
      case 3:
        face = hitlerImg;
        break;
      case 4:
        face = babka2Img;
        break;
      case 5:
        face = hermanImg;
        break;
      case 6:
        face = zadornImg;
        break;
    }

    switch (level) {
      case 1:
        speed = 1.5;
        break;
      case 2:
        speed = 2.5;
        break;
      case 3:
        speed = 3.2;
        break;
      case 4:
        speed = 2.5;
    }

    let enemy = new AirEnemy(
      face,
      950 + delta,
      random(40, 350),
      speed,
      face.width / 10,
      face.height / 10
    );

    enemies.push(enemy);
    delta += 175;
  }
  if (level > 2) {
    delta = 0;
    for (let i = 2; i < level; i++) {
      let tank = new GroundEnemy(
        tankImg,
        1200,
        450,
        0.7,
        tankImg.width / 5,
        tankImg.height / 5
      );
      tank.posX += delta;
      enemies.push(tank);
      delta += 500;
    }
  }
}

function drawHearts() {
  let x = 60;
  lifes.forEach((life) => {
    image(life, x, 16, life.width / 36, life.height / 36);
    x += 34;
  });
}

function toMenu() {
  background(164, 217, 224);
  clickSound.play();
  $("#scoreboard-window").slideUp("slow");
  $("#lose1-window").slideUp("slow");
  $("#lose2-window").slideUp("slow");
  NRSound.stop();
  winSound.stop();
  lose1Sound.stop();
  lose2Sound.stop();
  setTimeout(() => {
    $("#menu-window").slideDown("slow");
  }, 800);
}

function showScoreboard() {
  background(164, 217, 224);
  clickSound.play();
  $("#scoreboard")
    .empty()
    .append("<thead><tr><td>Никнейм</td><td>Очки</td></tr></thead>");
  for (let i = 0; i < localStorage.length; i++) {
    $("#scoreboard").append(
      "<tr><td>" +
        localStorage.key(i) +
        "</td>" +
        "<td>" +
        localStorage.getItem(localStorage.key(i)) +
        "</td></tr>"
    );
  }
  $(".container").slideUp("slow");
  setTimeout(() => {
    $("#scoreboard-window").slideDown("slow");
    background(164, 217, 224);
  }, 800);
}

function showCharacters() {
  clickSound.play();
  nickname = $("#nickname").val();
  nick = "Петросян";
  if (nickname == "") {
    $("#nickname").css("background", "#f3a0a0");
    setTimeout(() => {
      $("#nickname").css("background", "#ffffff");
    }, 300);

    errorSound.play();
    return;
  } else if (nickname.toUpperCase() === nick.toUpperCase()) {
    $("#nickname").css("background", "#f3a0a0");
    setTimeout(() => {
      $("#nickname").css("background", "#ffffff");
    }, 300);
    
    lose2Sound.play();
    $("#menu-window").slideUp("slow");
    setTimeout(() => {
      $("#lose2-window").slideDown("slow");
    }, 800);
    $(".score").html("Ваш счёт: " + "-999999" + " очков.");
    localStorage.setItem(nickname, "-999999");
    gameStarted = false;
    noLoop();
    return;
  }
  NRSound.stop();
  winSound.stop();
  lose1Sound.stop();
  lose2Sound.stop();
  $("#menu-window").slideUp("slow");
  setTimeout(() => {
    $("#choose-window").slideDown("slow");
  }, 800);
}
