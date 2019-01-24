// Intro (Header & Rules of the game)

// Choose player: Male or female

// create canvas
var canvas = document.querySelector(".baby-floor");
// context object to draw things
var ctx = canvas.getContext("2d");

// Create Characters (Parent, Baby, Diaper, Bottle of Milk, handwash)

class Parent {
  constructor(img, x) {
    this.img = img;
    this.x = x;
    this.y = 70;
    this.width = 90;
    this.height = 90;
  }

  drawParent() {
    this.x += 1;

    // if the x is reaching the canvas width
    if (this.x == canvas.width - 90) {
      // reset to return OPTION width
      this.x = 0;
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// ---------------Parent------------------
var parentImg = new Image();
parentImg.src = "./img/ParentTransparent.png";

function drawParent() {
  ctx.drawImage(parentImg, parentX, parentY, 90, 70);
}
// var parentX = 200;
// var parentY = 100;
var newParent = new Parent(parentImg, 70);

// ------------baby----------------------
var babyImg = new Image();
babyImg.src = "./img/happybaby.png";

function drawBaby() {
  ctx.drawImage(babyImg, babyX, babyY, 30, 30);
}

var babyX = 400;
var babyY = 100;

// --------------baby fall -- gravity -----------------
// class BabyFall {
//   constructor() {
//     this.img = img;
//     this.width = width;
//     this.height = height;
//     this.x = 0;
//     this.y = 500;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.gravity = 0.05;
//     this.gravitySpeed = 0;
//     this.update = function() {
//       ctx = canvas.context;
//       ctx.fillRect(this.x, this.y, this.width, this.height);
//     };
//     this.newPos = function() {
//       this.gravitySpeed += this.gravity;
//       this.x += this.speedX;
//       this.y += this.speedY + this.gravitySpeed;
//       this.hitBottom(); // stop the falling when it hit bottom area
//     };
//     this.hitBottom = function() {
//       var rockbottom = canvas.height - this.height;
//       if (this.y > rockbottom) {
//         this.y = rockbottom;
//       }
//     };
//     ctx.drawImage(this, img, this.x, this.y, this.width, this.height);
//   }
// }

// ---------------- Building class for bottom images option----------
class Option {
  constructor(img, x) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.caught = false;
  }

  drawOption() {
    this.x += 3;

    // if the x is past the canvas width
    if (this.x >= canvas.width) {
      // reset to negative OPTION width
      this.x = -this.width - Math.floor(Math.random() * 400);
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// -----------------diaper------------------
var diaperImg = new Image();
diaperImg.src = "./img/diaper.png";

var diaper = new Option(diaperImg, 100);
var diaper2 = new Option(diaperImg, 250);

// ---------------------milk----------------------
var milkImg = new Image();
milkImg.src = "./img/milk.png";

var milk = new Option(milkImg, 350);
var milk2 = new Option(milkImg, 200);

//-----------------------handwash----------------------
var handImg = new Image();
handImg.src = "./img/handwash.png";

var hand = new Option(handImg, 500);
var hand2 = new Option(handImg, 0);

// ------- put bottom images inline (diaper, milk, hand)--------
var objectsArray = [diaper, diaper2, milk, milk2, hand, hand2];
var objectParent = [newParent];

// console.log(objectParent);

// ---------------------drawing loop ----------------(to make the object move)

drawingLoop();
function drawingLoop() {
  ctx.clearRect(0, 0, 700, 500);

  drawRectangles();
  drawBaby();
  objectsArray.forEach(function(oneOption) {
    oneOption.drawOption();
  });
  objectParent.forEach(function(oneParent) {
    console.log(oneParent);

    oneParent.drawParent();
  });

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

  ctx.fillRect(0, 0, 700, 500);

  ctx.strokeStyle = "green";
  ctx.lineWidth = 10;

  ctx.strokeRect(700, 500, 700, 500);
}

// keyboard controller for baby
document.onkeydown = function() {
  // console.log("TEST KEY DOWN" + event.keyCode);
  // console.log(event);
  // switch (event.keyCode) {
  //   case 37: // left arrow (check web for keyboard number > keycode.info)
  // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
  // event.preventDefault();
  // babyX -= 15;
  // break;
  // case 38: // up arrow (check web for keyboard number > keycode.info)
  // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
  // event.preventDefault();
  // babyY -= 15;
  // break;
  // case 39: // right arrow (check web for keyboard number > keycode.info)
  // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
  // event.preventDefault();
  // babyX += 15;
  // break;
  // case 40: // down arrow (check web for keyboard number > keycode.info)
  // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
  // event.preventDefault();
  // babyY += 15;
  // break;
  //}
};

// // ------------------- Collision detection -------------

// function rectangleCollision(rectA, rectB) {
//   console.log(rectA, rectB);
//   return (
//     rectA.y + rectA.height >= rectB.y &&
//     rectA.y <= rectB.y + rectB.height &&
//     rectA.x + rectA.width >= rectB.x &&
//     rectA.x <= rectB.x + rectB.width
//   );
// }

// function checkCrashes() {
//   console.log(allImages);
//   allImages.forEach(function(oneImage) {
//     console.log(oneImage);
//     if (rectangleCollision(baby, oneImage)) {
//       console.log(baby);
//       baby.isCrashed = true;
//       oneImage.isCrashed = true;
//     }
//   });
// }

// class Crash {
//   drawCrash() {
//     if (this.iscrashed) {
//       ctx.fillStyle = "red";
//     } else {
//       ctx.fillStyle = "green";
//     }
//   }
// }

// makes the object disappear after get hit by the baby

// Score

// Winner

// loser

// return
