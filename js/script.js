// SET CANVAS GAME
// create canvas
var canvas = document.querySelector(".gameFloor");
// context object to draw things
var ctx = canvas.getContext("2d");

// --------AUDIO---------

// CREATE Option to catch
class Option {
  constructor(img, x) {
    this.img = img;
    this.x = x;
    this.y = -40;
    this.width = 40;
    this.height = 40;
    this.caught = false;
  }

  drawOption() {
    if (score > 0) {
      this.y += 2;
    }
    // if the y is past the canvas Height
    if (this.y > canvas.height && this.caught === false) {
      // reset to negative OPTION height
      this.y = -this.height - Math.floor(Math.random() * 400);
      score -= 1; // for score purpose
      if (score <= 6) {
        baby.image = babyAngryImg;
      }
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// CREATE Icecream as distraction
class IceCream {
  constructor(img, x) {
    this.img = img;
    this.x = x;
    this.y = -40;
    this.width = 40;
    this.height = 40;
    this.caught = false;
  }
  drawIce() {
    if (score > 0) {
      this.y += 1;
    }

    if (this.y > canvas.height && this.caught === false) {
      this.y = -this.height - Math.floor(Math.random() * 300);
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// Characters
var parentImg = new Image();
parentImg.src = "./img/ParentTransparent.png";

var parentBackImg = new Image();
parentBackImg.src = "./img/ParentTransparentBack.png";

var babyImg = new Image();
babyImg.src = "./img/happybaby.png";

var babyAngryImg = new Image();
babyAngryImg.src = "./img/angrybaby.png";

var diaperImg = new Image();
diaperImg.src = "./img/diaper.png";

var diaper = new Option(diaperImg, 50);
var diaper2 = new Option(diaperImg, 250);

var milkImg = new Image();
milkImg.src = "./img/milk.png";

var milk = new Option(milkImg, 350);
var milk2 = new Option(milkImg, 200);

var handImg = new Image();
handImg.src = "./img/handwash.png";

var hand = new Option(handImg, 500);
var hand2 = new Option(handImg, 0);

var iceImg = new Image();
iceImg.src = "./img/icecream.png";

var ice = new IceCream(iceImg, 300);
var ice2 = new IceCream(iceImg, 100);
var ice3 = new IceCream(iceImg, 400);

var gameoverImg = new Image();
gameoverImg.src = "./img/gameover.jpg";

var winImg = new Image();
winImg.src = "./img/win.jpeg";

var objectsArray = [diaper, diaper2, milk, milk2, hand, hand2];

var iceArray = [ice, ice2, ice3];

// CREATE PARENT
var parent = {
  x: 400,
  y: canvas.height - 100,
  width: 90,
  height: 90,
  image: parentImg,
  flashInterval: null,
  visible: true,
  draw() {
    if (this.visible) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        baby.image,
        this.x + 5,
        this.y + 5,
        this.width,
        this.height
      );
    }
  },

  // to stop parent loop . stop moving

  parentClick() {
    var count = 0;
    this.flashInterval = setInterval(function() {
      parent.visible = !parent.visible;
      count++;

      if (count === 6) {
        clearInterval(parent.flashInterval);
        parent.visible = true;
      }
    }, 150);
  }
};

// CREATE Baby
var baby = {
  x: 0,
  y: canvas.height - 100,
  width: 40,
  height: 40,
  image: babyImg
  // draw() {
  //   ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  // }
};

// CREATE SCORE - ERROR
var score = 8;
var radius = 60;
var zoomInterval = null;
var red = "#e00d2d";
var scoreDiv = {
  flashInterval: null,
  visible: true,

  // scoreZoom() {
  //   var radiusList = [
  //     61,
  //     62,
  //     63,
  //     64,
  //     65,
  //     66,
  //     67,
  //     68,
  //     69,
  //     70,
  //     70,
  //     69,
  //     68,
  //     67,
  //     66,
  //     65,
  //     64,
  //     63,
  //     62,
  //     61,
  //     60
  //   ];
  //   var count = 0;
  //   zoomInterval = setInterval(function() {
  //     radius = radiusList[count];
  //     count++;

  //     if (count === radiusList.length) {
  //       clearInterval(zoomInterval);
  //     }
  //   }, 50);
  // },

  scoreClick() {
    var count = 0;

    clearInterval(this.flashInterval);

    this.flashInterval = setInterval(function() {
      scoreDiv.visible = !scoreDiv.visible;
      count++;

      if (count === 6) {
        clearInterval(scoreDiv.flashInterval);
        scoreDiv.visible = true;
      }
    }, 150);
  },

  draw() {
    if (this.visible) {
      ctx.beginPath();
      ctx.arc(canvas.width - 115, 120, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.font = "bold 50px monospace";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(score, canvas.width - 115, 120);
      //change circle color depending on score
      if (score >= 15) {
        ctx.strokeStyle = "#42f462";
      } else if (score >= 10) {
        ctx.strokeStyle = "#b5f441";
      } else if (score > 5) {
        ctx.strokeStyle = "white";
      } else {
        ctx.strokeStyle = red;
      }
    }
  }
};

// Drawing on Canvas
function drawEverything() {
  ctx.fillStyle = "lightblue"; //background
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#F7F4FA";
  parent.draw();

  scoreDiv.draw();
  if (score <= 0) {
    var newWidth = canvas.height * 0.64;
    ctx.drawImage(
      gameoverImg,
      canvas.width / 2 - newWidth / 2,
      100,
      newWidth,
      canvas.height * 0.7
    );
    ctx.font = "bold 20px monospace";
    ctx.fillText("Clik SPACE to restart", canvas.width / 2, 70);
    return;
  }

  if (score >= 20) {
    var newWidth = canvas.height * 0.64;
    ctx.drawImage(
      winImg,
      canvas.width / 2 - newWidth / 2,
      100,
      newWidth,
      canvas.height * 0.7
    );
    ctx.font = "bold 20px monospace";
    ctx.fillText("Press SPACE to play again", canvas.width / 2, 70);
    return;
  }

  objectsArray.forEach(oneOption => {
    oneOption.drawOption();
    if (!oneOption.caught && checkCollision(parent, oneOption)) {
      //If the option has a false value (set by default), and the colission is true,
      // then its value becomes true so the score only gains 1pt. Otherwise,
      //the score would change during all the contact duration between parent and the option images.
      score += 1;
      oneOption.caught = true;

      if (score >= 7) {
        baby.image = babyImg;
      }

      // if (score === 10 || score === 15) {
      //   scoreDiv.scoreZoom();
      // }
      objectsArray.push(
        new Option(oneOption.img, Math.floor(Math.random() * canvas.width))
      ); // A new images from Option is pushed inside [] array so it's never empty.
    }
  });
  // to make the images from Options disappear after catch by parent
  objectsArray = objectsArray.filter(oneOption => {
    return !oneOption.caught;
  });

  iceArray.forEach(oneIceCream => {
    oneIceCream.drawIce();
    if (!oneIceCream.caught && checkCollision(parent, oneIceCream)) {
      score -= 3;
      oneIceCream.caught = true;
      parent.parentClick();
      scoreDiv.scoreClick();

      if (score <= 6) {
        baby.image = babyAngryImg;
      }
    }
  });
}

// DRAWING LOOP
function drawingLoop() {
  ctx.clearRect(0, 0, 800, 600);
  drawEverything();
  requestAnimationFrame(function() {
    drawingLoop();
  });
}

drawingLoop();
// back();

function checkCollision(a, b) {
  return (
    a.y + a.height >= b.y &&
    a.y <= b.y + b.height &&
    a.x + a.width >= b.x &&
    a.x <= b.x + b.width
  );
}

// Keyboard controller
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 32: //Space
      restart();
      break;
  }

  if (score >= 20 || score <= 0) {
    return;
  }

  switch (event.keyCode) {
    case 37: //<=
      parent.image = parentBackImg;
      parent.x -= 20;
      break;

    case 39: //=>
      parent.image = parentImg;
      parent.x += 20;
      break;
  }
};

function restart() {
  score = 8;
  parent.x = 200;
  parent.y = canvas.height - 100;

  iceArray = [ice, ice2, ice3];

  objectsArray = [diaper, diaper2, milk, milk2, hand, hand2];
}
