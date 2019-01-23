var myGamePiece;
var myBackground;
var myObstacle;


function startGame() {

    myGamePiece = new component(80, 50, "front-plane.png", 10, 120, "image");
    myBackground = new component(800, 400, "background.png", 0, 0, "background");
    myObstacle = new component(40, 40, "ballon.png", 500, 200,"image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    // TODO: IMPLEMENT KEYBOARD NAVIGATION
    
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }    
    this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

// PUT SOME OBSTACLES

function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
    myGameArea.stop();
    } else {
    myGameArea.clear();    
    myBackground.speedX = -2;
    myBackground.newPos();    
    myBackground.update();
    myGamePiece.newPos();    
    myGamePiece.update();
    myObstacle.x += -1;
    myObstacle.update();
    }
}
function move(dir) {
    if (dir == "up") {myGamePiece.speedY = -1; myGamePiece.image.src = "up-plane.png";}
    if (dir == "down") {myGamePiece.speedY = 1; myGamePiece.image.src = "down-plane.png";}
    if (dir == "left") {myGamePiece.speedX = -1; }
    if (dir == "right") {myGamePiece.speedX = 1; }
}

function clearmove() {
    myGamePiece.image.src = "front-plane.png";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

startGame()
