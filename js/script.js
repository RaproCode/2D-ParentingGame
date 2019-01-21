// Intro (Header & Rules of the game)

// Choose player: Male or female

// create canvas
var canvas = document.querySelector(".baby-floor");

// context object to draw things
var ctx = canvas.getContext("2d");

// Create Images (Baby, Diaper, Bottle of Milk, handwash)
var babyImg = new Image();
babyImg.src = "./img/happybaby.png";
babyImg.onload = function() {
  ctx.drawImage(babyImg, babyX, babyY, 200, 200);
};

function drawBaby() {
  ctx.drawImage(babyImg, babyX, babyY, 200, 200);
}

var babyX = 0;
var babyY = 250;

var diaperImg = new Image();
diaperImg.src = "./img/diaper.png";
diaperImg.onload = function() {
  // need to check different function to blinking randomly
  ctx.drawImage(diaperImg, 250, 125, 100, 100); //need to check on size again
};

var milkImg = new Image();
milkImg.src = "./img/milk.png";
diaperImg.onload = function() {
  ctx.drawImage(diaperImg, 250, 125, 100, 100);
};

var handImg = new Image();
handImg.src = "./img/handwash.png";
diaperImg.onload = function() {
  ctx.drawImage(handImg, 250, 125, 100, 100);
};

// Drawing rectangles
ctx.fillStyle = "blue";

ctx.fillRect(0, 0, 750, 750);

ctx.strokeStyle = "green";
ctx.lineWidth = 10;

ctx.strokeRect(1500, 1000, 1500, 1000);

// Drawing Loop (to make the object move)

// keyboard controller for baby
document.onkeydown = function() {
  console.log("coucou KEY DOWN" + event.keyCode);
  console.log(event);

  switch (event.keyCode) {
    case 37: // left arrow (check web for keyboard number > keycode.info)
      // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
      event.preventDefault();
      michaelX -= 10;
      break;

    case 38: // up arrow (check web for keyboard number > keycode.info)
      // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
      event.preventDefault();
      michaelY -= 10;
      break;

    case 39: // right arrow (check web for keyboard number > keycode.info)
      // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
      event.preventDefault();
      michaelX += 10;
      break;

    case 40: // down arrow (check web for keyboard number > keycode.info)
      // prevents the default behaviour of keyboard presses (scrolling of ↓↑, screen moving up and down)
      event.preventDefault();
      michaelY += 10;
      break;
  }
};

// Winner

// loser

// return
