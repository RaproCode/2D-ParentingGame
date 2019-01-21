// create canvas
var canvas = document.querySelector(".baby-floor");

// context object to draw things
var ctx = canvas.getContext("2d");

// Create Images (Baby, Diaper, Bottle of Milk, washtafel)
var babyImg = new Image();
babyImg.src = "../img/happybaby.png";
babyImg.onload = function() {
  ctx.drawImage(babyImg, 500, 250, 200, 200);
};

// Drawing Loop

// Drawing rectangles

// keyboard controller
