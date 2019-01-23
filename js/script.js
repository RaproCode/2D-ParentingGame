// Intro (Header & Rules of the game)

// Choose player: Male or female

// create canvas
var canvas = document.querySelector(".baby-floor");
// context object to draw things
var ctx = canvas.getContext("2d");

// Create Characters (Baby, Diaper, Bottle of Milk, handwash)
var babyImg = new Image();
babyImg.src = "./img/happybaby.png";

babyImg.onload = function() {
  drawBaby();
  drawHand();
  drawDiaper();
  drawMilk();
};

function drawBaby() {
  ctx.drawImage(babyImg, babyX, babyY, 50, 50);
}

var babyX = 0;
var babyY = 250;

function move(dir) {
  myGamePiece.image.src = "angry.gif";
  if (dir == "up") {
    myGamePiece.speedY = -1;
  }
  if (dir == "down") {
    myGamePiece.speedY = 1;
  }
  if (dir == "left") {
    myGamePiece.speedX = -1;
  }
  if (dir == "right") {
    myGamePiece.speedX = 1;
  }
}

function clearmove() {
  myGamePiece.image.src = "angrybaby.png";
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

var diaperImg = new Image();
diaperImg.src = "./img/diaper.png";
// diaperImg.onload = function() {
//   // need to check different function to blinking randomly
//   ctx.drawImage(diaperImg, diaperX, diaperY, 30, 30); //need to check on size again
// };

function drawDiaper() {
  ctx.drawImage(diaperImg, diaperX, diaperY, 30, 30);
}

var diaperX = 100;
var diaperY = 120;

var milkImg = new Image();
milkImg.src = "./img/milk.png";
// milkImg.onload = function() {
//   ctx.drawImage(milkImg, milkX, milkY, 30, 30);
// };

function drawMilk() {
  ctx.drawImage(milkImg, milkX, milkY, 30, 30);
}

var milkX = 100;
var milkY = 200;

var handImg = new Image();
handImg.src = "./img/handwash.png";
// diaperImg.onload = function() {
//   ctx.drawImage(handImg, handX, handY, 30, 30);
// };

function drawHand() {
  ctx.drawImage(handImg, handX, handY, 30, 30);
}

var handX = 100;
var handY = 400;

//--------- all images --------

var allImages = [drawBaby(), drawDiaper(), drawMilk(), drawHand()];
// var allImages = [babyImg(), diaperImg(), milkImg(), handImg()];

// console.log(allImages);
// ---------------------drawing loop ----------------(to make the object move)

drawingLoop();
function drawingLoop() {
  ctx.clearRect(0, 0, 600, 500);

  drawRectangles();
  drawBaby();
  drawDiaper();
  drawMilk();
  drawHand();
  // drawCreate();

  //checkCrashes();

  // re-draw the scene
  requestAnimationFrame(function() {
    drawingLoop();
  });
}

function drawRectangles() {
  // Drawing rectangles

  ctx.fillStyle = "lightblue";

  ctx.fillRect(0, 0, 600, 500);

  ctx.strokeStyle = "green";
  ctx.lineWidth = 10;

  ctx.strokeRect(600, 500, 600, 500);
}

// keyboard controller for baby
document.onkeydown = function() {
  // console.log("TEST KEY DOWN" + event.keyCode);
  // console.log(event);

  switch (event.keyCode) {
    case 37: // left arrow (check web for keyboard number > keycode.info)
      // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
      event.preventDefault();
      babyX -= 15;
      break;

    case 38: // up arrow (check web for keyboard number > keycode.info)
      // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
      event.preventDefault();
      babyY -= 15;
      break;

    case 39: // right arrow (check web for keyboard number > keycode.info)
      // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
      event.preventDefault();
      babyX += 15;
      break;

    case 40: // down arrow (check web for keyboard number > keycode.info)
      // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
      event.preventDefault();
      babyY += 15;
      break;
  }
};

// // ------------------- Collision detection -------------

// function contains(targetA, targetB) {
//   return !(
//     targetB.x > targetA.x + targetA.width ||
//     targetB.x + targetB.width < targetA.x ||
//     targetB.y > targetA.x + targetA.height ||
//     targetB.y + targetB.height < targetA.y
//   );
// }

// // Loop
// setInterval(onTimerTick, 33);

// // Render Loop
// function onTimerTick() {
//   // update object2 to mouse
//   diaper.x = babyX - baby.width * 0.5;
//   diaper.y = babyY - baby.height * 0.5;

//   // Clear the canvas
//   canvas.width = canvas.width;

//   // detect a collision
//   var collision = contains(baby, diaper);
// }
//------different method----
// var baby = { x: 5, y: 5, width: 70, height: 70 };
// var diaper = { x: 20, y: 10, width: 30, height: 30 };

// if (
//   baby.x < diaper.x + diaper.width &&
//   baby.x + baby.width > diaper.x &&
//   baby.y < diaper.y + diaper.height &&
//   baby.y + baby.height > diaper.y
// ) {
//   console.log("collision detecteddddd");
// }

// filling in the values =>

//if (5 < 50 && 75 > 20 && 5 < 40 && 75 > 10) {
// collision detected!
//}

// --- different method of collision ----
function rectangleCollision(rectA, rectB) {
  console.log(rectA, rectB);
  return (
    rectA.y + rectA.height >= rectB.y &&
    rectA.y <= rectB.y + rectB.height &&
    rectA.x + rectA.width >= rectB.x &&
    rectA.x <= rectB.x + rectB.width
  );
}

function checkCrashes() {
  console.log(allImages);
  allImages.forEach(function(oneImage) {
    console.log(oneImage);
    if (rectangleCollision(baby, oneImage)) {
      console.log(baby);
      baby.isCrashed = true;
      oneImage.isCrashed = true;
    }
  });
}

class Crash {
  drawCrash() {
    if (this.iscrashed) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "green";
    }
  }
}

// makes the object disappear after get hit by the baby

// Score

// Winner

// loser

// return
