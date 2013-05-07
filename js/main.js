var canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var stage = new createjs.Stage(canvas);

var background = new createjs.Bitmap("images/background.png");
stage.addChild(background);

var update = function() {
	stage.update();
};

setInterval(update, 1);
