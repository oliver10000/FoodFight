var canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var game = new Game(canvas);
game.setBackground('images/background.png');
